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

config.battlenet = {};

config.battlenet.api = {};
config.battlenet.api.protocol           = 'https';
config.battlenet.api.url                = 'api.battle.net';
config.battlenet.api.port               = 443;
config.battlenet.api.servers            = [ 'eu', 'us', 'kr', 'tw', 'sea' ];

config.battlenet.oauth = {}

config.battlenet.oauth.api = {}
config.battlenet.oauth.api.url                  = 'battle.net';
config.battlenet.oauth.api.urlCn                = 'https://battlenet.com.cn';

config.battlenet.oauth.checkAccessTokenUri      = 'battle.net/oauth/check_token?token=';
config.battlenet.oauth.checkAccessUriCn         = 'https://battlenet.com.cn/oauth/check_token?token=';
config.battlenet.oauth.getAccessTokenUri        = 'battle.net/oauth/token';
config.battlenet.oauth.getAccessTokenUriCn      = 'https://www.battlenet.com.cn/oauth/token';
config.battlenet.oauth.callbackUri              = config.app.siteUrl + '/callback';

config.battlenet.api.key                        = env.SG_API_BATTLENET_KEY;
config.battlenet.api.secret                     = env.SG_API_BATTLENET_SECRET;

////////////////////////////////////////////////////////////////////////////////

config.sc2 = {}

config.sc2.expansions                           = [ 'WOL', 'HOTS', 'LOTV'];

config.sc2.races                                = [ 'ALL', 'RANDOM', 'TERRAN', 'ZERG', 'PROTOSS'];

config.sc2.matchMaking = {}
config.sc2.matchMaking.modes                    = [ 'ALL', '1V1', '2V2', '3V3', '4V4' ];
config.sc2.matchMaking.queues                   = [ 'ALL', 'LOTV_SOLO', 'LOTV_TWOS', 'LOTV_THREES', 'LOTV_FOURS' ];

////////////////////////////////////////////////////////////////////////////////

module.exports = config;