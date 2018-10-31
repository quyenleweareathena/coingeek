![picture](gulp-includes/core/images/beta.png)
# Frontend Boilerplate

Minimalist and ready to use frontEnd HTML5/CSS/JS Boilerplate for creating new web projects with [Gulp.js](https://gulpjs.com/).

![picture](gulp-includes/core/images/screenshot.png)

# Getting Started

These instructions will help you run the project on a live system or on your local machine for 
development and testing purposes.

## Dependencies

First, make sure these are installed on your machine :

- [Node.js](http://nodejs.org)
- [Yarn](https://yarnpkg.com/)
- [Gulp](http://gulpjs.com)

## Quick start

In bash/terminal/command line, `cd` into your project directory.

1. Clone this repo or download zip.
2. Run `yarn install` to install required files. (Add --no-bin-links if on VirtualBox.)
3. When it's done installing, run one of the task runners to get going :
	- `gulp [--dev]` manually compiles HTML/CSS/JS files.
    - `gulp watch [--dev] [--reload]` automatically compiles HTML/CSS/JS and spies on files changes.
	
Consider using the `--dev` option for development and testing purposes **only**.

If you have any issue with `yarn install` on Windows, run the CLI as administrator and execute the following command :
`npm install -g --production windows-build-tools && npm rebuild`. Then close & open the CLI and try again.

:+1: :rocket: :+1: :rocket: :+1: :rocket: :+1: :rocket: :+1: :rocket: :+1: :rocket: :+1:

# Configuration

Everything you need is in *gulp-includes/gulp-configuration.js*.

# Documentation

- [Available Gulp commands](gulp-includes/core/doc/gulp-commands.md)
- [Use external libraries with Yarn](gulp-includes/core/doc/external-libraries.md)
- [SCSS custom functions, mixins, image dimensions, inline assets](gulp-includes/core/doc/scss-functions.md)
- [SCSS lint - How to bypass gulp check-scss warnings](gulp-includes/core/doc/scss-lint.md)
- [JSHint - How to bypass gulp check-js warnings](gulp-includes/core/doc/jshint.md)
- [Modernizr features detection](gulp-includes/core/doc/modernizr.md)
- [Plugin: Built-in JavaScript viewport informations (gulp_display)](gulp-includes/core/doc/viewport-framework.md)
- [Plugin: Responsive/Retina/Lazyload image](gulp-includes/core/doc/responsive-image-plugin.md)
- [Plugin: Lazyload Iframe](gulp-includes/core/doc/lazyload-iframe.md)
- [Plugin: Detect New Html Elements](gulp-includes/core/doc/detect-new-html-elements.md)
- [CMS/Framework Integration](gulp-includes/core/doc/cms-framework.md)

# Maintenance

Update outdated NPM dependencies :

`yarn upgrade-interactive --latest` (Add --no-bin-links if on VirtualBox.)

# Authors

[<img src="gulp-includes/core/images/fidesio-logo.png" width="50px">](https://www.fidesio.com/ "Fidesio") [<img src="gulp-includes/core/images/hedi.png" width="50px">](mailto:hedi.benaba@fidesio.com?subject=Frontend%20Boilerplate&body=Hi,%20 "Hédi Ben Aba") [<img src="gulp-includes/core/images/simon.png" width="50px">](mailto:simon.lucas@fidesio.com?subject=Frontend%20Boilerplate&body=Hi,%20 "Simon Lucas")

# License

Copyright (c) [Fidesio](https://www.fidesio.com/) and Contributors. All Rights Reserved.
