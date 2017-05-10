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
            ready: function () {
                this.menu.toggle();
                this.toggle();
            }
        }
    });

})(jQuery, KTJS);