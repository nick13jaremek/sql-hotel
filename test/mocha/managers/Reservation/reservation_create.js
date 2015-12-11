/**
 * Created by nickjaremek on 11/12/15.
 */
'use strict';
require('./../../global_conf');

const expect = require('expect.js');
const reservationManager = require('./../../../../lib/managers/Reservation');
const massive = require('./../../../../database/setup_massive');
const populate = require('./../../populate');

describe('Reservation Manager::create', function() {

  beforeEach(function(done) {
    let room = {
      name: 'Grand Room',
      status: 'available',
      room_size: 4
    };

    populate({rooms: [room]}, done);
  });

  it('creates a new Reservation successfully', function(done) {
    let reservation = {
      name: 'Mr. Jones',
      status: 'completed',
      paid: 100.00,
      start_time: '2015-12-01T09:00:18.622Z',
      end_time: '2015-12-07T09:00:18.622Z',
      room_id: 1
    };

    reservationManager.create(massive, reservation, function(error, createdReservation) {
      expect(error).to.be(null);
      expect(createdReservation).to.not.be(undefined);
      expect(createdReservation).to.have.property('id');
      expect(createdReservation.id).to.equal(1);
      expect(createdReservation).to.have.property('name');
      expect(createdReservation.name).to.equal('Mr. Jones');
      expect(createdReservation).to.have.property('status');
      expect(createdReservation.status).to.equal('completed');
      expect(createdReservation).to.have.property('paid');
      expect(createdReservation.paid).to.equal('100.00');
      expect(createdReservation).to.have.property('start_time');
      expect(createdReservation.start_time.toString()).to.equal('Tue Dec 01 2015 09:00:18 GMT+0100 (CET)');
      expect(createdReservation).to.have.property('end_time');
      expect(createdReservation.end_time.toString()).to.equal('Mon Dec 07 2015 09:00:18 GMT+0100 (CET)');
      expect(createdReservation).to.have.property('room_id');
      expect(createdReservation.room_id).to.equal(1);
      return done();
    });
  });

  it('yields an error for Reservation creation due to invalid data', function(done) {
    let reservation = {
      status: 'completed',
      paid: 100.00,
      start_time: '2015-12-01T09:00:18.622Z',
      end_time: '2015-12-07T09:00:18.622Z',
      room_id: 1
    };

    reservationManager.create(massive, reservation, function(error, createdReservation) {
      expect(error).to.not.be(null);
      expect(error).to.have.property('message');
      expect(error.message).to.equal('null value in column "name" violates not-null constraint');
      expect(createdReservation).to.be(undefined);
      return done();
    });
  });
});
