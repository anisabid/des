(function ($, $$) {

    /**
     *  plugin/sidebar.js
     */

    // ToDO
    // Bug open subnav level 2

    $$.$({
        demo: {
            fn: {
                highlight: function () {
                    if (typeof hljs !== 'undefined') {
                        //hljs.initHighlightingOnLoad();
                        $('pre code').each(function (i, block) {
                            hljs.highlightBlock(block);
                        });
                    }
                },
                profile: function () {

                    // Header profile
                    /*$.get("https://randomuser.me/api/?nat=FR", function (data) {
                        var appKtHeaderProfile = new Vue({
                            el: '#kt-header-profile',
                            data: data.results[0]
                        })
                    });*/

                    // Demo Profile
                    // Demo profile a
                    /*$.get("https://randomuser.me/api/?nat=FR", function (data) {
                        var appKtHeaderProfile = new Vue({
                            el: '.demo-profile',
                            data: data.results[0]
                        })
                    });*/


                }
            },
            ready: function () {
                this.fn.profile();
                this.fn.highlight();
            }
        }
    });

})(jQuery, KTJS);