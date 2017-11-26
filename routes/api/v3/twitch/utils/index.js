'use strict';

const express = require('express');
const router  = express.Router();
const config  = require('../../../../../config').app;
const cache   = require('../../../../../config').cache;
const apicache = require('apicache').options({ debug: cache.debug }).middleware;

router.get('/', apicache(cache.static), function(req, res) {
  res.json({
    'twitch_get_id_from_username': config.siteUrl + '/api/v3/twitch/utils/getId/{twitch_username}',
    'twitch_get_username_from_id': config.siteUrl + '/api/v3/twitch/utils/getUsername/{twitch_id}'
  }); 
});

module.exports = router;