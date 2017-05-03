var path = require('path');

var env = process.env.NODE_ENV || 'development';
var config = require('./' + env);

const defaults = {
  root: path.join(__dirname, '/..')
};

module.exports = Object.assign(defaults, config);
