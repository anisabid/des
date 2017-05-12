(function (window, document, $) {
    var EVENTS = {
        o: $({}),
        init: function () {
            $.each({
                trigger: 'publish',
                on: 'subscribe',
                off: 'unsubscribe'
            }, function (key, val) {
                jQuery[val] = function () {
                    EVENTS.o[key].apply(EVENTS.o, arguments);
                };
            });
        }
    };

    window.EVENTS = EVENTS.init();

})(window, window.document, jQuery);

(function (window, $) {

    var $$ = {
        $: function (obj) {
            $.extend($$, obj);
        },
        ready: function () {
            $.each(this, function (index, obj) {
                if (index !== '$' && index !== 'ready' && index !== 'fn') {
                    obj.ready();
                }
            });
        }
    };

    $(document).ready(function () {
        $$.ready();
    });

    window.KTJS = $$;

})(window, jQuery);
(function ($, $$) {

    $$.$({
        tools: {
            fn: function () {
                return true;
            },
            ready: function () {
                return true;
            }
        }
    });

})(jQuery, KTJS);
(function ($, $$) {

    $.fn.extend({

        json: function () {
            var data = $(this).data('json'),
                _data = {};
            if (typeof data === 'object') {
                return data;
            } else {
                try {
                    _data = JSON.parse(data);

                } catch (e) {
                    _data = {};
                    console.error("Parsing data error in element :", this);
                }
                return _data;
            }
        }
    });

})(jQuery, KTJS);
(function ($, $$) {

    $$.$({
        footer: {
            fn1: function () {
                console.log('FN footer !');
            },
            ready: function () {
                //console.log(this);
                //this.fn1();
                //this.fn1();
            }
        }

    });

})(jQuery, KTJS);
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
            select2: function () {

                //$('.select2-container .select2-results').mCustomScrollbar();

                $('[data-init-plugin="select2"]').select2(
                    $('#select2-test-json').json().select2
                ).on('select2:open', function(e){
                    //$('.select2-container .select2-results').mCustomScrollbar();
                    //console.log('select2:opening', $(this));
                    //$('.select2-results').mCustomScrollbar()
                    $('.select2-results .select2-results__options').addClass('scrollbar-inner').scrollbar({
                        ignoreMobile: false
                    })
                });
            },
            ready: function () {
                this.formGroupDefault();
                this.select2();
            }
        }
    });

})(jQuery, KTJS);


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
(function ($, $$) {

    // ToDO
    // Bug open subnav level 2

    $$.$({
        sidebar: {
            toggle: function () {
                $('.js-kt-sidebar-pin').click(function () {
                    $('body').toggleClass('kt-sidebar--pin');
                });
            },
            menu: {
                fn: {
                    open: function ($element) {
                        $element.toggleClass('open active');
                        $element.find('> ul').slideToggle();
                    },
                    close: function ($element) {
                        this.open($element);
                    }
                },
                toggle: function () {
                    var _this = this,
                        $sidebarMenu = $('.js-kt-sidebar-menu'),
                        $subMenuList = $('.js-kt-sidebar-menu .sub-menu'),
                        $sidebarMenuItemsList = $('.js-kt-sidebar-menu .menu-items li');

                    $sidebarMenuItemsList.each(function (t) {
                        var $this = $(this);
                        if ($this.find('> ul').length) {
                            $this.find('> a').click(function () {
                                if (!$this.hasClass('open'))
                                    _this.fn.close($sidebarMenu.find('.open'));
                                _this.fn.open($this);
                            });

                        }
                    })
                }
            },
            sidebar: function () {
                $('.js-kt-sidebar-menu-wrapper').scrollbar();
            },
            ready: function () {
                this.sidebar();
                this.menu.toggle();
                this.toggle();
            }
        }
    });

})(jQuery, KTJS);