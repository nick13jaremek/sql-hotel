/**
 * Created by nickjaremek on 7/12/15.
 */
'use strict';
const express = require('express');
const router = express.Router();


function createReservationTable (req, res, next) {

    req.db.reservation.create_reservations_table(function(err, out) {

        if (err) return next(err);

        res.sendStatus(204);
    });
}

function createReservation(req, res, next) {

    let reservationInfo = req.body;

    req.db.reservations.insert(reservationInfo, function(err, out) {

        if (err) return next(err);

        res.send(out);
    });
}

function updateReservation(req, res, next) {

    let reservationInfo = req.body;
    let reservationId = req.params.id;

    req.db.reservations.update({id: reservationId}, reservationInfo, function(err, out) {

        if (err) return next(err);

        res.send(out);
    });
}

function deleteReservation(req, res, next) {

    let reservationId = req.params.id;

    req.db.reservations.destroy({id: reservationId}, function(err, out) {

        if (err) return next(err);

        res.send(out);
    });
}

function listReservations(req, res, next) {

    req.db.reservation.list_reservations(function(err, out) {

        if (err) return next(err);

        res.send(out);
    });
}

router.post('/reservation/table', createReservationTable);
router.post('/reservation', createReservation);
router.get('/reservations', listReservations);
router.put('/reservation/:id', updateReservation);
router.delete('/reservation/:id', deleteReservation);

module.exports = router;
