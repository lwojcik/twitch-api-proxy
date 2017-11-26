'use strict';

const express = require('express');
const router  = express.Router();
const cache   = require('../../../../../../config').cache;
const twitchUtils = require('../../../../../../utils/v3/twitchUtils');
const apicache = require('apicache').options({ debug: cache.debug }).middleware;

router.get('/:twitchId', apicache(cache.static), function(req, res) {
  const twitchId = req.params.twitchId;
  twitchUtils.getUsernameFromId(twitchId, res.json.bind(res));
});

module.exports = router;