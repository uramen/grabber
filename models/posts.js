var mongoose      = require('mongoose');
var autoIncrement = require('mongodb-autoincrement');

/**
 * City Schema
 */
const PostsSchema = new mongoose.Schema({
  _id: {
    type: Number
  },
  post_id: {
    type: Number,
    required: true,
    index: {unique: true}
  },
  group_id: {
    type: Number,
    required: true
  },
  user_id: {
    type: Number,
    required: true
  },
  date: {
    type: Number,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  attachments: {
    type: Object,
    required: true
  }
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
