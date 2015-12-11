/**
 * Created by nickjaremek on 7/12/15.
 */
'use strict';
const express = require('express');
const router = express.Router();
const roomManager = require('./../managers/Room');

function listRooms(req, res, next) {

  let roomStatus = req.query.status || 'available';

  roomManager.list(req.db, roomStatus, function(error, output) {

    if (error) return next(error);

    res.send(output);
  });
}

function createRoom(req, res, next) {
  let roomInfo = req.body;

  roomManager.create(req.db, roomInfo, function(error, output) {
    if (error) return next(error);

    res.send(output);
  });
}

function updateRoom(req, res, next) {

  let roomInfo = req.body;
  let roomId = req.params.id;

  roomManager.update(req.db, {id: roomId}, roomInfo, function(error, output) {

    if (error) return next(error);

    res.send(output);
  });
}

function deleteRoom(req, res, next) {

  let roomId = req.params.id;

  roomManager.delete(req.db, roomId, function(error, output) {
    if (error) return next(error);

    res.send(output);
  });
}

function listRoomReservations(req, res, next) {
  let roomId = req.params.id;

  roomManager.getReservations(req.db, roomId, function(error, output) {
    if (error) return next(error);

    res.send(output);
  });
}

router.post('/room', createRoom);
router.get('/rooms', listRooms);
router.put('/room/:id', updateRoom);
router.delete('/room/:id', deleteRoom);
router.get('/room/:id/reservations', listRoomReservations);

module.exports = router;
