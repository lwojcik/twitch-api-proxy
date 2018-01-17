'use strict';

const express = require('express');
const router = express.Router();
const config = require('../../../../../config').app;
const cache   = require('../../../../../config').cache;
const apicache = require('apicache').options({ debug: cache.debug }).middleware;
const twitchUtils  = require('../../../../../utils/v3/twitchUtils');

router.get('/', apicache(cache.static), function(req, res) {
  res.json({
    'twitch_channel_follower_count': config.siteUrl + '/api/v3/twitch/followercount/{twitch_username}'
  }); 
});

router.get('/:twitchUsername', apicache(cache.request), function(req, res) {
  const twitchUsername = req.params.twitchUsername;

  twitchUtils.getFollowerCount(twitchUsername, res.json.bind(res));
});

module.exports = router;