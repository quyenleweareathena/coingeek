/*
 * @file
 *
 * - gulp gitignore
 *
 * Builds custom .gitignore according to gulp-includes/gulp-configuration.js.
 *
 */

const gitignore = require('../lib/gitignore');

module.exports = function (done) {
    var success = gitignore.generate();
    done();
};