/**
 * Created by nickjaremek on 11/12/15.
 */
'use strict';
require('./../../global_conf');

const expect = require('expect.js');
const roomManager = require('./../../../../lib/managers/Room');
const massive = require('./../../../../database/setup_massive');
const populate = require('./../../populate');

describe('Room Manager::get', function() {

  beforeEach(function(done) {
    let room = {
      name: 'Grand Room',
      status: 'available',
      room_size: 4
    };

    populate({rooms: [room]}, done);
  });

  it('gets an existing Room successfully', function(done) {
    roomManager.get(massive, 1, function(error, foundRoom) {
      expect(error).to.be(null);
      expect(foundRoom).to.not.be(undefined);
      expect(foundRoom).to.have.property('id');
      expect(foundRoom.id).to.equal(1);
      expect(foundRoom).to.have.property('name');
      expect(foundRoom.name).to.equal('Grand Room');
      expect(foundRoom).to.have.property('status');
      expect(foundRoom.status).to.equal('available');
      expect(foundRoom).to.have.property('room_size');
      expect(foundRoom.room_size).to.equal(4);
      return done();
    });
  });

  it('returns an empty object for a non-existing Room', function(done) {
    roomManager.get(massive, 10, function(error, foundRoom) {
      expect(error).to.be(null);
      expect(foundRoom).to.not.be(undefined);
      expect(foundRoom).to.be.an('object');
      expect(foundRoom).to.be.empty();
      return done();
    });
  });
});
