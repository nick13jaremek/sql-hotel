/**
 * Created by nickjaremek on 11/12/15.
 */
'use strict';
require('./../../global_conf');

const expect = require('expect.js');
const reservationManager = require('./../../../../lib/managers/Reservation');
const massive = require('./../../../../database/setup_massive');
const populate = require('./../../populate');

describe('Reservation Manager::update', function() {

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

  it('updates an existing Reservation successfully', function(done) {
    reservationManager.update(massive, 1, {name: 'Mr. James'}, function(error, updatedReservation) {
      expect(error).to.be(null);
      expect(updatedReservation).to.not.be(undefined);
      expect(updatedReservation).to.be.an('array');
      expect(updatedReservation).to.have.length(1);

      let reservation = updatedReservation[0];
      expect(reservation).to.have.property('id');
      expect(reservation.id).to.equal(1);
      expect(reservation).to.have.property('name');
      expect(reservation.name).to.equal('Mr. James');
      expect(reservation.room_id).to.equal(1);
      return done();
    });
  });

  it('does not update a non-existing Reservation', function(done) {
    return done();
  });
});
