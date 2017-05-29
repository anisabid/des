(function ($, $$) {
    /**
     *  plugin/form.js
     */

    // ToDO
    // ...

    $$.$({
        profile: {
            status: function () {
                $('.kt-profile-status').each(function () {
                    var $this = $(this);
                    $this.find('.kt-profile-status-list a[data-status]').click(function (event) {
                        event.preventDefault();
                        $this.find('.btn[data-status]').attr('data-status', $(this).data('status'))
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

