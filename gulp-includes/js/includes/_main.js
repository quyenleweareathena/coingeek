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

    function _add_class_active(){
        $(".select2-results__option").click(function(){
            alert(1111111111);
        })  
    }

    return {
        init: function () {
            _select2_location();
            _select2_type();
            _add_class_active();
            
        }
    };

}(jQuery, window));

jQuery(document).ready(function () {
    coingeek.init();

});