'use strict';

const fs          = require('fs');
const https       = require('https');
const express     = require('express');
const bodyParser  = require('body-parser');
const compression = require('compression');
const helmet      = require('helmet');
const mongoose    = require('mongoose');

const config      = require('./config').app;
const cache       = require('./config').cache;
const database    = require('./config').database;
const battlenet   = require('./config').battlenet;
const ssl         = require('./config').ssl;

const apicache    = require('apicache').options({ debug: cache.debug }).middleware;

const bnetId      = battlenet.api.key;
const bnetSecret  = battlenet.api.secret;
 
const app = express();

mongoose.connect(database.url, { useMongoClient: true });
mongoose.Promise = global.Promise;

app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());

if (process.env.NODE_ENV !== 'production') {
  app.set('json spaces', 2);
}

// routes

require('./routes')(app);

// removing trailing slashes

app.use(function(req, res, next) {
  if (req.path.substr(-1) == '/' && req.path.length > 1) {
    let query = req.url.slice(req.path.length);
    res.redirect(301, req.path.slice(0, -1) + query);
  } else {
    next();
  }
});

const options = {
  key  : fs.readFileSync(ssl.key),
  cert : fs.readFileSync(ssl.cert)
};

module.exports = https.createServer(options, app).listen(config.port, function () {
  console.log('Started at port '+ config.port);
});