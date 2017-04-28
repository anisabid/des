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

var ATX = {};
(function ($) {

    ATX = {

        header: {
            affix: {
                init: function () {
                    var classAffixHeader = 'affix-header',
                        limit = 72;
                    $(window).on('scroll', function () {
                        if (($(document).height() - $(window).height()) > limit) {
                            ($(window).scrollTop() > limit) ?
                                $('body').addClass(classAffixHeader) :
                                $('body').removeClass(classAffixHeader);
                        }
                    });
                    return true;
                },
                ready: function () {
                    ATX.header.affix.init();
                    return true;
                }
            },
            avatar: {
                init: function () {
                    var $userAvatar = $('.subnav-user .avatar'),
                        userName = $userAvatar.data('user'),
                        userNameTab = userName.split(' '),
                        login = '';
                    for (index = 0; index < userNameTab.length; index++) {
                        login += userNameTab[index][0];
                    }
                    $userAvatar.html(login);
                    return true;
                },
                ready: function () {
                    ATX.header.avatar.init();
                    return true;
                }
            },
            notification: {
                options: {
                    nbr: 0
                },
                update: function (obj) {
                    var $this = obj.$this,
                        _data = obj.data,
                        _length = obj.data.length,
                        $badge = $this.find('.badge'),
                        _list = '';

                    if (_length !== ATX.header.notification.options.nbr) {
                        $badge.html(_length);
                        if (_length) {
                            $badge.removeClass('hide');
                            $badge.show(0, function () {
                                $badge.removeClass('flash').addClass('flash');
                                document.getElementById('atx-notification-sound').play();
                                $this.find('.subnav-notification .fa').removeClass('swing').addClass('swing').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                                    $this.find('.subnav-notification .fa').removeClass('swing');
                                    $badge.removeClass('flash');
                                    $('#atx-notification-sound').attr('src', $(this).attr('atx-src'));
                                });
                            });
                            $this.find('.no-items').removeClass('hide').hide();
                            $this.find('.with-item').removeClass('hide').show();


                            $.each(_data, function (index, value) {
                                _list += '  <li class="notification-item new-item" atx-id-notification="' + value['id'] + '">\
                                        <a href="javascript:;" class="item">\
                                            <div class="vertical-align">\
                                                <p class="col-md-1 text-center circle">\
                                                    <span class=""><i class="fa fa-circle"></i></span>\
                                                </p>\
                                                <p class="col-md-8 text">\
                                                    <span class="text-master">' + value['messageNotification'] + '</span>\
                                                </p>\
                                                <p class="col-md-3 text-right date">\
                                                    <span class="text-master">' + $.timeago(value['dateNotification']) + '</span>\
                                                </p>\
                                            </div>\
                                        </a>\
                                    </li>'
                            });

                            $this.find('.notification-body_list.with-item').prepend(_list);
                            ATX.header.notification.items();


                        } else {
                            $badge.hide();
                            $this.find('.no-items').removeClass('hide').show();
                            $this.find('.with-item').removeClass('hide').hide();
                        }
                    }
                    ATX.header.notification.options.nbr = _length;


                },
                items: function () {
                    var $this = $('.atx-notification');
                    $this.find('.notification-item.new-item').one('click', function (event) {
                        event.preventDefault();
                        var _target = (typeof $this.attr('atx-notification-item-update') !== typeof undefined) ? $this.attr('atx-notification-item-update') : null;
                        if (_target) {
                            $.post(_target + '/' + $(this).attr('atx-id-notification'));
                            $(this).removeClass('new-item').addClass('old-item');
                        }
                    });
                },
                init: function () {
                    var $this = $('.atx-notification');
                    $this.find('.subnav-notification').click(function (event) {
                        event.preventDefault();
                        $(this).find('.badge').addClass('hide').html('0');
                        /*setTimeout(function () {
                         $this.find('.notification-item.new-item').removeClass('new-item').addClass('old-item');
                         }, 1000);*/
                    });

                    ATX.header.notification.items();

                },
                ready: function () {
                    ATX.header.notification.init();
                    return true;
                }
            },
            init: function () {
                ATX.header.notification.ready();
                ATX.header.avatar.ready();
                ATX.header.affix.ready();
                return true;
            },
            ready: function () {
                ATX.header.init();
                return true;
            }
        },
        footer: {
            affix: {
                init: function () {

                    var classAffixFooter = 'affix-footer',
                        limit = 48,
                        oldDocumentHeight = $('.atx-body').height(),
                        initClassAffixFooter = function () {
                            (($(window).height() - $('.atx-header').height() - $('.atx-body').height()) > 0) ? $('body').addClass(classAffixFooter) : $('body').removeClass(classAffixFooter);
                        };

                    initClassAffixFooter();

                    $(window).on('resize', function () {
                        initClassAffixFooter();
                    });
                    $('.atx-body').bind('DOMSubtreeModified', function () {
                        if (oldDocumentHeight !== $(this).height()) {
                            initClassAffixFooter();
                            oldDocumentHeight = $(this).height();
                        }

                    });
                    return true;
                },
                ready: function () {
                    ATX.footer.affix.init();
                    return true;
                }
            },
            init: function () {
                ATX.footer.affix.ready();
                return true;
            },
            ready: function () {
                ATX.footer.init();
                return true;
            }
        },
        bootstrap: {
            modal: {
                ajax: {
                    options: {
                        selector: {
                            id: '#atx-idAjaxModal'
                        }
                    },
                    fn: {
                        template: function (options) {
                            var _tpl = '\
                                            <style>@media print {body * { visibility: hidden;  } #atx-idAjaxModal * {  visibility: visible; } #atx-idAjaxModal{ position: absolute; left: 0;  top: 0; margin: 0; padding: 0;min-height:550px}}</style>\
                                            <div class="modal" id="atx-idAjaxModal" tabindex="-1" role="dialog" aria-labelledby="atx-idAjaxModalLabel" data-focus-on="input:first">\
                                                <div class="modal-dialog ' + options.size + '" role="document">\
                                                    <div id="atx-idAjaxModal-print-content" class="modal-content">\
                                                        <div class="modal-header">\
                                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>\
                                                            <h4 class="modal-title" id="atx-idAjaxModalLabel">' + options.title + '</h4>\
                                                        </div>\
                                                    <div class="modal-body clearfix">\
                                                    </div>\
                                                    <div class="modal-footer">\
                                                        <button type="button" class="btn btn-default pull-left" data-dismiss="modal">Fermer</button>';
                            if (options.btn.print) {
                                _tpl += '<button type="button" class="btn btn-primary" data-fn="print"><i class="fa fa-print"></i>&nbspImprimer</button>';
                            }
                            _tpl += '\
                                                    </div>\
                                                </div>\
                                            </div>\
                                    </div>';
                            return _tpl;
                        }
                    },
                    init: function () {
                        $('[atx-toggle="ajax-modal"]').each(function () {
                            var $this = $(this),
                                _target = (typeof $this.attr('atx-ajax-modal-target') !== typeof undefined) ? $this.attr('atx-ajax-modal-target') : (typeof $this.attr('href') !== typeof undefined) ? $this.attr('href') : null;

                            if (_target) {
                                $this.click(function (event) {
                                    event.preventDefault();
                                    ATX.component.loader.show();
                                    var $modal = $(ATX.bootstrap.modal.ajax.options.selector.id),
                                        _title = (typeof $this.attr('atx-ajax-modal-title') !== typeof undefined) ? $this.attr('atx-ajax-modal-title') : (typeof $this.attr('title') !== typeof undefined) ? $this.attr('title') : 'Titre',
                                        _tpl = ($(ATX.bootstrap.modal.ajax.options.selector.id).length) ?
                                            $(ATX.bootstrap.modal.ajax.options.selector.id) :
                                            $('body').append(ATX.bootstrap.modal.ajax.fn.template({
                                                size: $this.attr('atx-ajax-modal-size'),
                                                title: _title,
                                                btn: {
                                                    print: true
                                                }
                                            }));
                                    $.ajax({
                                        url: _target
                                    }).done(function (data) {
                                        $(ATX.bootstrap.modal.ajax.options.selector.id + ' .modal-body').html(data);
                                        ATX.component.loader.hide();
                                        $(ATX.bootstrap.modal.ajax.options.selector.id).modal('show');
                                        ATX.component.panel.init('#container-popup-fiche-synthetique-consultation-allotie');
                                        $(ATX.bootstrap.modal.ajax.options.selector.id + ' .btn[data-fn=print]').click(function () {
                                            event.preventDefault();
                                            window.print();

                                        });
                                        $(ATX.bootstrap.modal.ajax.options.selector.id).on('hidden.bs.modal', function (e) {
                                            $(ATX.bootstrap.modal.ajax.options.selector.id).remove();
                                        })
                                    });
                                    return false;
                                })
                            }

                        });
                        return true;
                    },
                    ready: function () {
                        ATX.bootstrap.modal.ajax.init();
                        return true;
                    }
                }
            },
            datetimepicker: {

                fn: function ($this) {

                    var letData = $this.attr('atx-datetimepicker-data'),
                        letConfig = {},
                        defaultConfig = {
                            icons: {
                                time: "fa fa-clock-o",
                                date: "fa fa-calendar",
                                up: "fa fa-arrow-up",
                                down: "fa fa-arrow-down"
                            },
                            format: 'DD/MM/YYYY',
                            allowInputToggle: true,
                            showClear: true
                        };
                    try {
                        letConfig = JSON.parse(letData);
                    } catch (e) {
                        letConfig = {};
                        console.error("Parsing live validation data error:", e);
                    }

                    // Merge letObjData into defaultConfig, recursively
                    $.extend(true, defaultConfig, letConfig);

                    $this.datetimepicker(defaultConfig);


                },
                init: function ($scope) {

                    if ($scope) {
                        $scope.find('.datetimepicker').each(function () {
                            ATX.bootstrap.datetimepicker.fn($(this));
                        });
                    } else {
                        $('.datetimepicker').each(function () {
                            ATX.bootstrap.datetimepicker.fn($(this));
                        })
                    }


                },
                ready: function () {
                    ATX.bootstrap.datetimepicker.init();
                    return true;
                }
            },
            init: function () {
                ATX.bootstrap.modal.ajax.ready();

                $('[data-toggle="tooltip"]').tooltip();

                // disabled in btn-group (checkboxes or radios) on data-toggle=buttons
                $('.btn-group .btn.disabled').click(function (event) {
                    event.stopPropagation();
                });
                return true;
            },
            ready: function () {
                ATX.bootstrap.init();
                return true;
            }
        },
        component: {
            panel: {
                options: {
                    classOpen: 'open',
                },
                element: function ($this) {
                    return {
                        $panel: $this.parents('.atx-form-panel_container.panel-toggle'),
                        $panelHeadeing: $this,
                        $panelBody: $this.parents('.atx-form-panel_container.panel-toggle').find('.atx-form-panel_body')
                    };
                },
                toggle: function ($obj) {
                    $obj.$panelHeadeing.attr('aria-expanded', function () {
                        return ($obj.$panelHeadeing.attr('aria-expanded') === 'true') ? 'false' : 'true';
                    });
                    $obj.$panelBody.slideToggle();
                    $obj.$panel.toggleClass(ATX.component.panel.options.classOpen);
                    return false;
                },
                init: function (selector) {
                    var _selector = (typeof selector !== typeof undefined) ? selector : 'body',
                        panelClassOpen = 'open',
                        $obj = {};
                    $(_selector).find('.atx-form-panel_container.panel-toggle').each(function () {
                        $obj.$panel = $(this);
                        $obj.$panelHeadeing = $(this).find('.atx-form-panel_headeing_container');
                        $obj.$panelBody = $(this).find('.atx-form-panel_body');

                        // Init
                        if ($obj.$panel.hasClass(ATX.component.panel.options.classOpen)) {
                            $obj.$panelBody.show();
                            $obj.$panelHeadeing.attr('aria-expanded', 'true');
                        }

                        // Toggle Event Click
                        $obj.$panelHeadeing.click(function (e) {
                            ATX.component.panel.toggle(ATX.component.panel.element($(this)));
                            e.preventDefault();
                            return false;
                        });

                        // Toggle Event Keyup
                        $obj.$panelHeadeing.keypress(function (e) {
                            if (e.keyCode === 13 || e.keyCode === 32) {
                                e.preventDefault();
                                ATX.component.panel.toggle($obj);
                                return false;
                            }

                            return false;
                        });

                    });
                    return true;
                },
                ready: function () {
                    ATX.component.panel.init();
                    return true;
                }

            },
            search: {
                options: {
                    url: {
                        service: '',
                        submit: ''
                    },
                    milliseconds: 500,
                    timeOut: '',
                    encode: false
                },
                q: '',
                elem: '',
                service: function () {
                    console.log(ATX.component.search.q);
                    $.ajax({
                        url: ATX.component.search.options.url.service + ATX.component.search.q,
                        success: function (data) {
                            ATX.component.search.data(data);
                        },
                        error: function () {
                            console.log('error')
                        }
                    });
                    return true;
                },
                data: function (data) {
                    var index = 0, length = data.length, rows = '';
                    $elem = ATX.component.search.element(ATX.component.search.elem);
                    if (length !== 0) {
                        for (index = 0; index < data.length; index++) {
                            rows += ATX.component.search.row(data[index]);
                        }
                        $elem.search.removeClass('hide-result').addClass('show-result');
                        $elem.result.html(rows);
                    }
                },
                row: function (data) {
                    return '<li class="item" data-idRow="' + data['idConsultation'] + '"><a class="item_link" href="' + ATX.component.search.url(data['numeroConsultation']) + '">' + data['numeroConsultation'] + ' ' + data['intituleConsultation'] + '</a></li>'
                },
                clear: function ($elem) {
                    $elem.q.val('');
                    $elem.btn.attr('href', '');
                    ATX.component.search.q = '';
                    $elem = ATX.component.search.element(ATX.component.search.elem);
                    $elem.search.removeClass('show-result').addClass('hide-result');
                    $elem.result.html('');
                    return true;
                },
                encode: function (q) {
                    q = q.replace('<B>', '').replace('<b>', '').replace('</B>', '').replace('</b>', '');
                    if (ATX.component.search.options.encode) {
                        return Base64.encode(encodeURIComponent(q));
                    }
                    return q;

                },
                url: function (q) {
                    return ATX.component.search.options.url.submit + ATX.component.search.encode(q);
                },
                href: function ($elem) {
                    $elem.btn.attr('href', ATX.component.search.url(ATX.component.search.q));
                },
                submit: function () {
                    document.location.href = ATX.component.search.url(ATX.component.search.q);
                },
                element: function ($q) {
                    return {
                        q: $q,
                        search: $q.parents('.atx-component_search'),
                        btn: $q.parents('.atx-component_search').find('.atx-component_search-ok'),
                        result: $q.parents('.atx-component_search').find('.atx-component_search-result .atx-component_search-result_list')
                    };
                },
                search: function () {
                    clearTimeout(ATX.component.search.options.timeOut);
                    ATX.component.search.options.timeOut = setTimeout(function () {
                        ATX.component.search.service();
                    }, ATX.component.search.options.milliseconds);
                },
                init: function () {
                    $this = $('.atx-component_search');

                    $this.each(function () {
                        $(this).append('<div class="atx-component_search-result"><ul class="atx-component_search-result_list"></ul></div>');

                        $(this).find('.atx-component_search-q').on('keyup', function (event) {
                            ATX.component.search.elem = $(this);
                            $elem = ATX.component.search.element(ATX.component.search.elem);
                            if (event.which == 27) { // Escapes
                                ATX.component.search.clear($elem);
                                event.preventDefault();
                            } else {
                                ATX.component.search.q = $elem.q.val();
                                ATX.component.search.options.url.submit = $elem.q.attr('data-urlSubmit');
                                ATX.component.search.options.url.service = $elem.q.attr('data-urlService');

                                if (ATX.component.search.q === '') {
                                    ATX.component.search.clear($elem);
                                    event.preventDefault();
                                } else {
                                    if (event.which == 13) { // Enter
                                        ATX.component.search.submit();
                                        event.preventDefault();
                                    } else {
                                        ATX.component.search.href($elem);
                                        ATX.component.search.search();
                                    }
                                }
                            }
                        });

                        $(this).find('.atx-component_search-ok').on('click', function (event) {
                            if ($(this).attr('href') === '') {
                                return false;
                            }
                            return true;
                        });

                    });


                    return true;
                },
                ready: function () {
                    ATX.component.search.init();
                    return true;
                }
            },
            table: {
                options: {
                    selector: {
                        header: '.atx-table_header',
                        body: '.atx-table_body',
                        row: '.atx-table_body-row',
                        open: '.open',
                        btnOpen: '.btn-open',
                        btnValidate: '.btn-validate'
                    },
                    classOpen: 'open',
                    classOpenFluid: 'open open-fluid',
                    classLoading: 'loading',
                    classAlreadyLoading: 'loaded',
                    classValidate: 'validate',
                    cron: {
                        intervals: 5000
                    }
                },
                fn: {
                    sort: function (_property) {
                        sortBy(_property);
                    },
                    openRowPlus: function ($this, $row) {
                        $row.removeClass(ATX.component.table.options.classLoading);
                        $this.parents(ATX.component.table.options.selector.body).find(ATX.component.table.options.selector.row + '.' + ATX.component.table.options.classOpen).removeClass(ATX.component.table.options.classOpen);
                        $row.addClass(ATX.component.table.options.classOpenFluid);
                    },
                    cron: function (obj) {

                        var _statuts = {

                                /**
                                 * Enveloppe fermée.
                                 */
                                'STAT_FERMEE': 1,

                                /**
                                 * Enveloppe ouverte.
                                 */
                                'STAT_OUVERTE': 2,

                                /**
                                 * Enveloppe hors délai.
                                 */
                                'STAT_HORS_DELAI': 3,

                                /**
                                 * Enveloppe complète.
                                 */
                                'STAT_COMPLETE': 4,

                                /**
                                 * Enveloppe à compléter.
                                 */
                                'STAT_A_COMPLETER': 5,

                                /**
                                 * Enveloppe hors délai.
                                 */
                                'STAT_LOT_NON_PRESENTE': 6,

                                /**
                                 * Echec ouverture.
                                 */
                                'STAT_ECHEC_OUVERTURE': 7,

                                /**
                                 * Echec ouverture.
                                 */
                                'STAT_EN_COURS_DECHIFFREMENT': 8
                            },
                            _class = {
                                'STAT_FERMEE': 'stat_close',
                                'STAT_ECHEC_OUVERTURE': 'failure',
                                'STAT_EN_COURS_DECHIFFREMENT': 'loading',
                                'STAT_OUVERTE': 'open loaded'
                            };

                        $.each(obj.data, function (index, value) {


                            // value['id'] : id offre
                            // value['statut] : statut offre

                            $('.atx-table-row[atx-id-offre=' + value['idOffre'] + ']')
                                .removeClass(_class.STAT_FERMEE + ' ' + _class.STAT_ECHEC_OUVERTURE + ' ' + _class.STAT_EN_COURS_DECHIFFREMENT + ' ' + _class.STAT_OUVERTE)
                                .addClass(_class[value['libelleStatut']]);

                            if ($.trim(value['idStatut']) === $.trim(_statuts.STAT_OUVERTE)) {
                                // _class.STAT_EN_COURS_DECHIFFREMENT
                                $('#row_body-fold_' + value['idOffre']).slideDown('slow');
                            } else {
                                $('#row_body-fold_' + value['idOffre']).slideUp('slow');
                            }

                        })
                    }
                },
                header: {
                    init: function () {
                        $('.btn-sort').each(function () {
                            var $this = $(this);
                            $this.click(function (event) {
                                event.preventDefault();
                                var _dataSort = ($this.hasClass('sort-desc')) ? '' : $this.data('table-sort');
                                ATX.component.table.fn.sort(_dataSort);
                            })
                        });
                        return true;
                    },
                    ready: function () {
                        ATX.component.table.header.init();
                        return true;
                    }
                },
                body: {
                    row: {
                        init: function () {

                            $('[atx-toggle="table-load-ajax"]').each(function () {
                                var $this = $(this),
                                    $parentRow = $this.parents(ATX.component.table.options.selector.row),
                                    _target = (typeof $this.attr('atx-table-load-ajax-target') !== typeof undefined) ? $this.attr('atx-table-load-ajax-target') : null;
                                if (_target) {
                                    $this.click(function (event) {
                                        event.preventDefault();
                                        $parentRow.addClass(ATX.component.table.options.classLoading);
                                        if (!$parentRow.hasClass(ATX.component.table.options.classAlreadyLoading)) {
                                            $.ajax({
                                                url: _target
                                            }).done(function (data) {
                                                $parentRow.find('.row-plus').html(data);
                                                $parentRow.addClass(ATX.component.table.options.classAlreadyLoading);
                                                ATX.component.table.fn.openRowPlus($this, $parentRow);
                                            });
                                        } else {
                                            ATX.component.table.fn.openRowPlus($this, $parentRow);
                                        }

                                        return false;
                                    })
                                }

                                $parentRow.find('.row-header').click(function () {
                                    $parentRow.removeClass(ATX.component.table.options.classOpenFluid);
                                })

                            });

                            // init open row body folder
                            $('.atx-table-row.open.loaded').each(function () {
                                var $this = $(this);
                                $('#row_body-fold_' + $this.attr('atx-id-offre')).slideDown('slow');
                            });

                            $('.atx-table-row .btn-open').click(function (event) {
                                event.preventDefault();
                                var $this = $(this),
                                    _href = $this.attr('href');

                                if (_href) {

                                    $.fileDownload(_href, {
                                        prepareCallback: function () {
                                            _dialogDownload = bootbox.dialog({
                                                message: '<p class="text-center"><i class="fa fa-spin fa-spinner"></i> Please wait while processing the file...</p>',
                                                closeButton: false
                                            });
                                            setTimeout(function () {
                                                _dialogDownload.modal('hide');
                                            }, 1000);
                                        },
                                        successCallback: function () {
                                            // Do something
                                            $.publish('btn:ajax:success', $this);
                                        },
                                        failCallback: function () {
                                            // Do something
                                            $.publish('btn:ajax:error', $this);
                                        }
                                    });
                                }

                                return false;


                            });


                            $('.atx-table-row .btn-validate').click(function (event) {
                                event.preventDefault();
                                var $this = $(this),
                                    _target = $this.attr('href'),
                                    _selected_offre = $this.parents('.atx-table-form').serialize();


                                $.ajax({
                                    url: _target,
                                    data: _selected_offre,
                                    success: function (data) {
                                        // Do something
                                        $.publish('btn:ajax:success', $this);
                                    },
                                    error: function () {
                                        //console.log('Error in open multiple offer');
                                        // Do something
                                        $.publish('btn:ajax:error', $this);
                                    }
                                });

                                return false;


                            });

                            $('.btn-open-multiple-offre').click(function (event) {
                                event.preventDefault();
                                var $this = $(this),
                                    _target = $this.attr('href'),
                                    _selected_offre = [];

                                $('input.select-candidate:checked').each(function () {
                                    _selected_offre.push($(this).attr('atx-id-offre'));
                                });

                                $.ajax({
                                    url: _target,
                                    data: {
                                        list: _selected_offre
                                    },
                                    success: function (data) {
                                        // Do something
                                    },
                                    error: function () {
                                        console.log('Error in open multiple offer');
                                        // Do something
                                    }
                                });

                                return false;


                            });


                            $('.btn-save-multiple-offre').click(function (event) {
                                event.preventDefault();
                                var $this = $(this),
                                    _target = $this.attr('href'),
                                    _selected_offre = $('.atx-table-offers').find('.atx-table-form').serialize();

                                console.log(_selected_offre);

                                $.ajax({
                                    url: _target,
                                    data: {
                                        form: _selected_offre
                                    },
                                    success: function (data) {
                                        // Do something
                                    },
                                    error: function () {
                                        console.log('Error in open multiple offer');
                                        // Do something
                                    }
                                });

                                return false;


                            });

                            $('.btn-open-multiple-offre').click(function (event) {
                                event.preventDefault();
                                var $this = $(this),
                                    _target = $this.attr('href'),
                                    _selected_offre = [];

                                $('input.select-candidate:checked').each(function () {
                                    _selected_offre.push($(this).attr('atx-id-offre'));
                                });

                                $.ajax({
                                    url: _target,
                                    data: {
                                        list: _selected_offre
                                    },
                                    success: function (data) {
                                        // Do something
                                    },
                                    error: function () {
                                        console.log('Error in open multiple offer');
                                        // Do something
                                    }
                                });

                                return false;


                            });

                            $('input.select-row-all').click(function () {
                                var checkedStatus = this.checked;
                                $(this).closest(".table").find('input.select-row, input.select-row-all').each(function () {
                                    $(this).prop('checked', checkedStatus);
                                });
                            });

                            $('input.select-row').click(function () {
                                var checkedStatus = this.checked;
                                if (!checkedStatus) {
                                    $(this).parents('.table').find('> .table-thead input.select-row-all').each(function () {
                                        $(this).prop('checked', checkedStatus);
                                    });
                                }
                            });

                            $('.atx-table .atx-table_options .select-candidates-all').click(function () {
                                $(this).parents('.atx-table_options').attr({
                                    'atx-select-candidates': true,
                                    'aria-selected': true
                                });
                                $(this).parents('.atx-table').find('.select-candidate').each(function () {
                                    $(this).prop('checked', true);
                                });
                                return false;
                            });

                            $('.atx-table .atx-table_options .deselected-candidates-all').click(function () {
                                $(this).parents('.atx-table_options').attr({
                                    'atx-select-candidates': false,
                                    'aria-selected': false
                                });
                                $(this).parents('.atx-table').find('.select-candidate').each(function () {
                                    $(this).prop('checked', false);
                                });
                                return false;
                            });

                            $('.atx-table .select-candidate').click(function () {
                                $(this).parents('.atx-table').find('.atx-table_options').attr({
                                    'atx-select-candidates': false,
                                    'aria-selected': false
                                });
                            });

                            $('[atx-toggle="cron"]').each(function () {
                                var $this = $(this),
                                    _target = (typeof $this.attr('atx-cron-target') !== typeof undefined) ? $this.attr('atx-cron-target') : null,
                                    _callback = (typeof $this.attr('atx-cron-callback') !== typeof undefined && $this.attr('atx-cron-callback')) ? $this.attr('atx-cron-callback') : ATX.component.table.fn.cron,
                                    _intervals = (typeof $this.attr('atx-cron-intervals') !== typeof undefined && $this.attr('atx-cron-intervals')) ? $this.attr('atx-cron-intervals') : ATX.component.table.options.cron.intervals;

                                var doSomething = function (callback, obj) {
                                    callback.call(this, obj);
                                };

                                var _cron = setInterval(function () {

                                    $.ajax({
                                        url: _target,
                                        success: function (data) {

                                            var _func = _callback;

                                            if (typeof _callback === "string") {
                                                if (typeof window[_callback] === typeof undefined) {
                                                    _func = ATX.fn.$obj(window, _callback);
                                                } else {
                                                    _func = window[_callback];
                                                }
                                            }


                                            doSomething(_func, {
                                                $this: $this,
                                                target: _target,
                                                data: data
                                            });
                                        },
                                        error: function () {

                                        }
                                    });

                                }, _intervals);


                            });


                            return true;
                        },
                        ready: function () {
                            ATX.component.table.body.row.init();
                            return true;
                        }
                    },
                    init: function () {
                        ATX.component.table.body.row.ready();
                    },
                    ready: function () {
                        ATX.component.table.body.init();
                        return true;
                    }
                },
                init: function () {
                    ATX.component.table.header.ready();
                    ATX.component.table.body.ready();
                    return true;
                },
                ready: function () {
                    ATX.component.table.init();
                    return true;
                }
            },
            loader: {
                options: {
                    selector: 'atx-loader-backdrop'
                },
                show: function () {
                    $('body').append($('<div/>', {
                        id: ATX.component.loader.options.selector,
                        class: ATX.component.loader.options.selector
                    }));
                },
                hide: function () {
                    $('body').find('#' + ATX.component.loader.options.selector).remove();
                }
            },
            toggle: {
                fn: {
                    hyperlink: {
                        init: function () {
                            $('[atx-toggle="hyperlink"]').each(function () {
                                var $this = $(this);
                                if (typeof $this.attr('atx-hyperlink-target') !== typeof undefined && $this.attr('atx-hyperlink-target') !== '') {
                                    $this.click(function (event) {
                                        event.preventDefault();
                                        document.location.href = $this.attr('atx-hyperlink-target');
                                        return false;
                                    })
                                }

                            });
                        }
                    }
                },
                init: function () {
                    ATX.component.toggle.fn.hyperlink.init();
                    return true;
                },
                ready: function () {
                    ATX.component.toggle.init();
                    return true;
                }
            },
            form: {
                fn: {
                    btnGroupStatus: {
                        options: {

                            done: {
                                selector: '.status-done',
                                class_: 'status-done',
                                status: 'done'
                            },
                            resolved: {
                                selector: '.status-resolved',
                                class_: 'status-resolved',
                                status: 'resolved'
                            },
                            failed: {
                                selector: '.status-failed',
                                class_: 'status-failed',
                                status: 'failed'
                            },
                            progress: {
                                selector: '.status-progress',
                                class_: 'status-progress',
                                status: 'progress'
                            },
                            active: {
                                selector: '.active',
                                class_: 'active'
                            },
                            disabled: {
                                selector: '.disabled',
                                class_: 'disabled'
                            },
                            focus: {
                                selector: '.focus',
                                class_: 'focus'
                            },

                            validate: {
                                selector: '.atx-table-row',
                                class_: 'validate'
                            },
                            btnUpdateAll: {
                                selector: '.btn-update-all',
                                class_: 'btn-update-all'
                            }


                        },
                        /**
                         *
                         * @param $btn_group
                         * @param $this_btn
                         * @returns {string current_status}
                         */
                        toggle: function ($btn_group, $this_btn) {
                            if (!$this_btn.hasClass(ATX.component.form.fn.btnGroupStatus.options.active.class_)) {
                                $btn_group.find('.btn').removeClass(ATX.component.form.fn.btnGroupStatus.options.active.class_ + ' ' + ATX.component.form.fn.btnGroupStatus.options.focus.class_);
                                $this_btn.addClass(ATX.component.form.fn.btnGroupStatus.options.active.class_);
                            }
                            return ATX.component.form.fn.btnGroupStatus.setStatus($btn_group);
                        },
                        disable: function ($btn) {
                            // if is not active
                            if (!$btn.hasClass(ATX.component.form.fn.btnGroupStatus.options.active.class_)) {
                                $btn.addClass(ATX.component.form.fn.btnGroupStatus.options.disabled.class_).find('input[type=radio]').prop("disabled", true);
                            }

                        },
                        enabled: function ($btn) {
                            $btn.removeClass(ATX.component.form.fn.btnGroupStatus.options.disabled.class_).prop("disabled", false);
                        },
                        /**
                         *
                         * @param $btn_group
                         * @returns {string current_status}
                         */
                        setStatus: function ($btn_group) {
                            var current_status = ATX.component.form.fn.btnGroupStatus.getStatus($btn_group);
                            $btn_group.attr('atx-status', current_status);
                            return current_status.toLowerCase();
                        },
                        /**
                         *
                         * @param $btn_group
                         * @returns {string current_status}
                         */
                        getStatus: function ($btn_group) {
                            var current_status = $btn_group.find('.btn.active').attr('atx-update-status');
                            current_status = (current_status) ? current_status : ATX.component.form.fn.btnGroupStatus.options.progress.status;
                            return current_status.toLowerCase();
                        },
                        getCategory: function ($this_btn) {
                            var current_category = ($this_btn.parents('.btn-group-status').hasClass('option_progress')) ? 'option_progress' : 'option_eligibility';
                            return {
                                class_: current_category,
                                selector: ' .' + current_category + ' '
                            };
                        },
                        getPosition: function ($this_btn) {
                            if ($this_btn) {
                                var $parent_row = $this_btn.parents('.atx-row_pli'),
                                    $parent_body = $this_btn.parents('.atx-row_pli-body').find(' > .atx-row_pli');

                                return $parent_body.index($parent_row);
                            }
                            return -1;
                        },
                        updateStatus: function ($btn_group, $this_btn) {

                            var status = ($this_btn) ? ATX.component.form.fn.btnGroupStatus.toggle($btn_group, $this_btn) : ATX.component.form.fn.btnGroupStatus.setStatus($btn_group);

                            // init show/hide
                            if (status !== ATX.component.form.fn.btnGroupStatus.options.progress.status) {
                                if (status === ATX.component.form.fn.btnGroupStatus.options.failed.status) {
                                    $btn_group.parents('.atx-js-row_pli-body-row').find('.atx-js-row_pli-body-row_date').removeClass('hide').addClass('show');

                                    // if status progress failed
                                    // then disabled btn-success in col-eligibility
                                    if ($btn_group.hasClass('option_progress')) {
                                        $btn_group.parents('.atx-row_pli-body-row').find('.atx-js-row_pli-col.col-eligibility .btn-group-status .btn-success').each(function () {
                                            ATX.component.form.fn.btnGroupStatus.disable($(this));
                                        });
                                    }
                                } else {
                                    if ($btn_group.hasClass('option_progress')) {
                                        $btn_group.parents('.atx-row_pli-body-row').find('.atx-js-row_pli-col.col-eligibility .btn-group-status .btn-success').each(function () {
                                            ATX.component.form.fn.btnGroupStatus.enabled($(this));
                                        });
                                    }
                                }
                                if ($this_btn) {

                                    var current_category = ATX.component.form.fn.btnGroupStatus.getCategory($this_btn);

                                    console.log(current_category);

                                    var current_position = ATX.component.form.fn.btnGroupStatus.getPosition($this_btn),
                                        current_category = ATX.component.form.fn.btnGroupStatus.getCategory($this_btn),
                                        $current_header_lot = $this_btn.parents('.atx-table-row.loaded').find('.atx-table_header .atx-list_pli-status .atx-lot_status:eq(' + current_position + ')');

                                    console.log(status);

                                    $current_header_lot.attr('atx-status', '');
                                    $current_header_lot.find(current_category.selector + ' .btn').removeClass('active');
                                    $current_header_lot.find(current_category.selector + '[atx-update-status=' + status + ']').addClass('active');

                                }

                            }

                            if ($this_btn && $this_btn.hasClass(ATX.component.form.fn.btnGroupStatus.options.btnUpdateAll.class_)) {
                                var current_status = $this_btn.attr('atx-update-status'),
                                    current_category = ATX.component.form.fn.btnGroupStatus.getCategory($this_btn);

                                $this_btn
                                    .parents('.atx-list_pli-analysis').find('.atx-row_pli-body ' + current_category.selector + ' .btn[atx-update-status=' + current_status + ']')
                                    .trigger('click')
                            }

                        },
                        init: function () {

                            $('.panel-analysis .btn-group-status').each(function () {
                                var $this = $(this),
                                    $btn = {
                                        done: $this.find(ATX.component.form.fn.btnGroupStatus.options.done.selector),
                                        resolved: $this.find(ATX.component.form.fn.btnGroupStatus.options.resolved.selector),
                                        failed: $this.find(ATX.component.form.fn.btnGroupStatus.options.failed.selector)
                                    },
                                    btnActive = $this.find(ATX.component.form.fn.btnGroupStatus.options.active.selector),
                                    currentStatus = $.trim($this.attr('atx-status').toLowerCase()),
                                    $parentTableRow = $this.parents(ATX.component.form.fn.btnGroupStatus.options.validate.selector),
                                    validate = $parentTableRow.hasClass(ATX.component.form.fn.btnGroupStatus.options.validate.class_);

                                var obj = {
                                    $this: $this,
                                    $btn: $btn,
                                    btnActive: btnActive,
                                    currentStatus: currentStatus,
                                    $parentTableRow: $parentTableRow,
                                    validate: validate
                                };

                                // init default status
                                if (!currentStatus) {
                                    // Init attr atx-status to progress
                                    ATX.component.form.fn.btnGroupStatus.updateStatus($this);
                                }


                                $this.find('.btn').on('click', function (event) {

                                    var $this_btn = $(this);

                                    // if btn not disabled
                                    if (!$this_btn.hasClass(ATX.component.form.fn.btnGroupStatus.options.disabled.class_)) {

                                        // Update Status
                                        ATX.component.form.fn.btnGroupStatus.updateStatus($this, $this_btn);

                                    } else {
                                        event.stopPropagation();
                                    }
                                });


                            });
                        }
                    }
                },
                init: function () {
                    ATX.component.form.fn.btnGroupStatus.init();
                    return true;
                },
                ready: function () {
                    ATX.component.form.init();
                    return true;
                }
            },
            download: {
                options: {
                    selector: {
                        fileDownload: '[atx-toggle="fileDownload"]'
                    }
                },
                fn: {
                    fileDownload: function () {

                        $(ATX.component.download.options.selector.fileDownload).click(function () {

                            var $this = $(this),
                                _dialogDownload = null,
                                _href = (typeof $this.attr('href') !== typeof undefined) ?
                                    $this.attr('href') :
                                    (typeof $this.attr('atx-file_download-href') !== typeof undefined) ? $this.attr('atx-file_download-href') : null;

                            if (_href) {

                                $.fileDownload(_href, {
                                    data: $this.closest('form').serialize(),
                                    prepareCallback: function () {
                                        _dialogDownload = bootbox.dialog({
                                            message: '<p class="text-center"><i class="fa fa-spin fa-spinner"></i> Please wait while processing the file...</p>',
                                            closeButton: false
                                        });
                                        setTimeout(function () {
                                            _dialogDownload.modal('hide');
                                        }, 1000);
                                    }
                                })
                            }

                            return false;

                        });


                        return false;
                    }
                },
                init: function () {
                    ATX.component.download.fn.fileDownload();
                    return true;
                },
                ready: function () {
                    ATX.component.download.init();
                    return true;
                }
            }
        },
        document: {
            oldJs: function () {
                if (typeof(Draggable) !== 'undefined') {
                    new Draggable('containerBlocNotes', {revert: false, ghosting: false});
                }
                autoPositionLayerBlocNotes();
            },
            timeago: {
                settings: function () {
                    jQuery.timeago.settings.strings = {
                        // environ ~= about, it's optional
                        prefixAgo: "il y a",
                        prefixFromNow: "d'ici",
                        seconds: "moins d'une minute",
                        minute: "environ une minute",
                        minutes: "environ %d minutes",
                        hour: "environ une heure",
                        hours: "environ %d heures",
                        day: "environ un jour",
                        days: "environ %d jours",
                        month: "environ un mois",
                        months: "environ %d mois",
                        year: "un an",
                        years: "%d ans"
                    };
                }
            },
            init: function () {

                $('.btn-ajax').click(function () {
                    $(this).addClass("onload");
                });


                $.subscribe('btn:ajax:success', function (event, $element) {
                    console.log('success => ', $element);
                    $($element).addClass('success').removeClass('onload');
                    setTimeout(function () {
                        $($element).removeClass("success");
                    }, 1000);
                });


                $.subscribe('btn:ajax:error', function (event, $element) {
                    console.log('error => ', $element);
                    $($element).addClass('error').removeClass('onload');
                    setTimeout(function () {
                        $($element).removeClass("error");
                    }, 1000);
                });




                ATX.document.oldJs();
                ATX.document.timeago.settings();
                ATX.bootstrap.ready();
                ATX.header.ready();
                ATX.footer.ready();
                ATX.component.panel.ready();
                ATX.component.search.ready();
                ATX.component.table.ready();
                ATX.component.toggle.ready();
                ATX.component.form.ready();
                ATX.component.download.ready();

                return true;
            },
            ready: function () {
                $(document).ready(function () {
                    ATX.fn.$prototypeNoConflict();
                    ATX.document.init();
                });
                return true;
            }
        },
        fn: {
            $id: function (_id) {
                return $('#' + _id);
            },
            $class: function (_class) {
                return $('.' + _class);
            },
            $obj: function (o, s) {
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
            $prototypeNoConflict: function () {
                if (typeof(Prototype) !== 'undefined') {
                    if (Prototype.BrowserFeatures.ElementExtensions) {
                        var disablePrototypeJS = function (method, pluginsToDisable) {
                                var handler = function (event) {
                                    event.target[method] = undefined;
                                    setTimeout(function () {
                                        delete event.target[method];
                                    }, 0);
                                };
                                pluginsToDisable.each(function (plugin) {
                                    jQuery(window).on(method + '.bs.' + plugin, handler);
                                });
                            },
                            pluginsToDisable = ['collapse', 'dropdown', 'modal', 'tooltip', 'popover'];
                        disablePrototypeJS('show', pluginsToDisable);
                        disablePrototypeJS('hide', pluginsToDisable);
                    }
                }

            }
        }
    };

    ATX.document.ready();
})(jQuery);