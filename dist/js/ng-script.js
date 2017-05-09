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