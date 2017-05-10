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
                if (index !== '$' && index !== 'ready') {
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
            ready: function () {
                this.menu.toggle();
                this.toggle();
            }
        }
    });

})(jQuery, KTJS);