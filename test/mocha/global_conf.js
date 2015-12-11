/**
 * Created by nickjaremek on 11/12/15.
 */

/*
 * This file must be required in every test file before running any of the test scenarios.
 * In this manner, the database connection can be established once BEFORE running any tests.
 * Similarly, the database connection can be closed AFTER running all the tests.
 */
'use strict';
const async = require('async');
const massive = require('./../../database/setup_massive');

beforeEach(function(callback) {
  async.series({
    dropRoomsTable: function(done) {
      massive.reservation.drop_reservations_table(function() {
        return done();
      });
    },
    dropReservationsTable: function(done) {
      massive.room.drop_rooms_table(function() {
        return done();
      });
    },
    createRoomsTable: function(done) {
      massive.room.create_rooms_table(function() {
        return done();
      });
    },
    createReservationsTable: function(done) {
      massive.reservation.create_reservations_table(function() {
        return done();
      });
    }
  }, callback);
});
