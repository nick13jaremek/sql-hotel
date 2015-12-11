/**
 * Created by nickjaremek on 11/12/15.
 */
'use strict';

const massive = require('./../../database/setup_massive');
const async = require('async');

function populateDatabase(data, callback) {
  async.series({
    rooms: function(done) {
      if (!data.rooms) return done();
      massive.rooms.insert(data.rooms, function(error) {
        if (error) return done(error);
        return done();
      });
    },
    reservations: function(done) {
      if (!data.reservations) return done();
      massive.reservations.insert(data.reservations, function(error) {
        if (error) return done(error);
        return done();
      });
    }
  }, function(error) {
    if (error) return callback(error);
    return callback();
  });
}

module.exports = populateDatabase;