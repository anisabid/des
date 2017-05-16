(function ($, $$) {
    /**
     *  plugin/scrollbar.js
     */

    // ToDO
    // ...

    $$.$({
        scrollbar: {
            initPlugin: function ($scope, arg) {
                var _arg = (!arg)? {} : arg;
                $scope.scrollbar(_arg);
            },
            ready: function () {
                return true;
            }
        }
    });

})(jQuery, KTJS);