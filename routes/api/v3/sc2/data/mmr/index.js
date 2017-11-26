'use strict';

const express = require('express');
const router  = express.Router();
const config  = require('../../../../../../config').app;
const cache   = require('../../../../../../config').cache;
const apicache = require('apicache').options({ debug: cache.debug }).middleware;

router.get('/', apicache(cache.static), function(req, res) {
  res.json({
    'starcraft2_player_mmr_lotv': config.siteUrl + '/api/v3/sc2/data/mmr/lotv'
  });
});

module.exports = router;