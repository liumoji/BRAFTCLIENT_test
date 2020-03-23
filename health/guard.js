'use strict';
const logger = require('./../lib/log/logger.js');
const serverCnf = require('./../config/server.js');

const guard = {};

process.title = "battle server";

const coredump = () => {
    if (serverCnf.debug === true) {
        process.abort();
    }
}
process.on('exit', code => {
    logger.error(`process on exit, code:${code}`);
});
process.on('multipleResolves', (type, promise, reason) => {
    logger.error(`multipleResolves : type:${type}, ` +
        `promise:${promise}, reason:${reason}`);
    coredump();
});

process.on('unhandledRejection', (err, promise) => {
    logger.error(`caught unhandledRejection : ${err.stack}`);
    coredump();
});

process.on('uncaughtException', (err) => {
    logger.error(`caught uncaughtException : ${err.stack}`);
    coredump();
});

process.on('warning', (warning) => {
    logger.warn(`process on warning : name:${warning.name}` +
        `message:${warning.message}, stack:${warning.stack}`);
});

process.on('SIGINT', function () {
    logger.warn(`process on SIGINT, exiting`);
    if (serverCnf.debug === true) {
        process.exit(0);
    }
});

module.exports = guard;