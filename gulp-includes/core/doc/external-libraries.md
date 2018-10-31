# Use external libraries with [Yarn](https://yarnpkg.com/lang/en/docs/cli/add/)

## Installing

Using [Yarn's registered packages](https://yarnpkg.com/) :

`yarn add slick-carousel` (Add --no-bin-links if on VirtualBox.)

You can get more informations [here](https://yarnpkg.com/lang/en/docs/cli/add/).

## Uninstalling

`yarn remove slick-carousel` (Add --no-bin-links if on VirtualBox.)

## Including files

Include your JavaScript files in *gulp-includes/js/my-file.js*, order of inclusion will be respected. Here's an example :

```js
src : [
    'node_modules/slick-carousel/slick/slick.js'
]
```

Use the Sass import directive to include scss/css files. Path must be relative to the *.scss* file.

```scss
@import '../../node_modules/slick-carousel/slick/slick.scss'; //slick.scss
@import '../../node_modules/magnific-popup/dist/magnific-popup'; //magnific-popup.css
```

**Note:** Every asset (image or font) called with the url() statement from a node_modules/*.css stylesheet will be 
automatically base64 encoded according to the weight limit set in your main .scss file 
*gulp-includes/scss/my-file.scss* (in KB).

```scss
/* If this variable is omitted or set to 0, it won't do anything at all. */
$auto_base64_node_modules_css_weight_limit: 5;
```

# Summary

- [Getting Started](./readme.md)
- [Available Gulp commands](./gulp-commands.md)
- [SCSS custom functions, mixins, image dimensions, inline assets](./scss-functions.md)
- [SCSS lint - How to bypass gulp check-scss warnings](./scss-lint.md)
- [JSHint - How to bypass gulp check-js warnings](./jshint.md)
- [Modernizr features detection](./modernizr.md)
- [Plugin: Built-in JavaScript viewport informations (gulp_display)](./viewport-framework.md)
- [Plugin: Responsive/Retina/Lazyload image](./responsive-image-plugin.md)
- [Plugin: Lazyload Iframe](./lazyload-iframe.md)
- [Plugin: Detect New Html Elements](./detect-new-html-elements.md)
- [CMS/Framework Integration](./cms-framework.md)