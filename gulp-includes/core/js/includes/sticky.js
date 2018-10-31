/*
 * @file
 *
 * Available variables
 * - gulp_display
 *
 */


(function ($) {
    'use strict';

    $(document).ready(function () {
        updateSticky();
    });
    $(window).on('load resizeend scroll', function () {
        updateSticky();
    });

    function updateSticky() {
        if (gulp_display.getScrollY() > 0) {
            $('#main-menu').addClass('sticky');
        } else {
            $('#main-menu').removeClass('sticky');
        }
    }

})(jQuery);
