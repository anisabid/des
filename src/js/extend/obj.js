(function ($, $$) {
    /**
     *  extend/obj.js
     */

    // ToDO
    // ...


    /**
     * @param
     *  o: Object // the object
     *  s: string // indexes to properties
     *  d: Any // default if not exist
     *
     * @description
     *  This extend function used to get property of obj
     *
     * @used
     *  - Get index
     *  $.obj(obj, 'index.index2')
     *
     * @example
     *  var obj = {
     *              a : {
     *                 b:{
     *                     c: 2
     *                  }
     *              }
     *          };
     *
     * $.obj(obj, 'a.b.c')
     */


    $.fn.extend({
        obj: function (o, s, d) {
            if( typeof(d) == 'undefined' ){
                d = null;
            }
            s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
            s = s.replace(/^\./, '');           // strip a leading dot
            var a = s.split('.');
            for (var i = 0, n = a.length; i < n; ++i) {
                var k = a[i];
                if (k in o) {
                    o = o[k];
                } else {
                    return d;
                }
            }
            return o;
        }
    });

})(jQuery, KTJS);