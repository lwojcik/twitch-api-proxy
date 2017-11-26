'use strict';

const https = require('https');
const mongoose = require('mongoose');
const bnetConfig = require('../../config').battlenet;
const sc2api = require('./starcraft2Api');
const sc2config = require('../../config').sc2;
const BnetAccessToken = require('../../models/bnetAccessToken');

const queryBnetForAccessToken = function(server, ladderId, next, callback) {

  // TODO implement shared function for bnet https requests
  // requestPath as parameter
  
  const getAccessTokenApiUri =
  server === 'cn' ?
    bnetConfig.oauth.api.urlCn : 
    server + '.' + bnetConfig.oauth.api.url;
  
  const getAccessTokenApiQuery = 
    '/oauth/token?grant_type=client_credentials' + 
    '&client_id=' + bnetConfig.api.key + 
    '&client_secret=' + bnetConfig.api.secret;

  const requestOptions = {
    hostname: getAccessTokenApiUri,
    port: bnetConfig.api.port,
    path: getAccessTokenApiQuery
  };

  const requestCallback = (response) => {
    let stringResponse = '';

    response.on('data', (chunk) => {
      stringResponse += chunk;
    });

    response.on('error', (err) => {
      next(err);
    });

    response.on('end', () => {
      const returnedData = JSON.parse(stringResponse);
      if (returnedData.hasOwnProperty('error')) {
        callback(returnedData);
      } else {
        const accessToken = returnedData['access_token'];

        // TODO save token to database in the meantime

        next(server, ladderId, accessToken, callback);
      }
    });
  };

  const request = https.get(requestOptions, requestCallback);
  
  request.on('error', (err) => {
    return err;
  });
  
  request.end();
}

const getAuthenticatedLadderInfo = (server, ladderId, accessToken, callback) => {
  console.log('getAuthenticatedLadderInfo');
  // TODO implement shared function for bnet https requests
  // requestPath as parameter

  const requestServer = server + '.' + bnetConfig.api.url;
  const requestPath =  
    '/data/sc2/ladder/' + ladderId +
    '?access_token=' + accessToken;

  const requestOptions = {
    hostname: requestServer,
    port: bnetConfig.api.port,
    path: requestPath
  };

  const requestCallback = (response) => {
    let stringResponse = '';

    response.on('data', (chunk) => {
      stringResponse += chunk;
    });

    response.on('error', (err) => {
      callback(err);
    });

    response.on('end', () => {
      const returnedData = JSON.parse(stringResponse);
      if (returnedData.hasOwnProperty('error')) {
        callback(returnedData);
      } else {
        callback(returnedData);
      }
    });
  };

  const request = https.get(requestOptions, requestCallback);
  
  request.on('error', (err) => {
    callback(err);
  });
  
  request.end();
};

const queryAuthenticatedLadderInfo = function(server, ladderId, callback) {
  // check if access token is usable - https://us.battle.net/oauth/check_token?token=3e9n5b9wghkqdhu7e92spbc
  // if not:
  //    query https://us.battle.net/oauth/token?grant_type=client_credentials&client_id=<client_id>&client_secret=<client_secret>' \ for access token
  // {"access_token":"ACEESS TOKEN","token_type":"bearer","expires_in":2591998}
  // {"access_token":"38bg5sdfhk2r7b8fhptyrvhf","token_type":"bearer","expires_in":2591998}
  // do stuff with fresh access token
  // save access token to database

  // get access token from database
  // TODO check if server name is correct
  // TODO check if ladderId consists only of numbers
  
  BnetAccessToken.findOne({}, (bnetAccessToken) => {
    //console.log(bnetAccessToken);

    if (bnetAccessToken) {
      //console.log('access token w bazie');
    } else {
      // query bnet api for access token and get the data from api
      
      queryBnetForAccessToken(server, ladderId, function(server, ladderId, accessToken) {
        getAuthenticatedLadderInfo(server, ladderId, accessToken, callback);
      });

    }
  });
};

// const decorateLadderObjectWithMMR = function(ladderObject, server, ladderId, profileId, next) {
//   queryAuthenticatedLadderInfo(server, ladderId, function(ladderInfo) {
//     console.log(ladderObject);
//     ladderObject.rating = 'lul';
//     // const ladderData = ladderInfo.team;
//     // console.log(ladderId);
//     // let decoratedLadderObject = [];
//     // for (let i = 0; i < ladderData.length; i++) {
//     //   const ladderPlayerId = ladderData[i].member[0]['legacy_link'].id;

//     //   if (ladderPlayerId === profileId) {
//     //     decoratedLadderObject.push(ladderData[i]);
//     //   }
//     // }
//     next(ladderObject);
//   });
// };

////////////////////////////////////////////////////////////////////////////////

module.exports = {
  queryAuthenticatedLadderInfo: queryAuthenticatedLadderInfo,

  getPlayerMMRDataList: function(mode, race, server, profileId, profileRegion, profileName, callback) {
    // for mode and race we accept both lowercase and uppercase variants
    // but use uppercase variants only as function parameters

    const playerGameMode = mode.toUpperCase();
    const playerRace = race.toUpperCase();

    const matchmakingQueueIndex = sc2config.matchMaking.modes.indexOf(playerGameMode);
    const playerGameQueue = matchmakingQueueIndex > 0 ? sc2config.matchMaking.queues[matchmakingQueueIndex].toUpperCase() : playerGameMode;

    // for the time being no race filtering

    if (playerRace !== 'ALL') {
      callback('not implemented yet, use ALL as race');
      return;
    }

    // we accept both '1v1' and 'LOTV_SOLO' as a parameter
    
    if (!sc2config.matchMaking.modes.includes(playerGameMode) && !sc2config.matchMaking.queues.includes(playerGameMode)) {
      callback({ 'error': 'Wrong mode (you provided: ' + mode + ', available modes: ' + sc2config.matchMaking.modes.join(', ') + ')' });
      return;
    }

    if (!sc2config.races.includes(playerRace)) {
      callback({ 'error': 'Wrong race (you provided: ' + race + ', available races: ' +  sc2config.races.join(', ') + ')' });
      return;
    }

    if (!bnetConfig.api.servers.includes(server)) {
      callback({ 'error': 'Wrong server (you provided: ' + server + ', available servers: ' + bnetConfig.api.servers.join(', ') + ')' });
      return;
    }

    const getPlayerLadders = function(next) {
      sc2api.queryPlayerProfile('ladders', server, profileId, profileRegion,
        profileName, function(ladders) {
          const playerLadders = ladders.currentSeason;
          if (next) next(playerLadders);
        });
    };

    const extractPlayerLadderIds = function(ladders, next) {
      for (let i=0; i < ladders.length; i++) {
        if (ladders[i].ladder[0]) {
          if (next) next(ladders[i].ladder[0].ladderId);
        }
      }
    };

    const getPlayerLadderInfo = function(ladders, next) {
      console.log('getPlayerLadderInfo');
      if (next) next();
    };

    const getPlayerMMRfromLadder = function (ladderId, next) {
      console.log('getting mmr for ladder: ' + ladderId);
      if (next) next(ladderId);
    };
    let playerLadderMMRs = [];

    getPlayerLadders(function(playerLadders) {
      let playerMMRList = [];
      extractPlayerLadderIds(playerLadders, function(playerLadderIds) {
        playerMMRList.push(playerLadderIds);
        getPlayerMMRfromLadder(playerLadderIds, function(playerMMR) {
          console.log(playerMMRList);
        });
      });
    });

    callback('lul');
  }
};
