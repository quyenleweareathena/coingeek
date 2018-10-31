/*
 * @file
 *
 * - gulp html [--dev]
 *
 * Builds html templates and perform W3C validation.
 *
 */

const html = require('../lib/html'),
    config = require('../../gulp-configuration'),
    glob = require('glob'),
    rls = require('remove-leading-slash'),
    upath = require('upath'),
    fs = require('fs-extra'),
    browserSync = require('browser-sync').get('BrowserSync Frontend Boilerplate : ' + config.project_name),
    argv = require('minimist')(process.argv.slice(2));

module.exports = function (done) {
    var htmlFiles = glob.sync(rls(upath.join(rls(config.generateHtml.src), '**', '*.twig')), {
        ignore : [
            '**/_*.twig'
        ]
    });
    if (config.generateHtml.enable_index) {
        htmlFiles.push('gulp-includes/core/twig/index.twig');
        glob.sync(rls(upath.join('gulp-includes/core/doc', '*.md'))).forEach(function (file) {
            htmlFiles.push(file);
        });
    }
    if (htmlFiles.length) {
        htmlFiles.forEach(function (file, index) {
            var fileExtension = upath.extname(file);
            var destination = rls(upath.join(rls(config.generateHtml.output), upath.basename(file, '.twig') + '.html'));
            if (fileExtension == '.md') {
                destination = upath.join(rls(config.generateHtml.output), 'gulp-documentation', upath.basename(file, '.md') + '.html');
            } else {
                var fileContent = fs.readFileSync(file, 'utf8');
                var regex = new RegExp("\\{%\\s*set\\s*output_path\\s*=\\s*['\"]?(.+?)['\"]?\\s*%\\}", 'gmiu');
                var matches = regex.exec(fileContent);
                if (matches !== null) {
                    destination = rls(upath.join(upath.dirname(destination), rls(matches[1])));
                }
            }
            html.generate(file, destination, function (result) {
                var success = result.success;
                if (argv.reload && success && argv._[0] === 'watch' && browserSync.instance.active) {
                    browserSync.stream();
                }
                if (success) {
                    if (fileExtension == '.md') {
                        if (index === htmlFiles.length - 1) {
                            done();
                        }
                    } else {
                        if (file != 'gulp-includes/core/twig/index.twig') {
                            if (result.html.length) {
                                html.check(upath.join(rls(destination)), result.html, true, function () {
                                    if (index === htmlFiles.length - 1) {
                                        done();
                                    }
                                });
                            } else {
                                if (index === htmlFiles.length - 1) {
                                    done();
                                }
                            }
                        } else {
                            if (index === htmlFiles.length - 1) {
                                done();
                            }
                        }
                    }
                } else if (index === htmlFiles.length - 1) {
                    done();
                }
            });
        });
    } else {
        done();
    }
};