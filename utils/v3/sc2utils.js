'use strict';

const sc2Api = require('../shared/starcraft2Api');
const sc2OAuthApi = require('../shared/starcraft2OAuthApi');


module.exports = {
  getPlayerProfile: function(server, profileId, profileRegion, profileName, callback) {
    sc2Api.queryPlayerProfile('profile', server, profileId, profileRegion, profileName, callback);
  },
  getPlayerLadders: function(server, profileId, profileRegion, profileName, callback) {
    sc2Api.queryPlayerProfile('ladders', server, profileId, profileRegion, profileName, callback);
  },
  getPlayerMatches: function(server, profileId, profileRegion, profileName, callback) {
    sc2Api.queryPlayerProfile('matches', server, profileId, profileRegion, profileName, callback);
  },
  getLadderInfo: function(server, ladderId, callback) {
    sc2Api.queryLadderInfo(server, ladderId, callback);
  },
  getAuthenticatedLadderInfo: function(server, ladderId, callback) {
    sc2OAuthApi.queryAuthenticatedLadderInfo(server, ladderId, callback);
  },
  getPlayerLadderDataList: function(mode, race, server, profileId, profileRegion, profileName, callback) {
    sc2Api.getPlayerLadderDataList(mode, race, server, profileId, profileRegion, profileName, callback);
  },
  getPlayerMMRList: function(mode, race, server, profileId, profileRegion, profileName, callback) {
    sc2OAuthApi.getPlayerMMRDataList(mode, race, server, profileId, profileRegion, profileName, callback);
  }
};