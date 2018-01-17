'use strict';

const express = require('express');
const router = express.Router();
const config = require('../../../../../config').app;
const cache   = require('../../../../../config').cache;
const apicache = require('apicache').options({ debug: cache.debug }).middleware;
const twitchUtils  = require('../../../../../utils/v3/twitchUtils');

router.get('/', apicache(cache.static), function(req, res) {
  res.json({
    'twitch_channel_latest_follower': config.siteUrl + '/api/v3/twitch/latestfollower/{twitch_username}'
  }); 
});

router.get('/:twitchUsername', apicache(cache.request), function(req, res) {
  let twitchUsername = req.params.twitchUsername;
  twitchUtils.getLatestFollower(twitchUsername, res.json.bind(res));
});

module.exports = router;