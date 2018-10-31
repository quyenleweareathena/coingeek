# JSHint - How to bypass gulp check-js warnings

#### Disable and enable again

```js
/* jshint ignore:start */
var foo = eval(parameter);
/* jshint ignore:end */
```

#### Disable for a single line

```js
var foo = eval(parameter); // jshint ignore:line
```

# Summary

- [Getting Started](./readme.md)
- [Available Gulp commands](./gulp-commands.md)
- [Use external libraries with Yarn](./external-libraries.md)
- [SCSS custom functions, mixins, image dimensions, inline assets](./scss-functions.md)
- [SCSS lint - How to bypass gulp check-scss warnings](./scss-lint.md)
- [Modernizr features detection](./modernizr.md)
- [Plugin: Built-in JavaScript viewport informations (gulp_display)](./viewport-framework.md)
- [Plugin: Responsive/Retina/Lazyload image](./responsive-image-plugin.md)
- [Plugin: Lazyload Iframe](./lazyload-iframe.md)
- [Plugin: Detect New Html Elements](./detect-new-html-elements.md)
- [CMS/Framework Integration](./cms-framework.md)