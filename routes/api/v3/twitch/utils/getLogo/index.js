'use strict';

const express = require('express');
const router  = express.Router();
const cache   = require('../../../../../../config').cache;
const twitchUtils = require('../../../../../../utils/v3/twitchUtils');
const apicache = require('apicache').options({ debug: cache.debug }).middleware;

router.get('/:twitchUsername', apicache(cache.semistatic), function(req, res) {
  const twitchUsername = req.params.twitchUsername;
  twitchUtils.getLogo(twitchUsername, res.json.bind(res));
});

module.exports = router;