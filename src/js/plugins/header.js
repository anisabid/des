(function ($, $$) {
    /**
     *  plugin/header.js
     */

    // ToDO
    // ...

    $$.$({
        header: {
            affix: function () {

                console.log( $('.js-kt-header').height())

                $('.js-kt-header').affix({
                    offset: {
                        top: $('.js-kt-header').height()
                    }
                })
                    .on('affix.bs.affix', function () {
                        $('body').addClass($(this).json('header.classAffix'));
                    })
                    .on('affix-top.bs.affix', function () {
                        $('body').removeClass($(this).json('header.classAffix'));
                    });
            },
            ready: function () {
                //console.log(this);
                this.affix();
            }
        }
    });

})(jQuery, KTJS);