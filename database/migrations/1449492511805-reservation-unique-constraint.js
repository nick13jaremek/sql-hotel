'use strict';
const db = require('./../setup_massive');

exports.up = function(next) {
  db.reservation.add_unique_name_constraint(function(err) {
    if (err) return next(err);

    return next();
  });
};

exports.down = function(next) {
  db.reservation.delete_unique_name_constraint(function(err) {
    if (err) return next(err);

    return next();
  });
};
