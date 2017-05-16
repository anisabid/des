(function ($, $$) {
    /**
     *  extend/data-init.js
     */

    // ToDO
    // ...


    $.fn.extend({
        initPlugin: function (arg) {
            var data = (!arg) ? $(this).data('init-plugin') : arg,
                _data = [],
                regexp_array = /(^\[*)(.[^\[\]]*)(\]?)/g,
                regexp_trim = /(?=\S)[^,]+?(?=\s*(,|$))/g;

            // Test if has plugin to init
            if (data) {

                // Test if data type is array
                if (typeof data === 'object') {
                    _data = arg
                } else { // Else convert data to array
                    data = regexp_array.exec(data)[2];
                    _data = data.match(regexp_trim);
                }

                if (_data.length) {
                    $.each(_data, function (index, obj) {
                        console.log(index);
                        console.log(obj);
                    })
                }

            }
        }
    });

})(jQuery, KTJS);