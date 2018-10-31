# Modernizr features detection

*gulp-includes/js/my-file.js*

```js
/* Include Modernizr tests at the beginning of the bundle if feature-detects is filled. */
/* Features : https://modernizr.com/download */
plugins: {
    modernizr: {
        /* https://modernizr.com/download?video-videoloop */
        'feature-detects': [
            'test/video',
            'test/video/loop'
        ]
    }
}
```

*gulp-includes/js/includes/example.js*

```js
if (Modernizr.video.h264) {
    // Browser supports mp4 <video>
}
if (Modernizr.videoloop) {
    // Browser supports videoloop
}
```

# Summary

- [Getting Started](./readme.md)
- [Available Gulp commands](./gulp-commands.md)
- [Use external libraries with Yarn](./external-libraries.md)
- [SCSS custom functions, mixins, image dimensions, inline assets](./scss-functions.md)
- [SCSS lint - How to bypass gulp check-scss warnings](./scss-lint.md)
- [JSHint - How to bypass gulp check-js warnings](./jshint.md)
- [Plugin: Built-in JavaScript viewport informations (gulp_display)](./viewport-framework.md)
- [Plugin: Responsive/Retina/Lazyload image](./responsive-image-plugin.md)
- [Plugin: Lazyload Iframe](./lazyload-iframe.md)
- [Plugin: Detect New Html Elements](./detect-new-html-elements.md)
- [CMS/Framework Integration](./cms-framework.md)