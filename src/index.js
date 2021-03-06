'use strict';

const Promise = require('bluebird'),
      Scrape = require('./lib/scraper'),
      options = {
          credentials: {
              consumer_key: process.env.TWITTER_CONSUMER_KEY,
              consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
              access_token: process.env.TWITTER_ACCESS_TOKEN,
              access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
          },
          track: ['#anc', '#da', '#eff'],
          filter_level: 'low',
          language: ['en','af','st','ve','zu','xh','tn','ts','nr','ss']
      },
      RETRYINTERVAL = 30000;

let stream,
    scrape = Promise.promisify(function(options, cb) {
        try {
            var scrapper = new Scrape(options);
            stream = scrapper.process();
            cb();
        } catch(ex){
            console.log('========================');
            console.log('Error: unexpected error');
            console.log('========================');
            console.log(ex);
            console.log('========================');
            cb(ex);
        }
    }),
    success = function(){
        console.log('========================');
        console.log('Success: unexpected success');
        console.log('========================');
    },
    error = function(ex) {
        console.log('========================');
        console.log('Error: scrape failed to complete.');
        console.log('========================');
        console.log(ex);
        if(stream)
            stream.disconnect();
        setInterval(run, RETRYINTERVAL);
    },
    run = function(){
        scrape(options).then(success, error);
    };

run();
