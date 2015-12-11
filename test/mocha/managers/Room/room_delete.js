/**
 * Created by nickjaremek on 11/12/15.
 */
'use strict';

require('./../../global_conf');

const expect = require('expect.js');
const roomManager = require('./../../../../lib/managers/Room');
const massive = require('./../../../../database/setup_massive');
const populate = require('./../../populate');

describe('Room Manager::delete', function() {

  beforeEach(function(done) {
    let room = {
      id: 1,
      name: 'Grand Room',
      status: 'available',
      room_size: 4
    };
    populate({rooms: [room]}, done);
  });

  it('deletes a Room successfully', function(done) {
    roomManager.delete(massive, 1, function(error, deletedRoomArray) {
      expect(error).to.be(null);
      expect(deletedRoomArray).to.not.be(undefined);
      expect(deletedRoomArray).to.be.an('array');
      expect(deletedRoomArray).to.have.length(1);

      let deletedRoom = deletedRoomArray[0];
      expect(deletedRoom).to.have.property('id');
      expect(deletedRoom.id).to.equal(1);
      expect(deletedRoom).to.have.property('name');
      expect(deletedRoom.name).to.equal('Grand Room');
      expect(deletedRoom).to.have.property('status');
      expect(deletedRoom.status).to.equal('available');
      expect(deletedRoom).to.have.property('room_size');
      expect(deletedRoom.room_size).to.equal(4);
      return done();
    });
  });

  it('does not delete anything for a non-existing room id', function(done) {
    roomManager.delete(massive, 10, function(error, deletedRoomsArray) {
      expect(error).to.be(null);
      expect(deletedRoomsArray).to.not.be(undefined);
      expect(deletedRoomsArray).to.be.empty();
      return done();
    });
  });
});
