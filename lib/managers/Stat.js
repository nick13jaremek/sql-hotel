/**
 * Created by nickjaremek on 11/12/15.
 */
'use strict';
const errors = require('restify-errors');

function countRooms(dbHandler, callback) {
  dbHandler.stat.count_number_of_items_in_rooms(function(error, countResult) {
    if (error) {
      return callback(new errors.BadRequestError(error.message
        || 'Could not calculate number of Rooms'));
    }

    let response = { rooms: countResult[0].count };

    return callback(null, response);
  });
}

function countReservationsForStatus(dbHandler, reservationStatus, callback) {

  dbHandler.stat.count_number_of_items_in_reservations(reservationStatus, function(error, countResult) {
    if (error) {
      return callback(new errors.BadRequestError(error.message
      || 'Could not calculate the number of Reservations'));
    }

    let response = { reservations: countResult[0].count };
    return callback(null, response);
  });
}

function sumReservationsIncome(dbHandler, startTime, endTime, callback) {

  dbHandler.get_reservations_income([startTime, endTime], function(error, totalIncome) {
    if (error) {
      return callback(new errors.BadRequestError(error.message
        || 'Could not calculate the total income for Reservations'));
    }

    let response = { sum: totalIncome[0].sum || 0.00 };

    return callback(null, response);
  });
}

module.exports = {
  countRooms: countRooms,
  countReservations: countReservationsForStatus,
  getIncome: sumReservationsIncome
}