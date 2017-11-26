'use strict';

const mongoose = require('mongoose');

const bnetAccessTokenSchema = mongoose.Schema({
  bnetAccessToken: {
    token        : String,
    expiryDate   : String
  }
});

module.exports = mongoose.model('bnetAccessToken', bnetAccessTokenSchema);