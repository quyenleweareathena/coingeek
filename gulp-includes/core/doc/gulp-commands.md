# Available Gulp commands

### General

`gulp [--dev]` : Builds HTML/CSS/JS files and checks code.

`gulp watch [--dev] [--reload]` : Builds HTML/CSS/JS files, checks code and spies on files changes.

---

`gulp check-js` : Checks JavaScript syntax.

`gulp check-scss` : Checks Scss syntax.

`gulp javascript [--dev]` : Builds JavaScript code.

`gulp css [--dev]` : Builds CSS stylesheets.

`gulp html [--dev]` : Builds html templates and perform W3C validation.

`gulp gitignore` : Builds custom .gitignore according to *gulp-includes/.gitignore*.

### On demand

`gulp imagemin [--lossless]` : Optimises .jpg .jpeg .png .gif .svg .webp images.

`gulp favicon` : Creates and attach favicon files.

### These tasks aren't meant to be used on a real project :

`gulp clean` : Erases generated assets.

# Summary

- [Getting Started](./readme.md)
- [Use external libraries with Yarn](./external-libraries.md)
- [SCSS custom functions, mixins, image dimensions, inline assets](./scss-functions.md)
- [SCSS lint - How to bypass gulp check-scss warnings](./scss-lint.md)
- [JSHint - How to bypass gulp check-js warnings](./jshint.md)
- [Modernizr features detection](./modernizr.md)
- [Plugin: Built-in JavaScript viewport informations (gulp_display)](./viewport-framework.md)
- [Plugin: Responsive/Retina/Lazyload image](./responsive-image-plugin.md)
- [Plugin: Lazyload Iframe](./lazyload-iframe.md)
- [Plugin: Detect New Html Elements](./detect-new-html-elements.md)
- [CMS/Framework Integration](./cms-framework.md)