var coingeek = (function ($, window, undefined) {
    'use strict';
    function _select2_location() {
        var $select = $('.filter__location');
        if ($select.length > 0) {
            $select.each(function () {
                var $place = $(this).attr('data-placeholder');
                console.log($place);
                $(this).select2({
                    width: '100%',
                    minimumResultsForSearch: -1,
                    placeholder: $place
                });
            });
        }
    }

    function _select2_type() {
        var $select = $('.filter__type');
        if ($select.length > 0) {
            $select.each(function () {
                var $place = $(this).attr('data-placeholder');
                console.log($place);
                $(this).select2({
                    width: '100%',
                    minimumResultsForSearch: -1,
                    placeholder: $place
                });
            });
        }
    }

    return {
        init: function () {
            _select2_location();
            _select2_type();
            
        }
    };

}(jQuery, window));

jQuery(document).ready(function () {
    coingeek.init();

});