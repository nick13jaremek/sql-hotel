'use strict';
const db = require('./../setup_massive');

exports.up = function(next) {
  db.room.create_rooms_table(function(err) {
    if (err) return next(err);

    return next();
  });
};

exports.down = function(next) {
  db.room.drop_rooms_table(function(err) {
    if (err) return next(err);

    return next();
  });
};
