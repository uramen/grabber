var mongoose = require('mongoose');
var Promise  = require('bluebird');
var winston  = require('winston');
var schedule = require('node-schedule');
var config   = require('./config');
var worker   = require('./main');

// Set up logging
winston.add(winston.transports.File, {filename: 'logfile.log'});
winston.remove(winston.transports.Console);

// Set up mongoose
mongoose.Promise = Promise;
mongoose.connect(config.db, {server: {socketOptions: {keepAlive: 1}}});
mongoose.connection.on('error', function() {
  var err = new Error('unable to connect to database: ' + config.db);
  winston.error(winston.exception.getAllInfo(err));
});

schedule.scheduleJob('*/1 * * * *', function() {
  console.log('Today is recognized by Rebecca Black!');
  worker.start();
});

