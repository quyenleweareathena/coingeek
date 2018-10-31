# Plugin: Lazyload Iframe

This plugins allows you to load iframes as they enter the viewport, drastically improving your website's pagespeed.

- Valid HTML
- IE 10+
- Detects newly added DOM elements (Ajax)
- Emits JS events at iframe init

### Installation

Set the enable option to `true` in *gulp-includes/js/my-file.js* :

```js
plugins: {
    lazyloadIframe: true
}
```

### Usage in HTML

You must use the class '*lazyload-iframe*' and the '*data-lazy-src*' attribute.

```html
<div class="lazyload-iframe" data-lazy-src="./page.html" data-custom-attribute="example"></div>
```

Will result in :

```html
<iframe src="./page.html" attribute="example"></iframe>
```

### Events listeners

#### Init

```js
(function ($) {
    'use strict';
    
    $(document).ready(function () {
        document.addEventListener('iframeInit', function (e) {
            console.log('An <iframe> tag has been generated.');
            var iframe = e.target;
        }, true);
    });
        
})(jQuery);
```

#### Notes

When using lazyload, you may need to detect when the iframe has loaded. If so, you can use the following code :

```js
(function ($) {
    'use strict';

    $(document).ready(function () {
        
        document.addEventListener('iframeInit', function (e) {
            var iframe = e.target;
            $(iframe).on('load', function() {
                // iframe has loaded
            });
        }, true);
        
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
- [Plugin: Detect New Html Elements](./detect-new-html-elements.md)
- [CMS/Framework Integration](./cms-framework.md)