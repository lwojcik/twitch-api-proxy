'use strict';

module.exports = function(app) {

  app.use( '/', require('./routes/index') );
  app.use( '/api', require('./routes/api/index') );

  // v3

  app.use( '/api/v3', require('./routes/api/v3/index') );
  
  app.use( '/api/v3/twitch', require('./routes/api/v3/twitch/index') );
  app.use( '/api/v3/twitch/hosts', require('./routes/api/v3/twitch/hosts/index') );
  app.use( '/api/v3/twitch/viewers', require('./routes/api/v3/twitch/viewers/index') );
  app.use( '/api/v3/twitch/latestfollower', require('./routes/api/v3/twitch/latestfollower/index') );
  app.use( '/api/v3/twitch/followercount', require('./routes/api/v3/twitch/followercount/index') );
  app.use( '/api/v3/twitch/streamstatus', require('./routes/api/v3/twitch/streamstatus/index') );

  app.use( '/api/v3/twitch/utils', require('./routes/api/v3/twitch/utils/index') );
  app.use( '/api/v3/twitch/utils/getId', require('./routes/api/v3/twitch/utils/getId/index') );
  app.use( '/api/v3/twitch/utils/getUsername', require('./routes/api/v3/twitch/utils/getUsername/index') );
  app.use( '/api/v3/twitch/utils/getLogo', require('./routes/api/v3/twitch/utils/getLogo/index') );

  app.use( '/api/v3/sc2', require('./routes/api/v3/sc2/index') );
  app.use( '/api/v3/sc2/bnet', require('./routes/api/v3/sc2/bnet/index') );

  app.use( '/api/v3/sc2/data', require('./routes/api/v3/sc2/data/index') );  
  
  app.use( '/api/v3/sc2/data/ladder', require('./routes/api/v3/sc2/data/ladder/index') );
  app.use( '/api/v3/sc2/data/ladder/lotv', require('./routes/api/v3/sc2/data/ladder/lotv/index') );
  
  app.use( '/api/v3/sc2/data/mmr', require('./routes/api/v3/sc2/data/mmr/index') );
  app.use( '/api/v3/sc2/data/mmr/lotv', require('./routes/api/v3/sc2/data/mmr/lotv/index') );

};