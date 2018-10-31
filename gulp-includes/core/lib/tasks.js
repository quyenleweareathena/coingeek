const config = require('../../gulp-configuration');

module.exports = {
    getAllTasks : function () {
        var tasks = [
            {
                name : 'favicon',
                description : 'Creates and attach favicon files.',
                flags : {}
            },
            {
                name : 'imagemin',
                description : 'Optimises .jpg .jpeg .png .gif .svg images.',
                flags : {}
            },
            {
                name : 'clean',
                description : 'Erases generated assets.',
                flags : {}
            }
        ];
        if (config.generateJs.enable) {
            tasks.push(
                {
                    name : 'check-js',
                    description : 'Checks JavaScript syntax.',
                    flags : {}
                },
                {
                    name : 'javascript',
                    description : 'Builds JavaScript code.',
                    flags : {
                        '—-dev' : 'No minification, add viewport logging in console, build sourcemaps.'
                    }
                }
            );
        }
        if (config.generateCss.enable) {
            tasks.push(
                {
                    name : 'check-scss',
                    description : 'Checks Scss syntax.',
                    flags : {}
                },
                {
                    name : 'css',
                    description : 'Builds CSS stylesheets.',
                    flags : {
                        '—-dev' : 'Disable px to rem conversion, build sourcemaps.'
                    }
                }
            );
        }
        if (config.generateHtml.enable) {
            tasks.push(
                {
                    name : 'html',
                    description : 'Builds html templates and perform W3C validation.',
                    flags : {
                        '—-dev' : 'No html minification.'
                    }
                }
            );
        }
        if (config.generateGitignore.enable) {
            tasks.push(
                {
                    name : 'gitignore',
                    description : 'Builds custom .gitignore according to gulp-includes/gulp-configuration.js.',
                    flags : {}
                }
            );
        }
        return tasks;
    },
    getDefaultTasks : function () {
        var tasks = [];
        if (config.generateJs.enable) {
            tasks.push('check-js', 'javascript');
        }

        if (config.generateCss.enable) {
            tasks.push('check-scss', 'css');
        }

        if (config.generateHtml.enable) {
            tasks.push('html');
        }

        if (config.generateGitignore.enable) {
            tasks.push('gitignore');
        }
        return tasks;
    },
    getTaskByModule : function (task) {
        var getTask = require('../gulp-tasks/' + task.name);
        getTask.description = task.description;
        getTask.flags = task.flags;
        return getTask;
    }
};