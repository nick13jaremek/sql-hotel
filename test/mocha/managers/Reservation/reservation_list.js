/**
 * Created by nickjaremek on 11/12/15.
 */
'use strict';
require('./../../global_conf');

const expect = require('expect.js');
const reservationManager = require('./../../../../lib/managers/Reservation');
const massive = require('./../../../../database/setup_massive');
const populate = require('./../../populate');

describe('Reservation Manager::list', function() {

  beforeEach(function(done) {
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
      status: 'pending',
      paid: 0.00,
      start_time: '2015-12-08T09:00:18.622Z',
      end_time: '2015-12-12T09:00:18.622Z',
      room_id: 1
    }];

    populate({rooms: [room], reservations: reservations}, done);
  });

  it('lists the reservations with \'completed\' status successfully', function(done) {
    reservationManager.list(massive, 'completed', function(error, reservationsList) {
      expect(error).to.be(null);
      expect(reservationsList).to.not.be(undefined);
      expect(reservationsList).to.be.an('array');
      expect(reservationsList).to.have.length(1);

      let reservation = reservationsList[0];
      expect(reservation).to.be.an('object');
      expect(reservation).to.have.property('id');
      expect(reservation.id).to.equal(1);
      expect(reservation).to.have.property('name');
      expect(reservation.name).to.equal('Mr. Jones');
      expect(reservation).to.have.property('status');
      expect(reservation.status).to.equal('completed');
      expect(reservation).to.have.property('room_id');
      expect(reservation.room_id).to.equal(1);
      return done();
    });
  });

  it('lists the reservations with \'pending\' status successfully', function(done) {
    reservationManager.list(massive, 'pending', function(error, reservationsList) {
      expect(error).to.be(null);
      expect(reservationsList).to.not.be(undefined);
      expect(reservationsList).to.be.an('array');
      expect(reservationsList).to.have.length(1);

      let reservation = reservationsList[0];
      expect(reservation).to.be.an('object');
      expect(reservation).to.have.property('id');
      expect(reservation.id).to.equal(2);
      expect(reservation).to.have.property('name');
      expect(reservation.name).to.equal('Mrs. Thompson');
      expect(reservation).to.have.property('status');
      expect(reservation.status).to.equal('pending');
      expect(reservation).to.have.property('room_id');
      expect(reservation.room_id).to.equal(1);
      return done();
    });
  });

  it('returns an empty list for reservations with invalid status', function(done) {
    reservationManager.list(massive, 'invent', function(error, reservationsList) {
      expect(error).to.be(null);
      expect(reservationsList).to.not.be(undefined);
      expect(reservationsList).to.be.an('array');
      expect(reservationsList).to.be.empty();
      return done();
    });
  });
});
