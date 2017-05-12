(function ($, $$) {

    $.fn.extend({

        json: function () {
            var data = $(this).data('json'),
                _data = {};
            if (typeof data === 'object') {
                return data;
            } else {
                try {
                    _data = JSON.parse(data);

                } catch (e) {
                    _data = {};
                    console.error("Parsing data error in element :", this);
                }
                return _data;
            }
        }
    });

})(jQuery, KTJS);