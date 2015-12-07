/**
 * Created by nickjaremek on 7/12/15.
 */
/**
 * Created by nickjaremek on 4/12/15.
 */
'use strict';
const express = require('express');
const router = express.Router();

function createRoomTable(req, res, next) {

    req.db.room.create_rooms_table(function(err, out) {

        if (err) return next(err);

        res.sendStatus(204);
    });
}

function listRooms(req, res, next) {
    req.db.room.list_rooms('available', function(err, out) {
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

router.post('/room/table', createRoomTable);
router.post('/room', createRoom);
router.get('/rooms', listRooms);
router.put('/room/:id', updateRoom);
router.delete('/room/:id', deleteRoom);

module.exports = router;