'use strict';

var cradle = require('cradle');

cradle.setup({
    host: process.env.COUCHDB_URL,
    cache: true,
    raw: false,
    forceSave: true
  });

var c = new(cradle.Connection),
    db = c.database('tweets');

db.exists(function (err, exists) {
  if (err) {
    console.log('error', err);
  } else if (exists) {
    console.log('the force is with you.');
  } else {
    console.log('database does not exists.');
    db.create();
    /* populate design documents */
  }
});

exports.save = function(tweet) {
  db.save(tweet.id.toString(), tweet, function(err, resp){
    if(err) console.error(err);
    console.log(resp);
  });
};
