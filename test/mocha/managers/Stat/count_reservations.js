/**
 * Created by nickjaremek on 11/12/15.
 */
'use strict';
require('./../../global_conf');

const expect = require('expect.js');
const statManager = require('./../../../../lib/managers/Stat');
const massive = require('./../../../../database/setup_massive');
const populate = require('./../../populate');

describe('Stat Manager::count reservations', function() {

  it('returns 3 as the number of the existing Rooms', function(done) {

    let room = {
      name: 'Grand Room',
      status: 'available',
      room_size: 4
    };

    let reservations = [{
      name: 'Mr. Jones',
      status: 'completed',
      paid: 100.00,
      start_time: '2015-12-01T09:00:18.622Z',
      end_time: '2015-12-07T09:00:18.622Z',
      room_id: 1
    }, {
      name: 'Mrs. Thompson',
      status: 'completed',
      paid: 0.00,
      start_time: '2015-12-08T09:00:18.622Z',
      end_time: '2015-12-12T09:00:18.622Z',
      room_id: 1
    }];

    populate({rooms: [room], reservations: reservations}, function(error) {
      expect(error).to.be(undefined);

      statManager.countReservations(massive, 'completed', function(error, reservationsCount) {
        expect(error).to.be(null);
        expect(reservationsCount).to.not.be(undefined);
        expect(reservationsCount).to.have.property('reservations');
        expect(reservationsCount.reservations).to.equal('2');
        return done();
      });
    });
  });

  it('returns 0 as the number of Rooms for a non-existing \'status\'', function(done) {

    let room = {
      name: 'Grand Room',
      status: 'available',
      room_size: 4
    };

    let reservations = [{
      name: 'Mr. Jones',
      status: 'completed',
      paid: 100.00,
      start_time: '2015-12-01T09:00:18.622Z',
      end_time: '2015-12-07T09:00:18.622Z',
      room_id: 1
    }, {
      name: 'Mrs. Thompson',
      status: 'completed',
      paid: 0.00,
      start_time: '2015-12-08T09:00:18.622Z',
      end_time: '2015-12-12T09:00:18.622Z',
      room_id: 1
    }];

    populate({rooms: [room], reservations: reservations}, function(error) {
      expect(error).to.be(undefined);

      statManager.countReservations(massive, 'invent', function(error, reservationsCount) {
        expect(error).to.be(null);
        expect(reservationsCount).to.not.be(undefined);
        expect(reservationsCount).to.have.property('reservations');
        expect(reservationsCount.reservations).to.equal('0');
        return done();
      });
    });
  });


  it('returns 0 as the count result for no Rooms', function(done) {
    statManager.countReservations(massive, 'completed', function(error, reservationsCount) {
      expect(error).to.be(null);
      expect(reservationsCount).to.not.be(undefined);
      expect(reservationsCount).to.have.property('reservations');
      expect(reservationsCount.reservations).to.equal('0');
      return done();
    });
  });
});
