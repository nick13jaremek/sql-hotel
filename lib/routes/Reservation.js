/**
 * Created by nickjaremek on 7/12/15.
 */
'use strict';
let db;
let routes = {};

routes.createReservationTable = function(req, res, next) {

    db.reservation.create_reservations_table(function(err, out) {

        if (err) return next(err);

        res.sendStatus(204);
    });
}

routes.createReservation = function(req, res, next) {

    let reservationInfo = req.body;

    db.reservations.insert(reservationInfo, function(err, out) {

        if (err) return next(err);

        res.send(out);
    });
}

routes.updateReservation = function(req, res, next) {

    let reservationInfo = req.body;
    let reservationId = req.params.id;

    db.reservations.update({id: reservationId}, reservationInfo, function(err, out) {

        if (err) return next(err);

        res.send(out);
    });
}

routes.deleteReservation = function(req, res, next) {

    let reservationId = req.params.id;

    db.reservations.destroy({id: reservationId}, function(err, out) {

        if (err) return next(err);

        res.send(out);
    });
}

routes.listReservations = function(req, res, next) {

    db.reservation.list_reservations(function(err, out) {

        if (err) return next(err);

        res.send(out);
    });
}

module.exports = function(server) {
    db = server.get('db');
    server.post('/reservation/table', routes.createReservationTable);
    server.post('/reservation', routes.createReservation);
    server.get('/reservations', routes.listReservations);
    server.put('/reservation/:id', routes.updateReservation);
    server.delete('/reservation/:id', routes.deleteReservation);
}