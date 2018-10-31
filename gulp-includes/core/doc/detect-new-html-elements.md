# Plugin: Detect New Html Elements

This plugins allows you to detect html elements as they're added to the document dynamically (through Ajax).

### Installation

Set the enable option to `true` in *gulp-includes/js/my-file.js* :

```js
plugins: {
    detectNewHtmlElements: true
}
```

### Usage in JavaScript


```js
(function ($) {
    'use strict';

    $(document).ready(function () {
        detectNewHtmlElements([
            {
                selector : '#carousel, #slider',
                callback : function (el) {
                    el.owlCarousel();
                }
            },
            {
                selector : '#masonry',
                callback : function (el) {
                    el.masonry();
                }
            }
        ]);
    });
    
})(jQuery);
```

# Summary

- [Getting Started](./readme.md)
- [Available Gulp commands](./gulp-commands.md)
- [Use external libraries with Yarn](./external-libraries.md)
- [SCSS custom functions, mixins, image dimensions, inline assets](./scss-functions.md)
- [SCSS lint - How to bypass gulp check-scss warnings](./scss-lint.md)
- [JSHint - How to bypass gulp check-js warnings](./jshint.md)
- [Modernizr features detection](./modernizr.md)
- [Plugin: Built-in JavaScript viewport informations (gulp_display)](./viewport-framework.md)
- [Plugin: Responsive/Retina/Lazyload image](./responsive-image-plugin.md)
- [Plugin: Lazyload Iframe](./lazyload-iframe.md)
- [CMS/Framework Integration](./cms-framework.md)