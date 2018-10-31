/*
 * @file
 *
 * - gulp check-scss
 *
 * Checks SCSS syntax.
 *
 */

const css = require('../lib/css');

module.exports = function (done) {
    css.check(true, function (success) {
        done();
    });
};