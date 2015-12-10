/**
 * Created by nickjaremek on 7/12/15.
 */
'use strict';
const express = require('express');
const router = express.Router();

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

function getReservation(req, res, next) {

    let reservationId = req.params.id;

    req.db.reservations.findOne({id: reservationId}, function(err, out) {

        if (err) return next(err);

        res.send(out);
    });
}

function listReservations(req, res, next) {

    let reservationStatus = 'where status = ' + req.query.status || ''
    req.db.reservation.list_reservations(reservationStatus, function(err, out) {

        if (err) return next(err);

        res.send(out);
    });
}

router.post('/reservation', createReservation);
router.get('/reservations', listReservations);
router.put('/reservation/:id', updateReservation);
router.delete('/reservation/:id', deleteReservation);
router.get('/reservation/:id', getReservation);
module.exports = router;
