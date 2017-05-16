(function ($, $$) {
    /**
     *  plugin/initPlugin.js
     */

    // ToDO
    // ...

    $$.$({
        initPlugin: {
            plugins: {
                list: []
            },
            init: function ($scope, arg) {
                $('[data-init-plugin]').each(function () {
                    $(this).initPlugin();
                });
            },
            ready: function () {
                this.init();
            }
        }
    });

})(jQuery, KTJS);