(function ($) {
    'use strict';

    $(document).ready(function () {
        createSlick();
    });

    $(window).on('resizeend', function () {
        createSlick();
    });

    function createSlick() {
        /* ########################################################################################### */
        /* ----------------- Slider || search-formation-bloc (tablet + mobile) ----------------- */
        var slider = $('.slider');
        if (slider.length > 0) {
            slider.not('.slick-initialized').slick(
                {
                    dot: true,
                    arrows: false,
                    autoplaySpeed: 5000,
                    autoplay: true,
                    slidesToShow: 1
                }
            );
        }
    }

})(jQuery);
