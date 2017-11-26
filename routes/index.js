const express  = require('express');
const router   = express.Router();
const config   = require('../config').app;
const cache    = require('../config').cache;
const apicache = require('apicache').options({ debug: cache.debug }).middleware;

router.get('/', apicache(cache.static), function(req, res) {
  res.json({
    'api_v3': config.siteUrl + '/api/v3'
  });   
});

module.exports = router;