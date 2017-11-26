'use strict';

const twitchApi     = require('../shared/twitchApi');
const twitchHostApi = require('../shared/twitchHostApi');

module.exports = {
  getIdFromUsername: function(twitchUsername, callback) {
    twitchApi.query(twitchUsername, 'users', '_id', callback);
  },

  getUsernameFromId: function(twitchId, callback) {
    twitchHostApi.query('host', twitchId, callback);
  },

  getHosts: function(twitchUsername, callback) {
    twitchApi.query(twitchUsername, 'users', '_id', function(result) {
      twitchHostApi.query('target', result, callback);
    }); 
  },

  getFollowerCount: function(twitchUsername, callback) {
    twitchApi.query(twitchUsername, 'channels', 'followercount', callback);  
  },

  getStreamStatus: function(twitchUsername, callback) {
    twitchApi.query(twitchUsername, 'streams', 'streamstatus', callback);  
  },

  getViewers: function(twitchUsername, callback) {
    twitchApi.query(twitchUsername, 'streams', 'viewers', callback);  
  },

  getLatestFollower: function(twitchUsername, callback) {
    twitchApi.query(twitchUsername, 'channels', 'latestfollower', callback);  
  },

  getLogo: function(twitchUsername, callback) {
    twitchApi.query(twitchUsername, 'channels', 'logo', callback);      
  }
};