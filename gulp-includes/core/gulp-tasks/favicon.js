/*
 * @file
 *
 * - gulp favicon
 *
 * Creates and attach favicon files.
 *
 */

const pump = require('pump'),
    imagemin = require('gulp-imagemin'),
    config = require('../../gulp-configuration'),
    gulp = require('gulp'),
    log = require('../lib/log'),
    confirm = require('confirm-simple'),
    os = require('os'),
    upath = require('upath'),
    plumber = require('gulp-plumber'),
    chmod = require('gulp-chmod'),
    pjson = require('../../../package.json'),
    favicons = require('favicons').stream,
    rls = require('remove-leading-slash');

module.exports = function (done) {
    confirm(os.EOL + 'Project\'s short name is : ' + config.project_short_name + os.EOL + 'Langage code is : ' + config.project_lang + os.EOL + 'Source file is : ' + rls(config.generateFavicon.src) + os.EOL + 'Output directory is : ' + rls(config.generateFavicon.output) + os.EOL + 'Favicon\s main color is : ' + config.generateFavicon.main_color + os.EOL + os.EOL + 'Do you confirm?', function (y) {
        if (y) {
            log.info('Starting favicons generation...');
            pump([
                    gulp.src(rls(config.generateFavicon.src)),
                    plumber(),
                    favicons(
                        {
                            path : '/' + upath.relative(rls(config.project_root_directory), rls(config.generateFavicon.output)),
                            appName : config.project_short_name,
                            display : 'standalone',
                            orientation : 'any',
                            version : pjson.version,
                            replace : true,
                            dir : 'auto',
                            start_url : '/?utm_source=homescreen',
                            pipeHTML : false,
                            logging : true,
                            developerName : pjson.author.name,
                            developerURL : pjson.author.url,
                            background : 'transparent',
                            theme_color : config.generateFavicon.main_color,
                            lang : config.project_lang
                        }
                    ),
                    chmod(
                        {
                            owner : {
                                read : true,
                                write : true,
                                execute : true
                            },
                            group : {
                                read : true,
                                write : false,
                                execute : true
                            },
                            others : {
                                read : true,
                                write : false,
                                execute : true
                            }
                        }
                    ),
                    plumber.stop(),
                    gulp.dest(rls(config.generateFavicon.output))
                ], function () {
                    log.info('Finished favicons generation.');
                    log.info('Optimising generated favicons may take some time (1 to 2 minutes).');
                    confirm('Do you want to optimise generated images?', function (y) {
                        if (y) {
                            log.info('Starting favicons images optimisation...');
                            pump([
                                gulp.src(
                                    [
                                        rls(upath.join(rls(config.generateFavicon.output), '**', '*.gif')),
                                        rls(upath.join(rls(config.generateFavicon.output), '**', '*.png')),
                                        rls(upath.join(rls(config.generateFavicon.output), '**', '*.jpg')),
                                        rls(upath.join(rls(config.generateFavicon.output), '**', '*.jpeg')),
                                        rls(upath.join(rls(config.generateFavicon.output), '**', '*.svg'))
                                    ]
                                ),
                                plumber(),
                                imagemin(
                                    [
                                        imagemin.gifsicle({ interlaced : true, optimizationLevel : 3 }),
                                        imagemin.jpegtran({ progressive : false }),
                                        imagemin.optipng({ optimizationLevel : 7 }),
                                        imagemin.svgo({ plugins : [{ removeViewBox : false }, { removeUselessStrokeAndFill : false }] })
                                    ]
                                ),
                                chmod(
                                    {
                                        owner : {
                                            read : true,
                                            write : true,
                                            execute : true
                                        },
                                        group : {
                                            read : true,
                                            write : false,
                                            execute : true
                                        },
                                        others : {
                                            read : true,
                                            write : false,
                                            execute : true
                                        }
                                    }
                                ),
                                plumber.stop(),
                                gulp.dest(rls(config.generateFavicon.output))
                            ], function () {
                                done();
                                process.exit(0);
                            });
                        } else {
                            done();
                            process.exit(0);
                        }
                    });
                }
            );
        } else {
            done();
            process.exit(0);
        }
    });
};