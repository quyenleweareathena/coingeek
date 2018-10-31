# Plugin: Built-in JavaScript viewport informations (gulp_display)

### Installation

Set the enable option to `true` in *gulp-includes/js/my-file.js* :

```js
plugins: {
    gulp_display: true
}
```

### Get current viewport informations.

Example in : *gulp-includes/js/includes/example.js*

```js
console.log(gulp_display);
var height = gulp_display.getHeight();
var width = gulp_display.getWidth();
var scrollY = gulp_display.getScrollY();
var scrollX = gulp_display.getScrollX();
var orientation = gulp_display.getOrientation();
```

### Read current viewport informations.

`gulp_display.width`

Returns the current width of the viewport (in pixels).

`gulp_display.height`

Returns the current height of the viewport (in pixels).

`gulp_display.scrollY`

Returns vertical scroll position of the viewport. (Like window.scrollY, but cross-browser.)

`gulp_display.scrollX`

Returns horizontal scroll position of the viewport. (Like window.scrollX, but cross-browser.)

`gulp_display.orientation`

Returns the device orientation : 'portrait', 'landscape' or 'square'.

### Get previous viewport informations (after resize).

`gulp_display.widthOrigin`

Returns the previous width of the viewport (in pixels).

`gulp_display.heightOrigin`

Returns the previous height of the viewport (in pixels).

`gulp_display.orientationOrigin`

Returns the previous device orientation : 'portrait', 'landscape' or 'square'.

### Get previous viewport informations (after scroll).

`gulp_display.scrollYOrigin`

Returns the previous vertical scroll position of the viewport.

`gulp_display.scrollXOrigin`

Returns the previous horizontal scroll position of the viewport.

# Summary

- [Getting Started](./readme.md)
- [Available Gulp commands](./gulp-commands.md)
- [Use external libraries with Yarn](./external-libraries.md)
- [SCSS custom functions, mixins, image dimensions, inline assets](./scss-functions.md)
- [SCSS lint - How to bypass gulp check-scss warnings](./scss-lint.md)
- [JSHint - How to bypass gulp check-js warnings](./jshint.md)
- [Modernizr features detection](./modernizr.md)
- [Plugin: Responsive/Retina/Lazyload image](./responsive-image-plugin.md)
- [Plugin: Lazyload Iframe](./lazyload-iframe.md)
- [Plugin: Detect New Html Elements](./detect-new-html-elements.md)
- [CMS/Framework Integration](./cms-framework.md)
