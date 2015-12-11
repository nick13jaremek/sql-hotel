/**
 * Created by nickjaremek on 7/12/15.
 */
'use strict';
const express = require('express');
const router = express.Router();
const reservationManager = require('./../managers/Reservation');

function createReservation(req, res, next) {

  let reservationInfo = req.body;

  reservationManager.create(req.db, reservationInfo, function(error, output) {
    if (error) return next(error);

    res.send(output);
  });
}

function updateReservation(req, res, next) {

  let reservationInfo = req.body;
  let reservationId = req.params.id;

  reservationManager.update(req.db, reservationId, reservationInfo, function(error, output) {
    if (error) return next(error);

    res.send(output);
  });
}

function deleteReservation(req, res, next) {

  let reservationId = req.params.id;

  reservationManager.delete(req.db, reservationId, function(error, output) {
    if (error) return next(error);

    res.send(output);
  });
}

function getReservation(req, res, next) {

  let reservationId = req.params.id;

  reservationManager.get(req.db, reservationId, function(error, output) {
    if (error) return next(error);

    res.send(output);
  });
}

function listReservations(req, res, next) {

  let reservationStatus = 'where status = ' + req.query.status || '';
  reservationManager.list(req.db, reservationStatus, function(error, output) {
    if (error) return next(error);

    res.send(output);
  });
}

router.post('/reservation', createReservation);
router.get('/reservations', listReservations);
router.put('/reservation/:id', updateReservation);
router.delete('/reservation/:id', deleteReservation);
router.get('/reservation/:id', getReservation);

module.exports = router;

