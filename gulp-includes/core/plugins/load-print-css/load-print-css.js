(function ($) {
    'use strict';

    $(window).on('load', function () {
        if (typeof gulp_print_css_url !== 'undefined' && gulp_print_css_url !== null) {
            $('head').append('<link rel="stylesheet" href="' + gulp_print_css_url + '" type="text/css" media="print"/>')
        }
    });

})(jQuery);