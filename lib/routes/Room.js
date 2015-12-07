/**
 * Created by nickjaremek on 7/12/15.
 */
/**
 * Created by nickjaremek on 4/12/15.
 */
'use strict';
let db;
let routes = {};

routes.createRoomTable = function(req, res, next) {
    db.room.create_rooms_table(function(err, out) {

        if (err) return next(err);

        res.sendStatus(204);
    });
}

routes.listRooms = function(req, res, next) {
    db.room.list_rooms('available', function(err, out) {
       if (err) return next(err);

        res.send(out);
    });
}

routes.createRoom = function(req, res, next) {
    let roomInfo = req.body;

    db.rooms.insert(roomInfo, function(err, out) {
       if (err) return next (err);

        res.send(out);
    });
}

routes.updateRoom = function(req, res, next) {

    let roomInfo = req.body;
    let roomId = req.params.id;

    db.rooms.update({id: roomId}, roomInfo, function(err, out) {
        if (err) return next(err);

        res.send(out);
    })
}

routes.deleteRoom = function(req, res, next) {

    let roomId = req.params.id;

    db.rooms.destroy({id: roomId}, function(err, out) {
        if (err) return next(err);

        res.send(out);
    });
}

module.exports = function(server) {
    db = server.get('db');
    server.post('/room/table', routes.createRoomTable);
    server.post('/room', routes.createRoom);
    server.get('/rooms', routes.listRooms);
    server.put('/room/:id', routes.updateRoom);
    server.delete('/room/:id', routes.deleteRoom);
}