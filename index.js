var VK       = require('vksdk');
var mongoose = require('mongoose');
var Promise  = require('bluebird');
var winston  = require('winston');
var Post     = require('./models/posts');
var config   = require('./config');

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

// Configs
var groupsIds    = ["casablanca77", "pidsluhanochernivtsi"];
var access_token = 'c4526179c4526179c452617929c409a901cc452c45261799d5b8de53513ab100b1fe811';

var vk = new VK({
  'appId': 6015096,
  'appSecret': 'lpNkoSBzUFjCtBsYZWpV',
  'language': 'ru'
});

/**
 * Request server methods
 */

// Setup server access token for server API methods
vk.on('serverTokenReady', function(_o) {
  // Here will be server access token
  vk.setToken(_o.access_token);
});

// Turn on requests with access tokens
vk.setSecureRequests(true);

// Request server API method
vk.request('secure.getSMSHistory', {}, function(_dd) {
  console.log(_dd);
});

/**
 * Request client methods
 */
// First you have to pass access_token from client side JS code
vk.setToken(access_token);

// Request 'users.get' method
vk.request('wall.get', {'owner_id': 177467237, count: 1}, function(_o) {
  // console.log(_o);
  // console.log(_o.response.items);
  // var fItem = _o.response.items[0];
  // console.log(fItem.attachments);

  // var post = new Post({
  //   text: fItem.text
  // });

  // post.save()
  //   .then(function() {
  //     console.log('post successfully saved!');
  //   });
});

vk.request('groups.getById', {
  group_ids: groupsIds.join(',')
}, function(answer) {
  var res = answer.response;

  if (res) {
    res.forEach(function(group) {
      vk.request('wall.get', {
        owner_id: -Math.abs(group.id),
        count: 1
      }, function(posts) {
        console.log(posts);
      });
    });
  }
});