const argv = require('minimist')(process.argv.slice(2)),
    modernizr = require('modernizr'),
    UglifyJS = require('uglify-js'),
    fs = require('fs-extra'),
    jshint = require('jshint').JSHINT,
    log = require('./log'),
    glob = require('glob'),
    os = require('os'),
    config = require('../../gulp-configuration'),
    upath = require('upath'),
    notifier = require('node-notifier'),
    rls = require('remove-leading-slash');

module.exports = {
    generate : function (source, fileConfig) {
        var success = true;
        var codeResult = false;

        function generateJavaScript(insertBefore, src, success) {
            if (fileConfig.output_path) {
                var output_path = rls(fileConfig.output_path);
            }
            var filename = upath.basename(source);
            var code = {};
            src.forEach(function (filePath) {
                if (fs.pathExistsSync(filePath)) {
                    code[filePath] = fs.readFileSync(filePath, 'utf8');
                }
            });
            var options = {
                output : {
                    preamble : insertBefore
                }
            };
            if (argv.dev && fileConfig.output_path) {
                options.sourceMap = {
                    filename : filename,
                    url : filename + '.map',
                    root : upath.relative(
                        upath.dirname(output_path),
                        './'
                    )
                };
                options.compress = false;
                options.output.beautify = true;
                options.mangle = false;
                options.output.comments = true;
                options.output.quote_style = 3;
            }
            var result = UglifyJS.minify(code, options);
            if (result.error) {
                success = false;
                notifier.notify({
                    title : 'JavaScript compilation Error',
                    message : 'Please check the syntax in your JS files.',
                    icon : './gulp-includes/core/images/fidesio-logo.png'
                });
                console.log(os.EOL);
                log.error(result.error);
                console.log(os.EOL);
            } else {
                codeResult = result.code;
                if (fileConfig.output_path) {
                    try {
                        fs.outputFileSync(output_path, codeResult);
                        if (argv.dev) {
                            fs.outputFileSync(output_path + '.map', result.map);
                        }
                    } catch (err) {
                        success = false;
                        notifier.notify({
                            title : 'Possible permission Error',
                            message : 'Cannot update or create file. Please check permissions.',
                            icon : './gulp-includes/core/images/fidesio-logo.png'
                        });
                        console.log(os.EOL);
                        log.error(err);
                        console.log(os.EOL);
                    }
                }
            }
            return {
                success : success,
                code : codeResult
            };
        }

        var src = [];
        fileConfig.src.forEach(function (filepath) {
            filepath = rls(filepath);
            if (glob.hasMagic(filepath)) {
                var files = glob.sync(filepath);
                if (files.length) {
                    files.forEach(function (file) {
                        src.push(rls(file));
                    });
                }
            } else {
                src.push(filepath);
            }
        });
        var gulp_display = fileConfig.plugins.gulp_display;
        var modernizrFeatures = fileConfig.plugins.modernizr['feature-detects'];
        var responsiveImage = fileConfig.plugins.responsiveImage;
        var load_print_css = fileConfig.plugins.load_print_css;
        var lazyloadIframe = fileConfig.plugins.lazyloadIframe;
        var detectNewHtmlElements = fileConfig.plugins.detectNewHtmlElements;
        var dev = fileConfig.plugins.dev;
        if (!argv.dev && dev) {
            dev = false;
        }
        if (responsiveImage) {
            modernizrFeatures.push('test/dom/mutationObserver', 'test/customevent', 'test/img/srcset');
        }
        if (lazyloadIframe) {
            modernizrFeatures.push('test/dom/mutationObserver', 'test/customevent');
        }
        if (detectNewHtmlElements) {
            modernizrFeatures.push('test/dom/mutationObserver');
        }
        if (gulp_display) {
            src.unshift(
                '/node_modules/jquery.resizeend/lib/jquery.resizeend.min.js',
                '/node_modules/verge/verge.min.js',
                'gulp-includes/core/js/display.js'
            );
        }
        if (responsiveImage || lazyloadIframe) {
            src.unshift(
                '/node_modules/intersection-observer/intersection-observer.js'
            );
        }
        var jQuery = fileConfig.jQuery;
        if (jQuery) {
            src.unshift(
                '/node_modules/jquery/dist/jquery.min.js'
            );
        }
        if (dev) {
            src.push(
                'gulp-includes/core/js/dev.js'
            );
        }
        if (responsiveImage) {
            src.push(
                'gulp-includes/core/plugins/responsive-image/responsive-image.js'
            );
        }
        if (load_print_css) {
            src.push(
                'gulp-includes/core/plugins/load-print-css/load-print-css.js'
            );
        }
        if (lazyloadIframe) {
            src.push(
                'gulp-includes/core/plugins/lazyload-iframe/lazyload-iframe.js'
            );
        }
        if (detectNewHtmlElements) {
            src.push(
                'gulp-includes/core/plugins/detect-new-html-elements/detect-new-html-elements.js'
            );
        }
        for (var i = 0; i < src.length; i++) {
            src[i] = rls(src[i]);
        }
        src = src.filter((v, i, a) => a.indexOf(v) === i);
        modernizrFeatures = modernizrFeatures.filter((v, i, a) => a.indexOf(v) === i);
        var insertBefore = '';
        if (modernizrFeatures.length > 0) {
            var minify = false;
            if (!argv.dev) {
                minify = true;
            }
            modernizr.build(
                {
                    'minify' : minify,
                    'feature-detects' : modernizrFeatures
                }, function (modernizr_build) {
                    insertBefore += modernizr_build;
                    return generateJavaScript(insertBefore, src, success);
                }
            );
        } else {
            return generateJavaScript(insertBefore, src, success);
        }
    },
    check : function (echo, callback) {
        var success = true;
        var firstFile = true;
        new Promise(function (resolve) {
            glob.sync(rls(upath.join(rls(config.generateJs.src_path), '**', '_*.js'))).forEach(function (file) {
                if (fs.pathExistsSync(file)) {
                    var data = fs.readFileSync(file, 'utf8');
                    jshint(data);
                    var warningsAndErrors = jshint.errors;
                    if (warningsAndErrors.length > 0) {
                        if (echo) {
                            if (firstFile) {
                                notifier.notify({
                                    title : 'JavaScript compilation Error',
                                    message : 'Please check the syntax in your JavaScript files.',
                                    icon : './gulp-includes/core/images/fidesio-logo.png'
                                });
                            }
                            var warnings = 0;
                            var errors = 0;
                            warningsAndErrors.forEach(function (lint) {
                                if (lint.id == '(error)') {
                                    errors = errors + 1;
                                } else {
                                    warnings = warnings + 1;
                                }
                            });
                            var message = '  ' + file + ' - ' + errors + ' error(s), ' + warnings + ' warning(s).';
                            console.log(os.EOL);
                            log.info(message);
                            warningsAndErrors.forEach(function (lint) {
                                var finalLog = '      ';
                                if (lint.id == '(error)') {
                                    finalLog += 'ERROR';
                                } else {
                                    finalLog += 'WARNING';
                                }
                                finalLog += '! ' + lint.reason + ' Line: ' + lint.line + ', Column: ' + lint.character + ' (' + lint.code + '). "' + lint.evidence + '".';
                                if (lint.id == '(error)') {
                                    log.error(finalLog);
                                } else {
                                    log.warn(finalLog);
                                }
                            });
                            console.log(os.EOL);
                        }
                        if (firstFile) {
                            success = false;
                            firstFile = false;
                        }
                    }
                }
            });
            resolve(success);
        }).then(function (success) {
            if (callback) {
                callback(success);
            }
        });
    }
};