/**
 * Created by nickjaremek on 7/12/15.
 */
'use strict';
const massive = require('massive');
const config = require('config');
const connectionStr = config.get('db.connection');
const scriptsDir = config.get('db.scriptsDir');

module.exports = massive.connectSync({connectionString: connectionStr, scripts: scriptsDir});
