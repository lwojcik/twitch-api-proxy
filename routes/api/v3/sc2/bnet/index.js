'use strict';

const express = require('express');
const router  = express.Router();
const config  = require('../../../../../config').app;
const cache   = require('../../../../../config').cache;
const sc2utils = require('../../../../../utils/v3/sc2utils');
const apicache = require('apicache').options({ debug: cache.debug }).middleware;

router.get('/', apicache(cache.static), function(req, res) {
  res.json({
    'starcraft2_player_profile': config.siteUrl + '/api/v3/sc2/bnet/profile/:server/:profileId/:profileRegion/:profileName',
    'starcraft2_player_ladders': config.siteUrl + '/api/v3/sc2/bnet/profile/:server/:profileId/:profileRegion/:profileName/ladders',
    'starcraft2_player_matches': config.siteUrl + '/api/v3/sc2/bnet/profile/:server/:profileId/:profileRegion/:profileName/matches',
    'starcraft2_ladder': config.siteUrl + '/api/v3/sc2/bnet/ladder/:server/:ladderId',
    'starcraft2_ladder_new': config.siteUrl + '/api/v3/sc2/bnet/ladder2/:server/:ladderId'
  });
});

router.get('/profile/:server/:profileId/:profileRegion/:profileName', apicache(cache.request), function(req, res) {
  const { server, profileId, profileRegion, profileName } = req.params;
  sc2utils.getPlayerProfile(server, profileId, profileRegion, profileName, res.json.bind(res));
});

router.get('/profile/:server/:profileId/:profileRegion/:profileName/ladders', apicache(cache.request), function(req, res) {
  const { server, profileId, profileRegion, profileName } = req.params;
  sc2utils.getPlayerLadders(server, profileId, profileRegion, profileName, res.json.bind(res));
});

router.get('/profile/:server/:profileId/:profileRegion/:profileName/matches', apicache(cache.request), function(req, res) {
  const { server, profileId, profileRegion, profileName } = req.params;
  sc2utils.getPlayerMatches(server, profileId, profileRegion, profileName, res.json.bind(res));
});

router.get('/ladder/:server/:ladderId', apicache(cache.expensiveRequest), function(req, res) {
  const { server, ladderId } = req.params;
  sc2utils.getLadderInfo(server, ladderId, res.json.bind(res));
});

router.get('/ladder2/:server/:ladderId', apicache(cache.expensiveRequest), function(req, res) {
  const { server, ladderId } = req.params;
  sc2utils.getAuthenticatedLadderInfo(server, ladderId, res.json.bind(res));
});

router.get('/*', apicache(cache.static), function(req, res) {
  res.json({
    'error': 'Wrong request parameters'
  });
});

module.exports = router;