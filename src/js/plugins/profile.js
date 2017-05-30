(function ($, $$) {
    /**
     *  plugin/form.js
     */

    // ToDO
    // ...

    $$.$({
        profile: {
            status: function () {
                $('.kt-profile').each(function () {
                    var $this = $(this);
                    $this.find('[data-status-value]').click(function (event) {
                        event.preventDefault();
                        $this.find('[data-status]').attr('data-status', $(this).data('status-value'));
                        return true;
                    })
                });
            },
            ready: function () {
                this.status();
            }
        }
    });

})(jQuery, KTJS);

