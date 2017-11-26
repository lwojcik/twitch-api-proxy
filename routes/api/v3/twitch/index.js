'use strict';

const express = require('express');
const router  = express.Router();
const config  = require('../../../../config').app;
const cache   = require('../../../../config').cache;
const apicache = require('apicache').options({ debug: cache.debug }).middleware;

router.get('/', apicache(cache.static), function(req, res) {
  res.json({
    'twitch_channel_hosts': config.siteUrl + '/api/v3/twitch/hosts/{twitch_username}',
    'twitch_channel_viewers': config.siteUrl + '/api/v3/twitch/viewers/{twitch_username}',
    'twitch_stream_status': config.siteUrl + '/api/v3/twitch/utils/streamstatus/{twitch_username}',
    'twitch_latest_follower': config.siteUrl + '/api/v3/twitch/latestfollower/{twitch_username}',
    'twitch_get_id_from_username': config.siteUrl + '/api/v3/twitch/utils/getId/{twitch_username}',
    'twitch_get_username_from_id': config.siteUrl + '/api/v3/twitch/utils/getUsername/{twitch_id}',
    'twitch_get_logo': config.siteUrl + '/api/v3/twitch/utils/getLogo/{twitch_username}'

  });
});

module.exports = router;