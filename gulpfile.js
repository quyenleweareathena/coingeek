/*
 * @file
 *
 * - gulp [--dev]
 * - gulp watch [--dev] [--reload]
 *
 * - gulp css [--dev]
 * - gulp favicon
 * - gulp html [--dev]
 * - gulp check-js
 * - gulp check-scss
 * - gulp javascript [--dev]
 * - gulp imagemin [--lossless]
 * - gulp gitignore
 * - gulp clean
 *
 */

const fs = require('fs-extra');
eval(fs.readFileSync('./gulp-includes/core/lib/index.js', 'utf8').toString());