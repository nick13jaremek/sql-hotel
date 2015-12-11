/**
 * Created by nickjaremek on 11/12/15.
 */
'use strict';
const errors = require('restify-errors');

function listRoomsByStatus(dbHandler, roomStatus, callback) {

  dbHandler.room.list_rooms([roomStatus], function(error, rooms) {

    if (error) return callback(new errors.BadRequestError(error.message || 'Could not list Rooms'));

    return callback(null, rooms);
  });
}

function createRoom(dbHandler, roomInfo, callback) {
  dbHandler.rooms.insert(roomInfo, function(error, createdRoom) {
    if (error) return callback(new errors.BadRequestError(error.message || 'Could not create Room'));

    return callback(null, createdRoom);
  });
}

function updateRoom(dbHandler, roomId, roomInfo, callback) {

  dbHandler.rooms.update({id: roomId}, roomInfo, function(error, updatedRoom) {
    if (error) return callback(new errors.BadRequestError(error.message || 'Could not update Room'));

    return callback(null, updatedRoom);
  });
}

function deleteRoom(dbHandler, roomId, callback) {

  dbHandler.rooms.destroy({id: roomId}, function(error, deletedRoom) {
    if (error) return callback(new errors.BadRequestError(error.message || 'Could not delete Room'));

    return callback(null, deletedRoom);
  });
}
function listReservationsForRoom(dbHandler, roomId, callback) {

  dbHandler.room.select_reservations_for_room([roomId], function(error, reservationsList) {
    if (error) return callback(new errors.BadRequestError(error.message || 'Could not list reservations for Room'));

    return callback(null, reservationsList);
  });
}

function getRoom(dbHandler, roomId, callback) {
  dbHandler.rooms.findOne({id: roomId}, function(error, foundRoom) {
    if (error) return callback(new errors.BadRequestError(error.message || 'Could not get Room'));
    let response = foundRoom || {};
    return callback(null, response);
  });
}

module.exports = {
  list: listRoomsByStatus,
  create: createRoom,
  update: updateRoom,
  getReservations: listReservationsForRoom,
  delete: deleteRoom,
  get: getRoom
};
