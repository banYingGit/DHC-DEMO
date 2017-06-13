+function ($) {

    var Tab = function (element, options) {

        var _default = {

            //设置外观样式， card为全边框卡片样式，  card-text为头部边框，底部显示内容无边框， text为纯文字底边线样式， 默认为card。
            type: 'card-text',

            line: 0,

            close: 1

        };

        this.$element = $(element);

        this.options = $.extend({}, _default, options);

        _createElement.call(this);

        _event.call(this);

    };

    function _createElement() {

        if (!this.$element.hasClass('tab')) {

            this.$element.addClass('tab');

            var tabTitle = $('<ul class="tab-title">'),

                tabBody = $('<ul class="tab-body">');

            this.$element.append(tabTitle).append(tabBody);

            if (this.options.line == 1) {

                this.$element.addClass('tab-line')

            }


            switch (this.options.type) {

                case 'card':
                {

                    this.$element.addClass('tab-card');
                    return
                }
                case 'card-text':
                {

                    this.$element.addClass('tab-card-text');
                    return

                }

                case 'text':
                {

                    this.$element.addClass('tab-text');
                    return
                }

            }
        }

    }

    function _event() {

        var $this = this;

        this.$element.on('click', '.tab-title > li', function (e) {

            var _index = $(this).index(),

                elmId = $(this).data('data-id');


            $(this).addClass('on').siblings('li').removeClass('on');

            $('.tab-body > li:eq(' + _index + ')', $this.$element).addClass('on').siblings('li').removeClass('on');

            $(document).find('[data-role="tab"]').parent('li').removeClass('on');

            $(document).find('[data-id=' + elmId + ']').parent('li').addClass('on')

        })

            .on('click', '.tab-title > li > span > i', function (e) {

                e.stopPropagation();

                var _ele = $(e.target).parent('span').parent('li'),

                    _n = _ele.index(),

                    _eleId = _ele.data('data-id'),

                    isOn = _ele.hasClass('on') ? 1 : 0,

                    liLength = $('.tab-title > li', $this.$element).length;


                if (liLength > 1) {


                    $('[data-id=' + _eleId + ']').removeData('data-id').removeAttr('data-id');


                    _close.call($this, _n, isOn)

                }


            });


        //to do $(document).on('click', '[data-role=tab]', function (e) {}) 会导致内存泄漏
        $(document).on('click', '[data-role=tab]', function (e) {

            var _tab = $(this),

                data = {

                    dataTabTitle: _tab.attr('data-name'),

                    dataTabUrl: _tab.attr('data-url'),

                    //添加到的目标元素
                    dataTab: _tab.attr('data-tab')
                };


            if ($this.$element.is(_tab.attr('data-target'))) {


            } else {

                return false;
            }

            if (!_tab.data('data-id')) {

                $this.addTab(data, function (id) {

                    _tab.data('data-id', id).attr('data-id', id);

                })
            }

            else {

                var _dataId = _tab.data('data-id');

                $('.tab-title > li[data-id=' + _dataId + ']', $this.$element).trigger('click')


            }


        });


    }

    function _close(n, isOn) {

        if (isOn == 1) {

            var elm,

                elmId;

            if (n == 0) {

                elm = $('.tab-title > li', this.$element).eq(n + 1);

                elmId = elm.data('data-id');


                elm.addClass('on');

                $('.tab-body > li', this.$element).eq(n + 1).addClass('on');


            } else {

                elm = $('.tab-title > li', this.$element).eq(n - 1);

                elmId = elm.data('data-id');

                elm.addClass('on');

                $('.tab-body > li', this.$element).eq(n - 1).addClass('on');
            }

            $(document).find('[data-role="tab"]').parent('li').removeClass('on');

            $(document).find('[data-id=' + elmId + ']').parent('li').addClass('on')

        }


        $('.tab-title > li', this.$element).eq(n).remove();

        $('.tab-body > li', this.$element).eq(n).remove();


    }

    Tab.prototype.addTab = function (data, fn) {

        var $this = this;

        $('.tab-title > li', this.$element).removeClass('on');

        $('.tab-body > li', this.$element).removeClass('on');

        var _liTitle = $('<li class="on">'),

            _liBody = $('<li class="on">'),

            _span = $('<span>');


        function S4() {

            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }

        var dataId = (S4() + S4());


        if (this.options.close == 1) {

            _span.text(data.dataTabTitle).append('<i>X</i>');

            _close.call(this);

        }

        else {

            _span.html(data.dataTabTitle);

        }

        if ($('.tab-title li', this.$element).length == 0) {

            $(_liTitle).addClass('on');

            $(_liBody).addClass('on');

        }


        _liTitle.append(_span).data('data-id', dataId).attr('data-id', dataId);

        $('.tab-title', this.$element).append(_liTitle);

        $.get(data.dataTabUrl, function (data) {

            _liBody.append(data)

        }).done(function () {

            $this.$element.trigger('got')


        });

        $('.tab-body', this.$element).append(_liBody);

        fn && fn.call(this, dataId)

    };

    Tab.prototype.setTabOn = function (dataOn) {

        $(dataOn).trigger('click')


    };


    function Plugin(option) {

        var args = Array.prototype.slice.call(arguments, 1);

        return this.each(function () {

            var $this = $(this);

            var data = $this.data('by.tab');

            var options = typeof option == 'object' && option;

            if (!data) {

                $this.data('by.tab', (data = new Tab(this, options)))

            }

            if (typeof option == 'string') {

                data[option].apply(data, args)

            }

            return data;

        })

    }

    var old = $.fn.tab;

    $.fn.tab = Plugin;

    $.fn.tab.Constructor = Tab;

    $.fn.tab.noConflict = function () {

        $.fn.tab = old;

        return this

    }

}(jQuery);