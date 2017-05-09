(function ($, $$) {

    $$.$({
        sidebar: {
            toggle: function () {
                $('.js-kt-sidebar-pin').click(function () {
                    $('body').toggleClass('kt-sidebar--pin');
                    console.log('click')
                });
                console.log('xx')
            },
            ready: function () {
                this.toggle();
            }
        }
    });

})(jQuery, KTJS);