'use strict'
const db = require('./../setup_massive');

exports.up = function(next) {
  db.reservation.create_reservations_table(function(err) {
    if (err) return next(err);

    return next();
  });
};

exports.down = function(next) {
  db.reservation.drop_reservations_table(function(err) {
    if (err) return next(err);

    return next();
  });
};
