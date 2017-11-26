'use strict';

const https = require('https');
const twitchConfig = require('../../config').twitch;

module.exports = {
  query: function(username, resource, property, callback) {

    let requestPath = twitchConfig.api.path + '/' + resource + '/' + username;
    let randomLimit = Math.floor(Math.random() * 100);

    if (property === 'latestfollower' || property === 'followercount') {
      requestPath += twitchConfig.api.followerParams + '&limit=' + randomLimit;
    }

    let requestOptions = {
      hostname: twitchConfig.api.url,
      port: twitchConfig.api.port,
      path: requestPath,
      headers: {
        accept: 'application/vnd.twitchtv.3+json',
        'Client-ID': twitchConfig.api.clientId
      }
    };

    let requestCallback = function(response) {
      let stringResponse = '';

      response.on('data', function(chunk) {
        stringResponse += chunk;
      });

      response.on('error', function(err) {
        callback(err);
      });

      response.on('end', function() {
        let returnedData = JSON.parse(stringResponse);
        
        if (returnedData.hasOwnProperty('error')) {
          callback(returnedData);
        } else {
          if (resource === 'users') {
           
            callback(returnedData[property]);

          } else if (resource === 'streams') {
          
            if (property === 'viewers') {
              
              if (returnedData['stream'] === null) {
                callback({'message': 'User ' + username + ' is not streaming at the moment'});
              } else {
                callback(returnedData['stream']['viewers']);
              }

            } else  if (property === 'streamstatus') {
              
              if (returnedData['stream'] === null) {
                callback({'streamstatus': 'offline'});
              } else {
                callback({'streamstatus': 'online'});
              }

            } else {
              callback(returnedData['stream']);
            }

          } else if (resource === 'channels') {
            if (property === 'latestfollower') {
              let followersName = returnedData['follows'][0]['user']['display_name'];
              callback({ 'latestfollower': followersName });  
            } else if (property === 'logo') {
              let logoUrl = returnedData['logo'];
              callback({ 'logo_url': logoUrl });  
            } else if (property === 'followercount') {
              let followerCount = returnedData['_total'].toString();
              callback({ 'follower_count': followerCount });  
            }
          } else {
            callback(returnedData);
          }
        }
      });
    };

    let request = https.get(requestOptions, requestCallback);
    
    request.on('error', function(err) {
      return err;
    });
    
    request.end();
  }
};