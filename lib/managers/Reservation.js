/**
 * Created by nickjaremek on 11/12/15.
 */
const errors = require('restify-errors');

function createReservation(dbHandler, reservationInfo, callback) {

  dbHandler.reservations.insert(reservationInfo, function(error, createdReservation) {
    if (error) return callback(new errors.BadRequestError(error.message || 'Could not create Reservation'));

    return callback(null, createdReservation);
  });
}

function updateReservation(dbHandler, reservationId, reservationInfo, callback) {

  dbHandler.reservations.update({id: reservationId}, reservationInfo, function(error, updatedReservation) {
    if (error) return callback(new errors.BadRequestError(error.message || 'Could not update Reservation'));

    return callback(null, updatedReservation);
  });
}

function deleteReservation(dbHandler, reservationId, callback) {

  dbHandler.reservations.destroy({id: reservationId}, function(error, deletedReservation) {

    if (error) return callback(new errors.BadRequestError(error.message || 'Could not delete Reservation'));

    return callback(null, deletedReservation);
  });
}

function getReservation(dbHandler, reservationId, callback) {

  dbHandler.reservations.findOne({id: reservationId}, function(error, foundReservation) {
    if (error) return callback(new errors.BadRequestError(error.message || 'Could not get Reservation'));

    return callback(null, foundReservation);
  });
}

function listReservations(dbHandler, reservationStatus, callback) {
  dbHandler.reservation.list_reservations(reservationStatus, function(error, reservationList) {
    if (error) return callback(new errors.BadRequestError(error.message || 'Could not list Reservations'));

    return callback(null, reservationList);
  });
}

module.exports = {
  create: createReservation,
  list: listReservations,
  update: updateReservation,
  delete: deleteReservation,
  get: getReservation
};
