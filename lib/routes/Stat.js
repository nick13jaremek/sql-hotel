/**
 * Created by nickjaremek on 9/12/15.
 */
'use strict';
const express = require('express');
const router = express.Router();

function getNumberOfRooms(req, res, next) {
  req.db.stat.count_number_of_items_in_rooms(function(err, out) {

    if (err) return next(err);

    let response = { rooms: out[0].count };
    res.send(response);
  });
}

function getNumberOfReservations(req, res, next) {

  let status = req.query.status ? 'where status = ' + status : '';

  req.db.stat.count_number_of_items_in_reservations(status, function(err, out) {

    if (err) return next(err);

    let response = { reservations: out[0].count };
    res.send(response);
  });
}

function getIncome(req, res, next) {

  let startTime = req.query.startTime ? new Date(req.query.startTime).toISOString() : new Date().toISOString();
  let endTime = req.query.endTime ? new Date(req.query.endTime).toISOString() : new Date('9999-30-01').toISOString();

  req.db.stat.get_reservations_income([startTime, endTime], function(err, out) {
    if (err) return next(err);

    let response = { sum: out[0].sum || 0.00 };

    res.send(response);
  });
}

router.get('/stats/room/count', getNumberOfRooms);
router.get('/stats/reservation/count', getNumberOfReservations);
router.get('/stats/reservation/income', getIncome);

module.exports = router;
