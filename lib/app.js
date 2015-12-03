/**
 * Created by nickjaremek on 3/12/15.
 */
'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const onFinished = require('on-finished');
const errors = require('restify-errors');
const log = require('../lib/util/logger');

const app = express({name: 'sql-hotel-app'});

const port = 3000;

app.use(function(req, res, next) {
    log.info('> ' + req.method + ' ' + req.url);
    next();
});

app.use(function(req, res, next) {

    onFinished(res, function(err) {
        let timing = Date.now() - new Date(req._time);

        if (err) {
            log.error('< ', err);
        }

        log.info('< headers', res.headers);

        if (res._data) {
            log.info('< ', res.statusCode, res._data.length, 'bytes', timing, 'ms');
        } else {
            log.info('< ', res.statusCode, 'empty response', timing, 'ms');
        }

    });

    next();
});

app.on('uncaughtException', function(req, res, router, error) {
    log.error('UncaughtException', error);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.on('uncaughtException', function(req, res, router, error) {
    log.error('UncaughtException', error);
});

app.use(logErrors);
app.use(errorHandler);

function logErrors(err, req, res, next) {
    log.error(err.stack);
    next(err);
}

function errorHandler(err, req, res, next) { // eslint-disable-line no-unused-vars
    if (err instanceof errors.HttpError) {
        res.status(err.statusCode).json(err.body);
        return;
    }

    if (err.message && err.statusCode) {
        let error = new errors.RestError({message: err.message, statusCode: err.statusCode});
        res.status(error.statusCode).json(error.body);
        return;
    }

    res.status(500).json({code: 'InternalError', message: err.message || 'Fatal error'});
}

function start(options) {
    app.listen(options.port, function() {
        log.info('Service listening on port', options.port);
        log.info('Your server is listening on port %d (http://localhost:%d)', options.port, options.port);
    });
}

module.exports = {
    start: start,
    server: app,
    port: port
};
