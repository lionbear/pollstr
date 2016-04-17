'use strict';

let nano = require('nano')('http://' + process.env.COUCHDB_URL);

exports.save = function(tweet) {
    nano.insert(tweet, tweet.id.toString(), function(err, body, header) {
        if(err) {
            console.log(err);
            return;
        }
        console.log(header);
        console.log(body);
  });
};
