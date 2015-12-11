/**
 * Created by nickjaremek on 9/12/15.
 */
'use strict';
const express = require('express');
const router = express.Router();
const statManager = require('./../managers/Stat');

function getNumberOfRooms(req, res, next) {

  statManager.countRooms(req.db, function(error, output) {
    if (error) return next(error);

    res.send(output);
  });
}

function getNumberOfReservations(req, res, next) {

  let status = req.query.status ? 'where status = ' + status : '';

  statManager.countReservations(req.db, status, function(error, output) {
    if (error) return next(error);

    res.send(output);
  });
}

function getIncome(req, res, next) {

  let startTime = req.query.startTime ? new Date(req.query.startTime).toISOString() : new Date().toISOString();
  let endTime = req.query.endTime ? new Date(req.query.endTime).toISOString() : new Date('9999-30-01').toISOString();

  statManager.getIncome(req.db, startTime, endTime, function(error, output) {
    if (error) return next(error);

    res.send(output);
  });
}

router.get('/stats/room/count', getNumberOfRooms);
router.get('/stats/reservation/count', getNumberOfReservations);
router.get('/stats/reservation/income', getIncome);

module.exports = router;
