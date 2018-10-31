/*
 * @file
 *
 * Available variables
 * - gulp_display
 *
 */

var gulp_display = {};

(function ($) {
    'use strict';

    gulp_display.getHeight = function () {
        return verge.viewportH();
    };
    gulp_display.getWidth = function () {
        return verge.viewportW();
    };
    gulp_display.getScrollY = function () {
        return verge.scrollY();
    };
    gulp_display.getScrollX = function () {
        return verge.scrollX();
    };
    gulp_display.getOrientation = function () {
        return getOrientation(gulp_display.getWidth(), gulp_display.getHeight());
    };

    gulp_display.height = verge.viewportH();
    gulp_display.width = verge.viewportW();
    gulp_display.scrollY = verge.scrollY();
    gulp_display.scrollX = verge.scrollX();
    gulp_display.orientation = getOrientation(gulp_display.width, gulp_display.height);

    $(window).on('resizeend', function () {
        gulp_display.scrollYOrigin = gulp_display.scrollY;
        gulp_display.scrollXOrigin = gulp_display.scrollX;
        gulp_display.scrollY = verge.scrollY();
        gulp_display.scrollX = verge.scrollX();
        gulp_display.orientationOrigin = gulp_display.orientation;
        gulp_display.heightOrigin = gulp_display.height;
        gulp_display.widthOrigin = gulp_display.width;
        gulp_display.height = verge.viewportH();
        gulp_display.width = verge.viewportW();
        gulp_display.orientation = getOrientation(gulp_display.width, gulp_display.height);
    });

    $(window).on('scroll', function () {
        gulp_display.scrollYOrigin = gulp_display.scrollY;
        gulp_display.scrollXOrigin = gulp_display.scrollX;
        gulp_display.scrollY = verge.scrollY();
        gulp_display.scrollX = verge.scrollX();
    });

    function getOrientation(width, height) {
        if (height > width) {
            return 'portrait';
        } else if (height < width) {
            return 'landscape';
        } else {
            return 'square';
        }
    }

})(jQuery);