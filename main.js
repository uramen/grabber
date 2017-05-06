var winston = require('winston');
var VK      = require('vksdk');
var Post    = require('./models/posts');

// Configs
var groupsIds = ['casablanca77', 'pidsluhanochernivtsi'];
var vk        = new VK({
  'appId': 6015096,
  'appSecret': 'lpNkoSBzUFjCtBsYZWpV',
  'language': 'ru'
});

module.exports = {
  start: function() {
    vk.request('groups.getById', {
      group_ids: groupsIds.join(',')
    }, function(answer) {
      var res = answer.response;

      if (res) {
        res.forEach(function(group) {
          vk.request('wall.get', {
            owner_id: -Math.abs(group.id),
            count: 10
          }, function(answer) {
            var posts = answer.response.items;

            if (posts) {
              posts.forEach(function(post) {
                if (
                  post.post_type === 'post' &&
                  post.attachments !== undefined &&
                  post.text !== ''
                ) {
                  var postObj = new Post({
                    post_id: post.id,
                    group_id: post.owner_id,
                    user_id: post.from_id,
                    date: post.date,
                    text: post.text,
                    attachments: post.attachments
                  });

                  postObj.save()
                    .then(function() {
                      console.log('post successfully saved!');
                    }, function(err) {
                      // ignore duplicate key error, post_id
                      if (err.code !== 11000) {
                        winston.error(err);
                      }
                    });
                }
              });
            } else {
              winston.log('info', 'answer.response.items was empty');
            }
          });
        });
      }
    });
  }
}