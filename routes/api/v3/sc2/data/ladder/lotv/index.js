'use strict';

const express = require('express');
const router  = express.Router();
const config  = require('../../../../../../../config').app;
const cache   = require('../../../../../../../config').cache;
const sc2utils = require('../../../../../../../utils/v3/sc2utils');
const sc2config = require('../../../../../../../config').sc2;
const apicache = require('apicache').options({ debug: cache.debug }).middleware;

router.get('/', apicache(cache.static), function(req, res) {
  res.json({
    'starcraft2_player_ladder_lotv_all_data': config.siteUrl + '/api/v3/sc2/data/ladder/lotv/all',
    'starcraft2_player_ladder_lotv_1v1_data': config.siteUrl + '/api/v3/sc2/data/ladder/lotv/1v1',
    'starcraft2_player_ladder_lotv_2v2_data': config.siteUrl + '/api/v3/sc2/data/ladder/lotv/2v2',
    'starcraft2_player_ladder_lotv_3v3_data': config.siteUrl + '/api/v3/sc2/data/ladder/lotv/3v3',
    'starcraft2_player_ladder_lotv_4v4_data': config.siteUrl + '/api/v3/sc2/data/ladder/lotv/4v4'
  });
});

router.get('/:mode', apicache(cache.static), function(req, res) {
  const { mode } = req.params;
  
  if (!sc2config.matchMaking.modes.includes(mode.toUpperCase()) && !sc2config.matchMaking.queues.includes(mode.toUpperCase())) {
    res.json({ 'error': 'Wrong mode (you provided: ' + mode + ', available modes: ' + sc2config.matchMaking.modes.join(', ') + ')' });
  }

  res.json({
    'starcraft2_player_ladder_lotv_all_races_data': config.siteUrl + '/api/v3/sc2/data/ladder/lotv/' + mode.toLowerCase() + '/all/:server/:profileId/:profileRegion/:profileName',
    'starcraft2_player_ladder_lotv_terran_data': config.siteUrl + '/api/v3/sc2/data/ladder/lotv/' + mode.toLowerCase() + '/terran/:server/:profileId/:profileRegion/:profileName',
    'starcraft2_player_ladder_lotv_zerg_data': config.siteUrl + '/api/v3/sc2/data/ladder/lotv/' + mode.toLowerCase() + '/zerg/:server/:profileId/:profileRegion/:profileName',
    'starcraft2_player_ladder_lotv_protoss_data': config.siteUrl + '/api/v3/sc2/data/ladder/lotv/' + mode.toLowerCase() + '/protoss/:server/:profileId/:profileRegion/:profileName',
    'starcraft2_player_ladder_lotv_random_data': config.siteUrl + '/api/v3/sc2/data/ladder/lotv/' + mode.toLowerCase() + '/random/:server/:profileId/:profileRegion/:profileName'
    
  });
});


router.get('/:mode/:race/:server/:profileId/:profileRegion/:profileName', apicache(cache.request), function(req, res) {
  const { mode, race, server, profileId, profileRegion, profileName } = req.params;
  sc2utils.getPlayerLadderDataList(mode, race, server, profileId, profileRegion, profileName, res.json.bind(res));
});

module.exports = router;