'use strict';

const http = require('http'),
  twitchConfig = require('../../config').twitch;

module.exports = {
  query: function(propertyToQuery, valueToQuery, callback) {
    if (valueToQuery.hasOwnProperty('error')) {
      callback(valueToQuery);
    } else {

      let requestOptions = {
        hostname: twitchConfig.hostApi.url,
        path: twitchConfig.hostApi.path + '&' + propertyToQuery + '=' + valueToQuery,
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

        response.on('end', function() {
          let returnedData;

          if (stringResponse === '') {
            callback('Error querying Twitch Hosts API');
          } else {
            returnedData = JSON.parse(stringResponse);
            
            if (propertyToQuery === 'host') {
              callback({ 'username': returnedData.hosts[0].host_login });
            } else {
              callback(returnedData);
            }
          }
        });
      };

      const request = http.get(requestOptions, requestCallback);
      
      request.on('error', function(err) {
        callback(err);
      });
    }
  }
};