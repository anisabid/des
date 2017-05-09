(function ($, $$) {

    $$.$({
        header: {
            fn1: function () {
                console.log('FN header!');
            },
            ready: function () {
                //console.log(this);
                //this.fn1();
            }
        }
    });

})(jQuery, KTJS);