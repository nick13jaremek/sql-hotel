/**
 * Created by nickjaremek on 7/12/15.
 */
/**
 * Created by nickjaremek on 4/12/15.
 */
'use strict';
const express = require('express');
const router = express.Router();

function listRooms(req, res, next) {

    let roomStatus = req.query.status || 'available';

    req.db.room.list_rooms([roomStatus], function(err, out) {
       if (err) return next(err);

        res.send(out);
    });
}

function createRoom(req, res, next) {
    let roomInfo = req.body;

    req.db.rooms.insert(roomInfo, function(err, out) {
       if (err) return next (err);

        res.send(out);
    });
}

function updateRoom(req, res, next) {

    let roomInfo = req.body;
    let roomId = req.params.id;

    req.db.rooms.update({id: roomId}, roomInfo, function(err, out) {
        if (err) return next(err);

        res.send(out);
    })
}

function deleteRoom(req, res, next) {

    let roomId = req.params.id;

    req.db.rooms.destroy({id: roomId}, function(err, out) {
        if (err) return next(err);

        res.send(out);
    });
}

function listRoomReservations(req, res, next) {

    let roomId = req.params.id;

    req.db.room.select_reservations_for_room([roomId], function(err, out) {
       if (err) return next(err);

        res.send(out);
    });
}

router.post('/room', createRoom);
router.get('/rooms', listRooms);
router.put('/room/:id', updateRoom);
router.delete('/room/:id', deleteRoom);
router.get('/room/:id/reservations', listRoomReservations);
module.exports = router;