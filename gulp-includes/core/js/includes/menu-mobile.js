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
        $('#main-menu .wrapper').append('<div class="menu-mobile-trigger"></div>');
        $('.menu-mobile-trigger').click(function (e) {
            e.preventDefault();
            $('body').toggleClass('menu-open');
        });
    });

    $(window).on('resizeend', function () {
        if (gulp_display.getWidth() > 1024) {
            $('body').removeClass('menu-open');
        }
    });

})(jQuery);
