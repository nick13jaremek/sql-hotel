/**
 * Created by nickjaremek on 11/12/15.
 */
'use strict';
require('./../../global_conf');

const expect = require('expect.js');
const roomManager = require('./../../../../lib/managers/Room');
const massive = require('./../../../../database/setup_massive');
const populate = require('./../../populate');

describe('Room Manager::update', function() {

  beforeEach(function(done) {
    let room = {
      name: 'Grand Room',
      status: 'available',
      room_size: 4
    };

    populate({rooms: [room]}, done);
  });

  it('updates a new Room successfully', function(done) {
    roomManager.update(massive, 1, {name: 'Presidential Suite'}, function(error, updatedRoomArray) {
      expect(error).to.be(null);
      expect(updatedRoomArray).to.not.be(undefined);
      expect(updatedRoomArray).to.be.an('array');

      let updatedRoom = updatedRoomArray[0];
      expect(updatedRoom).to.have.property('id');
      expect(updatedRoom.id).to.equal(1);
      expect(updatedRoom).to.have.property('name');
      expect(updatedRoom.name).to.equal('Presidential Suite');
      expect(updatedRoom).to.have.property('status');
      expect(updatedRoom.status).to.equal('available');
      expect(updatedRoom).to.have.property('room_size');
      expect(updatedRoom.room_size).to.equal(4);
      return done();
    });
  });

  it('yields an error during Room update for invalid data', function(done) {
    roomManager.update(massive, 10, {name: 'Presidential Suite'}, function(error, updatedRoomArray) {
      expect(error).to.be(null);
      expect(updatedRoomArray).to.not.be(undefined);
      expect(updatedRoomArray).to.be.an('array');
      expect(updatedRoomArray).to.be.empty();
      return done();
    });
  });
});
