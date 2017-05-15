(function ($, $$) {

    // ToDO
    // Bug open subnav level 2

    $$.$({
        forms: {
            formGroupDefault: function () {
                $('.form-group.form-group-default').click(function () {
                    $(this).find('input').focus();
                });
                $('body').on('focus', '.form-group.form-group-default :input', function () {
                    $('.form-group.form-group-default').removeClass('focused');
                    $(this).parents('.form-group').addClass('focused');
                });

                $('body').on('blur', '.form-group.form-group-default :input', function () {
                    $(this).parents('.form-group').removeClass('focused');
                });

                $('.form-group.form-group-default .checkbox, .form-group.form-group-default .radio').hover(function () {
                    $(this).parents('.form-group').addClass('focused');
                }, function () {
                    $(this).parents('.form-group').removeClass('focused');
                });
            },
            initPluginSelect2: function () {
                $('[data-init-plugin="select2"]').select2(
                    $('#select2-test-json').json().select2
                ).on('select2:open', function (e) {
                    $('.select2-results .select2-results__options').addClass('scrollbar-inner').scrollbar({
                        ignoreMobile: false
                    })
                });
            },
            ready: function () {
                this.formGroupDefault();
                this.initPluginSelect2();
            }
        }
    });

})(jQuery, KTJS);

