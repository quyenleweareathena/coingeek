/*
 * @file
 *
 * - gulp check-js
 *
 * Checks JavaScript syntax.
 *
 */

const javascript = require('../lib/javascript');

module.exports = function (done) {
    javascript.check(true, function (success) {
        done();
    });
};