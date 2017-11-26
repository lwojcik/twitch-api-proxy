'use strict';

// TODO split into separate files

const env = process.env;

const config = {};

////////////////////////////////////////////////////////////////////////////////

config.app = {};

config.app.port                         = env.SG_API_NODE_PORT || 8881;
config.app.url                          = env.SG_API_NODE_IP;
config.app.protocol                     = env.SG_API_HOST_PROTOCOL || 'https';
config.app.host                         = env.SG_API_NODE_HOST || 'localhost';
config.app.siteUrl                      = config.app.protocol + '://' + config.app.host +  (env.NODE_ENV === 'production' ? '' : ':' + config.app.port);

////////////////////////////////////////////////////////////////////////////////

config.cache = {};

config.cache.debug                      = env.NODE_ENV === 'production' ? false : true;
config.cache.static                     = '2 weeks';
config.cache.semistatic                 = '1 hour';
config.cache.expensiveRequest           = '0 seconds';
config.cache.request                    = '10 seconds';

////////////////////////////////////////////////////////////////////////////////

config.ssl = {};

config.ssl.key                          = './ssl/server.key';
config.ssl.cert                         = './ssl/server.crt';

////////////////////////////////////////////////////////////////////////////////

config.database = {};

config.database.url                     = env.SG_API_MONGODB_DB_URL;

////////////////////////////////////////////////////////////////////////////////

config.twitch = {};

config.twitch.api = {};
config.twitch.api.protocol              = 'https';
config.twitch.api.url                   = 'api.twitch.tv';
config.twitch.api.path                  = '/kraken';
config.twitch.api.port                  = 443;
config.twitch.api.followerParams        = '/follows?direction=DESC&offset=0';
config.twitch.api.clientId              = env.SG_API_TWITCH_CLIENT_ID;

config.twitch.hostApi = {};
config.twitch.hostApi.protocol          = 'http';
config.twitch.hostApi.url               = 'tmi.twitch.tv';
config.twitch.hostApi.path              = '/hosts?include_logins=1';
config.twitch.hostApi.clientId          = env.SG_API_TWITCH_CLIENT_ID;

////////////////////////////////////////////////////////////////////////////////

module.exports = config;