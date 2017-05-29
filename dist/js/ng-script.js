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
                if (index !== '$' && index !== 'ready' && index !== 'fn' && index !== 'plugins') {
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


(function (window, $) {

    $(document).ready(function () {
        $('.mpe .section').hover(function () {
            $('.mpe').attr('data-csection', $(this).data('section'));
        });


        $('.mpe .section [data-toggle="tooltip"]').tooltip();

    });

})(window, jQuery);
(function ($, $$) {

    $$.$({
        tools: {
            obj: function (o, s) {
                s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
                s = s.replace(/^\./, '');           // strip a leading dot
                var a = s.split('.');
                for (var i = 0, n = a.length; i < n; ++i) {
                    var k = a[i];
                    if (k in o) {
                        o = o[k];
                    } else {
                        return;
                    }
                }
                return o;
            },
            ready: function () {
                return true;
            }
        }
    });

})(jQuery, KTJS);

(function ($, $$) {
    /**
     *  extend/data-init.js
     */

    // ToDO
    // ...


    $.fn.extend({
        initPlugin: function (arg) {
            var data = (!arg) ? $(this).data('init-plugin') : arg,
                _data = [],
                regexp_array = /(^\[*)(.[^\[\]]*)(\]?)/g,
                regexp_trim = /(?=\S)[^,]+?(?=\s*(,|$))/g;

            // Test if has plugin to init
            if (data) {

                // Test if data type is array
                if (typeof data === 'object') {
                    _data = arg
                } else { // Else convert data to array
                    data = regexp_array.exec(data)[2];
                    _data = data.match(regexp_trim);
                }

                if (_data.length) {
                    $.each(_data, function (index, obj) {
                        console.log(index);
                        console.log(obj);
                    })
                }

            }
        }
    });

})(jQuery, KTJS);
(function ($, $$) {
    /**
     *  extend/data-json.js
     */

    // ToDO
    // ...


    /**
     * @param
     *  index: string // specifically index in data
     *
     * @description
     *  This extend function used to get json data defined in tag element
     *
     * @define
     *  <div id="input-test-json" data-json='{"select2":{"maximumSelectionLength":2}}'>...<div>
     *
     * @used
     *  - Get all index
     *  $('#input-test-json').json()
     *
     *  - Get select2 index
     *  $('#input-test-json').json().select2
     *  $('#input-test-json').json('select2')
     *
     * @example
     *  <div id="input-test-json" data-json='{"select2":{"maximumSelectionLength":2}}'>...<div>
     *  $('[data-init-plugin="select2"]').select2(
     *   $('#input-test-json').json().select2
     *  )
     *
     */


    $.fn.extend({

        json: function (index) {
            var data = $(this).data('json'),
                _data = {};

            // Get all data
            if (typeof data === 'object') {
                _data = data;
            } else {
                try {
                    _data = JSON.parse(data);
                } catch (e) {
                    _data = {};
                    console.error("Parsing data error in element :", this);
                }
            }

            // Get specifically index
            if(index && $().obj(_data, index)){
                _data = $().obj(_data, index);
            }

            // return _data
            return _data;
        }
    });

})(jQuery, KTJS);
(function ($, $$) {
    /**
     *  extend/obj.js
     */

    // ToDO
    // ...


    /**
     * @param
     *  o: Object // the object
     *  s: string // indexes to properties
     *  d: Any // default if not exist
     *
     * @description
     *  This extend function used to get property of obj
     *
     * @used
     *  - Get index
     *  $.obj(obj, 'index.index2')
     *
     * @example
     *  var obj = {
     *              a : {
     *                 b:{
     *                     c: 2
     *                  }
     *              }
     *          };
     *
     * $.obj(obj, 'a.b.c')
     */


    $.fn.extend({
        obj: function (o, s, d) {
            if( typeof(d) == 'undefined' ){
                d = null;
            }
            s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
            s = s.replace(/^\./, '');           // strip a leading dot
            var a = s.split('.');
            for (var i = 0, n = a.length; i < n; ++i) {
                var k = a[i];
                if (k in o) {
                    o = o[k];
                } else {
                    return d;
                }
            }
            return o;
        }
    });

})(jQuery, KTJS);
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
                    $.get("https://randomuser.me/api/?nat=FR", function (data) {
                        var appKtHeaderProfile = new Vue({
                            el: '#kt-header-profile',
                            data: data.results[0]
                        })
                    });

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
(function ($, $$) {
    /**
     *  plugin/footer.js
     */

    // ToDO
    // ...

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
    /**
     *  plugin/form.js
     */

    // ToDO
    // ...

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
            initPlugin: function () {
                $('[data-init-plugin="select2"]').select2(
                    //$('#select2-test-json').json().select2
                ).on('select2:open', function (e) {
                    $('.select2-results .select2-results__options').addClass('scrollbar-inner').scrollbar({
                        ignoreMobile: false
                    })
                });
            },
            ready: function () {
                this.formGroupDefault();
                this.initPlugin();
            }
        }
    });

})(jQuery, KTJS);


(function ($, $$) {
    /**
     *  plugin/header.js
     */

    // ToDO
    // ...

    $$.$({
        header: {
            affix: function () {

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
(function ($, $$) {
    /**
     *  plugin/initPlugin.js
     */

    // ToDO
    // ...

    $$.$({
        initPlugin: {
            plugins: {
                list: []
            },
            init: function ($scope, arg) {
                $('[data-init-plugin]').each(function () {
                    $(this).initPlugin();
                });
            },
            ready: function () {
                this.init();
            }
        }
    });

})(jQuery, KTJS);
(function ($, $$) {
    /**
     *  plugin/scrollbar.js
     */

    // ToDO
    // ...

    $$.$({
        scrollbar: {
            initPlugin: function ($scope, arg) {
                var _arg = (!arg)? {} : arg;
                $scope.scrollbar(_arg);
            },
            ready: function () {
                return true;
            }
        }
    });

})(jQuery, KTJS);
(function ($, $$) {

    /**
     *  plugin/sidebar.js
     */

    // ToDO
    // Bug open subnav level 2

    $$.$({
        sidebar: {
            toggle: function () {
                $('.js-kt-sidebar-action-pin').click(function () {
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
            initPlugin: function () {
                //$('.js-kt-sidebar-menu-wrapper').scrollbar();
                KTJS.scrollbar.initPlugin($('.js-kt-sidebar-menu-wrapper'));
            },
            ready: function () {
                this.initPlugin();
                this.menu.toggle();
                this.toggle();
            }
        }
    });

})(jQuery, KTJS);