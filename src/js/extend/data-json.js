(function ($, $$) {
    /**
     *  extend/data-json.js
     */

    // ToDO
    // ...


    /**
     * @param
     *  index: string // specifically index in data
     *
     * @description
     *  This extend function used to get json data defined in tag element
     *
     * @define
     *  <div id="input-test-json" data-json='{"select2":{"maximumSelectionLength":2}}'>...<div>
     *
     * @used
     *  - Get all index
     *  $('#input-test-json').json()
     *
     *  - Get select2 index
     *  $('#input-test-json').json().select2
     *  $('#input-test-json').json('select2')
     *
     * @example
     *  <div id="input-test-json" data-json='{"select2":{"maximumSelectionLength":2}}'>...<div>
     *  $('[data-init-plugin="select2"]').select2(
     *   $('#input-test-json').json().select2
     *  )
     *
     */


    $.fn.extend({

        json: function (index) {
            var data = $(this).data('json'),
                _data = {};

            // Get all data
            if (typeof data === 'object') {
                _data = data;
            } else {
                try {
                    _data = JSON.parse(data);
                } catch (e) {
                    _data = {};
                    console.error("Parsing data error in element :", this);
                }
            }

            // Get specifically index
            if(index && $().obj(_data, index)){
                _data = $().obj(_data, index);
            }

            // return _data
            return _data;
        }
    });

})(jQuery, KTJS);