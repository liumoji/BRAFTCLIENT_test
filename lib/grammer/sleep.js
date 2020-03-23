'use strict';
/**
 * 非阻塞休眠
 * @param {number} ms 休眠毫秒数 
 */
const sleep = (ms) =>
    new Promise((resolve, reject) =>
        setTimeout(resolve, ms));

module.exports = sleep;