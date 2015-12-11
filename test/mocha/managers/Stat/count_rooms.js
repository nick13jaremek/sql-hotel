/**
 * Created by nickjaremek on 11/12/15.
 */
'use strict';
require('./../../global_conf');

const expect = require('expect.js');
const statManager = require('./../../../../lib/managers/Stat');
const massive = require('./../../../../database/setup_massive');
const populate = require('./../../populate');

describe('Stat Manager::count rooms', function() {

  it('returns 3 as the number of the existing Rooms', function(done) {

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

    populate({rooms: rooms}, function(error) {
      expect(error).to.be(undefined);

      statManager.countRooms(massive, function(error, roomsCount) {
        expect(error).to.be(null);
        expect(roomsCount).to.not.be(undefined);
        expect(roomsCount).to.have.property('rooms');
        expect(roomsCount.rooms).to.equal('3');
        return done();
      });
    });
  });

  it('returns 0 as the count result for no Rooms', function(done) {
    statManager.countRooms(massive, function(error, roomsCount) {
      expect(error).to.be(null);
      expect(roomsCount).to.not.be(undefined);
      expect(roomsCount).to.have.property('rooms');
      expect(roomsCount.rooms).to.equal('0');
      return done();
    });
  });
});
