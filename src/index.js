'use strict';

var Twit = require('twit'),
    R = require('ramda'),
    repo = require('./lib/repo');

try {

  var T = new Twit({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  });

    console.log('Success: created twitter client');

  var stream = T.stream('statuses/filter',
                        { track: ['#anc', '#da', '#eff'],// 'economic freedom fighter',
                          //'african national congress', 'democratic alliance'],
                          // filter_level: 'medium',
                          language: ['en','af','st','ve','zu','xh','tn','ts','nr','ss'] });

    console.log('Suceess: created stream');

  stream.on('tweet', function (tweet) {
    try {
      repo.save(tweet);
    } catch(ex) {
        console.log('Error: stream error');
      console.log(ex);
    }
  });
} catch(ex){
    console.log('Error: unexpected error');
  console.log(ex);
}
