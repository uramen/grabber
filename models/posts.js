var mongoose = require('mongoose');
var autoIncrement = require('mongodb-autoincrement');

/**
 * City Schema
 */
const PostsSchema = new mongoose.Schema({
  _id: {
    type: Number
  },
  text: {
    type: String,
    required: true
  },
}, {_id: false});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
PostsSchema.method({});

/**
 * Statics
 */
PostsSchema.statics = {};

/**
 * @typedef Post
 */

PostsSchema.plugin(autoIncrement.mongoosePlugin);
module.exports = mongoose.model('Post', PostsSchema, 'posts');
