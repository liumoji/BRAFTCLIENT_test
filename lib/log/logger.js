'use strict';
const log4js = require('log4js');
const serverCnf = require('./../../config/server.js')
log4js.configure({
    appenders: { BTL: { type: 'file', filename: 'battle.log' } },
    categories: { default: { appenders: ['BTL'], level: 'debug' } }
});
const logger = log4js.getLogger('BTL');

if (serverCnf.debug === true) {
    logger.debug = console.log;
    logger.info = console.log;
    logger.warn = console.log;
    logger.error = console.log;
}

module.exports = logger;