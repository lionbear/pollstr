'use strict';
const Twit = require('twit'),
      R = require('ramda'),
      repo = require('./lib/repo');

class Scrape {

    constructor(options){
        this.options = options;
        this.twit = new Twit(options.credentials);
        this.stream = T.stream('statuses/filter',
                               { track: options.track,
                                 filter_level: options.filter_level,
                                 language: options.language });
    }

    process(){
        stream.on('tweet', function (tweet) {
            try {
                repo.save(tweet);
            } catch(ex) {
                console.log('========================');
                console.log('Error: stream error');
                console.log('========================');
                console.log(ex);
                console.log('========================');
            }
        });
    }
}
