'use strict';

const express = require('express');
const router  = express.Router();
const config  = require('../../../../../config').app;
const cache   = require('../../../../../config').cache;
const twitchUtils = require('../../../../../utils/v3/twitchUtils');
const apicache = require('apicache').options({ debug: cache.debug }).middleware;

router.get('/', apicache(cache.static), function(req, res) {
  res.json({
    'twitch_channel_hosts': config.siteUrl + '/api/v3/twitch/hosts/{twitch_username}'
  }); 
});

router.get('/:twitchUsername', apicache(cache.request), function(req, res) {
  const twitchUsername = req.params.twitchUsername;
  twitchUtils.getHosts(twitchUsername, res.json.bind(res));
});

module.exports = router;