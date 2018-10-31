const config = require('./gulp-includes/gulp-configuration'),
    gulp = require('gulp'),
    watch = require('gulp-watch'),
    upath = require('upath'),
    rls = require('remove-leading-slash'),
    argv = require('minimist')(process.argv.slice(2)),
    browserSync = require('browser-sync').create('BrowserSync Frontend Boilerplate : ' + config.project_name),
    reload = browserSync.reload,
    log = require('./gulp-includes/core/lib/log'),
    extension = require('./gulp-includes/core/lib/extension'),
    glob = require('glob'),
    tasks = require('./gulp-includes/core/lib/tasks');

if (!argv._.length || argv._[0] === 'watch' || argv._[0] === 'css' || argv._[0] === 'javascript' || argv._[0] === 'html') {
    if (argv.dev) {
        process.env.NODE_ENV = 'development';
        log.info('Notice : Consider using the --dev option for development and testing purposes only.');
    } else {
        process.env.NODE_ENV = 'production';
        log.info('Notice : Consider using the --dev option for development and testing purposes.');
    }
}

if (argv._[0] === 'watch' && !argv.reload && config.generateHtml.enable) {
    log.info('Notice : Consider using the --reload option to automatically reload browser when changes are detected.');
}

if (!argv._.length || argv._[0] === 'watch' || argv._[0] === 'css' || argv._[0] === 'javascript' || argv._[0] === 'html') {
    log.info('GULP MODE : ' + process.env.NODE_ENV.toUpperCase());
}

config.generateJs.src_path = './gulp-includes/js/';
config.generateCss.src_path = './gulp-includes/scss/';
config.generateHtml.src = './gulp-includes/twig/';

if (config.extension_mode) {
    config.generateHtml.enable_index = false;
    config.generateHtml.browsersync = false;
}

var tasksList = tasks.getAllTasks();
var default_tasks = tasks.getDefaultTasks();

for (var i in tasksList) {
    gulp.task(tasksList[i].name, tasks.getTaskByModule(tasksList[i]));
}

gulp.task('default', default_tasks, function () {
    if (config.extension_mode) {
        extension.generate();
    }
    notifyIndexHtmlLocation();
});

gulp.task('watch', default_tasks, function () {
    if (config.extension_mode) {
        extension.generate();
    }
    notifyIndexHtmlLocation();
    if (config.generateHtml.enable) {
        var startPath = upath.join(rls(config.generateHtml.output), 'index.html');
        if (!config.generateHtml.browsersync) {
            startPath = false;
        }
        if (!config.generateHtml.enable_index && startPath) {
            startPath = false;
            var htmlFiles = glob.sync(rls(upath.join(rls(config.generateHtml.src), '**', '*.twig')), {
                ignore : [
                    '**/_*.twig'
                ]
            });
            if (htmlFiles.length) {
                var destination = rls(upath.join(rls(config.generateHtml.output), upath.basename(htmlFiles[0], '.twig') + '.html'));
                var fileContent = fs.readFileSync(htmlFiles[0], 'utf8');
                var regex = new RegExp("\\{%\\s*set\\s*output_path\\s*=\\s*['\"]?(.+?)['\"]?\\s*%\\}", 'gmiu');
                var matches = regex.exec(fileContent);
                if (matches !== null) {
                    destination = rls(upath.join(upath.dirname(destination), rls(matches[1])));
                }
                startPath = destination;
            }
        }
        if (startPath) {
            var browserSync_options = {
                server : true,
                startPath : startPath,
                ui : false,
                notify : false,
                ghostMode : false,
                minify : true
            };
            browserSync.init(browserSync_options, function (err, bs) {
                // bs.sockets.on('connection', function (client) {
                // ___browserSync___.socket.emit('gulphtml')
                // client.on('gulphtml', function () {
                //     var task = require('./gulp-includes/core/gulp-tasks/html');
                //     task(function(){
                //         console.log('fini !');
                //     });
                // });
                // });
            });
        }
    }
    var tasks_to_run = [];
    var watcher = gulp.watch(['./gulpfile.js', './package.json', './gulp-includes/gulp-configuration.js', './gulp-includes/core/**/*']);
    watcher.on('change', function (absolute_path) {
        log.info('Watch has detected changes in ' + upath.relative(__dirname, absolute_path.path));
        log.info('Please restart Gulp.');
        process.exit(0);
    });
    if (config.extension_mode) {
        var extensionWatcher = gulp.watch(upath.join(rls(config.generateHtml.output), '**', '*'));
        var extensionWatchTimer;
        extensionWatcher.on('change', function (absolute_path) {
            clearTimeout(extensionWatchTimer);
            extensionWatchTimer = setTimeout(function () {
                extension.generate();
            }, 2000);
        });
    }
    if (config.generateJs.enable) {
        tasks_to_run = ['check-js', 'javascript'];
        if (config.generateHtml.enable) {
            tasks_to_run.push('html');
        }
        if (config.generateGitignore.enable) {
            tasks_to_run.push('gitignore');
        }
        if (config.generateHtml.enable && argv.reload) {
            gulp.watch(rls(upath.join(rls(config.generateJs.src_path), '**', '*')), tasks_to_run).on('change', function (e) {
                if (browserSync.instance.active) {
                    reload();
                }
                notifyFileHasChanged(e);
                notifyBrowserSyncUrls();
            });
        } else {
            gulp.watch(rls(upath.join(rls(config.generateJs.src_path), '**', '*')), tasks_to_run).on('change', function (e) {
                notifyFileHasChanged(e);
                notifyBrowserSyncUrls();
            });
        }
    }
    if (config.generateCss.enable) {
        tasks_to_run = ['check-scss', 'css'];
        if (config.generateHtml.enable) {
            tasks_to_run.push('html');
        }
        if (config.generateGitignore.enable) {
            tasks_to_run.push('gitignore');
        }
        if (config.generateHtml.enable && argv.reload) {
            gulp.watch(rls(upath.join(rls(config.generateCss.src_path), '**', '*')), tasks_to_run).on('change', function (e) {
                if (browserSync.instance.active) {
                    reload();
                }
                notifyFileHasChanged(e);
                notifyBrowserSyncUrls();
            });
        } else {
            gulp.watch(rls(upath.join(rls(config.generateCss.src_path), '**', '*')), tasks_to_run).on('change', function (e) {
                notifyFileHasChanged(e);
                notifyBrowserSyncUrls();
            });
        }
    }
    if (config.generateHtml.enable) {
        tasks_to_run = ['html'];
        if (config.generateGitignore.enable) {
            tasks_to_run.push('gitignore');
        }
        if (config.generateHtml.enable && argv.reload) {
            gulp.watch(rls(upath.join(rls(config.generateHtml.src), '**', '*')), tasks_to_run).on('change', function (e) {
                if (browserSync.instance.active) {
                    reload();
                }
                notifyFileHasChanged(e);
                notifyBrowserSyncUrls();
            });
        } else {
            gulp.watch(rls(upath.join(rls(config.generateHtml.src), '**', '*')), tasks_to_run).on('change', function (e) {
                notifyFileHasChanged(e);
                notifyBrowserSyncUrls();
            });
        }
    }
});

function notifyIndexHtmlLocation() {
    if (config.generateHtml.enable && config.generateHtml.enable_index) {
        log.info('index.html\'s location: ' + upath.join(__dirname, rls(config.generateHtml.output), 'index.html'));
    }
}

function notifyBrowserSyncUrls() {
    if (browserSync.instance.active) {
        log.info('Access URLs:');
        var browserSyncUrls = browserSync.getOption('urls');
        log.info('----------------------------------------------------');
        log.info('Local: ' + browserSyncUrls.get('local'));
        log.info('External: ' + browserSyncUrls.get('external'));
        notifyIndexHtmlLocation();
        log.info('----------------------------------------------------');
    }
}

function notifyFileHasChanged(e) {
    log.info('--------------------------------------------------------------------------------------------------------');
    if (argv.reload && config.generateHtml.enable) {
        log.info('File ' + e.path + ' has ' + e.type + ', reloading browser and running tasks...');
    } else {
        log.info('File ' + e.path + ' has ' + e.type + ', running tasks...');
    }
    log.info('--------------------------------------------------------------------------------------------------------');
}