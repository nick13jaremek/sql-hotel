/**
 * Created by nickjaremek on 11/12/15.
 */
'use strict';
require('./../../global_conf');

const massive = require('./../../../../database/setup_massive');
const roomManager = require('./../../../../lib/managers/Room');
const expect = require('expect.js');
describe('Room Manager::create', function() {

  it('creates a new Room successfully', function(done) {
    let roomInfo = {
      name: 'Grand Room',
      status: 'available',
      'room_size': 4
    };

    roomManager.create(massive, roomInfo, function(error, createdRoom) {
      expect(error).to.be(null);
      expect(createdRoom).to.not.be(undefined);
      expect(createdRoom).to.have.property('name');
      expect(createdRoom.name).to.equal(roomInfo.name);
      expect(createdRoom).to.have.property('status');
      expect(createdRoom.status).to.equal(roomInfo.status);
      expect(createdRoom).to.have.property('room_size');
      expect(createdRoom.room_size).to.equal(roomInfo.room_size);
      return done();
    });
  });

  it('yields an error during Room creation for invalid data', function(done) {

    let roomInfo = {
      status: 'available',
      room_size: 4
    };

    roomManager.create(massive, roomInfo, function(error, createdRoom) {
      expect(error).to.not.be(null);
      expect(createdRoom).to.be(undefined);
      expect(error).to.have.property('message');
      expect(error.message).to.equal('null value in column \"name\" violates not-null constraint');
      return done();
    });
  });
});
