'use strict';

const https = require('https');
const bnetConfig = require('../../config').battlenet;
const sc2config = require('../../config').sc2;

const queryBnetApi = (requestServer, requestPath, callback) => {
  
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
    return err;
  });
  
  request.end();
}

module.exports = {
  
  queryPlayerProfile: (resource, server, profileId, profileRegion, profileName, callback) => {

    if (!bnetConfig.api.servers.includes(server)) {
      callback({ 'error': 'Wrong server (you provided: ' + server + ')' });
    }

    const requestServer = server + '.' + bnetConfig.api.url;

    const requestResource = resource === 'profile' ? '' : resource;
    
    const requestPath =
      '/sc2/profile/' + profileId +
      '/' + profileRegion +
      '/' + profileName +
      '/' + requestResource +
      '?apikey=' + bnetConfig.api.key;

    queryBnetApi(requestServer, requestPath, callback);

  },

  queryLadderInfo: (server, ladderId, callback) => {
    
    if (!bnetConfig.api.servers.includes(server)) {
      callback({ 'error': 'Wrong server (you provided: ' + server + ')' });
    }

    const requestServer = server + '.' + bnetConfig.api.url;
    const requestPath =  
      '/sc2/ladder/' + ladderId +
      '?apikey=' + bnetConfig.api.key;

    queryBnetApi(requestServer, requestPath, callback);
  },

  getPlayerLadderDataList: function(mode, race, server, profileId, profileRegion, profileName, callback) {
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

    this.queryPlayerProfile('ladders', server, profileId, profileRegion, profileName, (response) => {
      const ladders = response.currentSeason;
      let filteredLadders = [];
      
      for (let i = 0; i < ladders.length; i++) {
        const ladderObject = ladders[i].ladder[0];
        
        if (ladderObject) {
          if (playerGameQueue === 'ALL' || ladderObject.matchMakingQueue === playerGameQueue) {
            filteredLadders.push(ladderObject);
          }
        }
      }

      callback(filteredLadders);
    });
  }
};