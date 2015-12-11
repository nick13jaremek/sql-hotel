/**
 * Created by nickjaremek on 11/12/15.
 */
'use strict';
require('./../../global_conf');

const expect = require('expect.js');
const reservationManager = require('./../../../../lib/managers/Reservation');
const massive = require('./../../../../database/setup_massive');
const populate = require('./../../populate');

describe('Reservation Manager::get', function() {

  beforeEach(function(done) {
    let room = {
      name: 'Grand Room',
      status: 'available',
      room_size: 4
    };

    let reservation = {
      name: 'Mr. Jones',
      status: 'completed',
      paid: 100.00,
      start_time: '2015-12-01T09:00:18.622Z',
      end_time: '2015-12-07T09:00:18.622Z',
      room_id: 1
    };

    populate({rooms: [room], reservations: [reservation]}, done);
  });

  it('gets an existing Reservation successfully', function(done) {
    reservationManager.get(massive, 1, function(error, foundReservation) {
      expect(error).to.be(null);
      expect(foundReservation).to.not.be(undefined);
      expect(foundReservation).to.be.an('object');
      expect(foundReservation).to.have.property('id');
      expect(foundReservation.id).to.equal(1);
      expect(foundReservation).to.have.property('name');
      expect(foundReservation.name).to.equal('Mr. Jones');
      expect(foundReservation).to.have.property('status');
      expect(foundReservation.status).to.equal('completed');
      expect(foundReservation).to.have.property('paid');
      expect(foundReservation.paid).to.equal('100.00');
      expect(foundReservation).to.have.property('start_time');
      expect(foundReservation.start_time.toString()).to.equal('Tue Dec 01 2015 09:00:18 GMT+0100 (CET)');
      expect(foundReservation).to.have.property('end_time');
      expect(foundReservation.end_time.toString()).to.equal('Mon Dec 07 2015 09:00:18 GMT+0100 (CET)');
      expect(foundReservation).to.have.property('room_id');
      expect(foundReservation.room_id).to.equal(1);
      return done();
    });
  });

  it('returns an empty object when getting a non-existing Reservation', function(done) {
    reservationManager.get(massive, 10, function(error, foundReservation) {
      expect(error).to.be(null);
      expect(foundReservation).to.not.be(undefined);
      expect(foundReservation).to.be.empty();
      return done();
    });
  });
});
