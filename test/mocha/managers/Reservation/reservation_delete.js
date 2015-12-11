/**
 * Created by nickjaremek on 11/12/15.
 */
'use strict';
require('./../../global_conf');

const expect = require('expect.js');
const reservationManager = require('./../../../../lib/managers/Reservation');
const massive = require('./../../../../database/setup_massive');
const populate = require('./../../populate');

describe('Reservation Manager::delete', function() {

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

  it('deletes a Reservation successfully', function(done) {

    reservationManager.delete(massive, 1, function(error, deletedReservationsArray) {
      expect(error).to.be(null);
      expect(deletedReservationsArray).to.not.be(undefined);
      expect(deletedReservationsArray).to.be.an('array');
      expect(deletedReservationsArray).to.have.length(1);

      let deletedReservation = deletedReservationsArray[0];
      expect(deletedReservation).to.have.property('id');
      expect(deletedReservation.id).to.equal(1);
      expect(deletedReservation).to.have.property('name');
      expect(deletedReservation.name).to.equal('Mr. Jones');
      expect(deletedReservation).to.have.property('status');
      expect(deletedReservation.status).to.equal('completed');
      expect(deletedReservation).to.have.property('paid');
      expect(deletedReservation.paid).to.equal('100.00');
      expect(deletedReservation).to.have.property('start_time');
      expect(deletedReservation.start_time.toString()).to.equal('Tue Dec 01 2015 09:00:18 GMT+0100 (CET)');
      expect(deletedReservation).to.have.property('end_time');
      expect(deletedReservation.end_time.toString()).to.equal('Mon Dec 07 2015 09:00:18 GMT+0100 (CET)');
      expect(deletedReservation).to.have.property('room_id');
      expect(deletedReservation.room_id).to.equal(1);
      return done();
    });
  });

  it('does not delete a Reservation', function(done) {
    reservationManager.delete(massive, 10, function(error, deletedReservationsArray) {
      expect(error).to.be(null);
      expect(deletedReservationsArray).to.not.be(undefined);
      expect(deletedReservationsArray).to.be.an('array');
      expect(deletedReservationsArray).to.be.empty();
      return done();
    });
  });
});
