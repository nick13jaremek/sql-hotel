/**
 * Created by nickjaremek on 4/12/15.
 */
'use strict';
const models = require('../../models');

let routes = {};

routes.getAllGuests = function(req, res, next) {
    models.Guest.findAll({}).then(function(guests) {
        res.send(guests);
    });
}

routes.createGuest = function(req, res, next) {

    var name = req.body.name;

    var newGuest = models.Guest.build({name: req.body.name || 'Mr. Figgles'});
    newGuest.save().then(function(savedGuest) {
        res.send(savedGuest);
    }, function(error) {
        res.send(new Error('Error'));
    });
}
module.exports = function(server) {
    server.get('/guests', routes.getAllGuests);
    server.post('/guest', routes.createGuest);
};