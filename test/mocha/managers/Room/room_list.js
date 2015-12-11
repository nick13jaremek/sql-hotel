/**
 * Created by nickjaremek on 11/12/15.
 */
'use strict';
require('./../../global_conf');

const expect = require('expect.js');
const roomManager = require('./../../../../lib/managers/Room');
const massive = require('./../../../../database/setup_massive');
const populate = require('./../../populate');

describe('Room Manager::list', function() {

  beforeEach(function(done) {

    let rooms = [{
      name: 'Grand Room',
      status: 'available',
      room_size: 4
    }, {
      name: 'Presidential Suite',
      status: 'available',
      room_size: 7
    }, {
      name: 'Le Rome',
      status: 'booked',
      room_size: 3
    }];

    populate({rooms: rooms}, done);
  });

  it('returns a list of \'available\' Rooms successfully', function(done) {
    roomManager.list(massive, 'available', function(error, roomList) {
      expect(error).to.be(null);
      expect(roomList).to.not.be(undefined);
      expect(roomList).to.be.an('array');
      expect(roomList).to.have.length(2);
      return done();
    });
  });

  it('returns a list of \'booked\' Rooms successfully', function(done) {
    roomManager.list(massive, 'booked', function(error, roomList) {
      expect(error).to.be(null);
      expect(roomList).to.not.be(undefined);
      expect(roomList).to.be.an('array');
      expect(roomList).to.have.length(1);
      return done();
    });
  });

  it('return an EMPTY list for a non-existing \'status\' value', function(done) {
    roomManager.list(massive, 'invent', function(error, roomList) {
      expect(error).to.be(null);
      expect(roomList).to.be.an('array');
      expect(roomList).to.be.empty();
      return done();
    });
  });
});
