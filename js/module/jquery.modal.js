+function ($) {

    var Modal = function (element, options) {

        var _default = {

            large: true
        };

        this.$element = $(element);

        this.options = $.extend({}, _default, options);

        _createElement.call(this);

        _event.call(this);

    };

    function _createElement() {

        this.$element.addClass('modal').attr({'data-role': 'modal'});

        var _data = this.$element.html(),

            _title = $('<h2  class="modal-title"><a href="javascript:void(0)" data-role="close">X</a><span data-role="title"></span></h2>'),

            _body = $('<div class="modal-body">').append(_data),

            _button = $('<div class="modal-btn" data-role="button">');

        this.$element.empty().append(_title).append(_body).append(_button);


        if ($('body').has(this.$element).size() == 0) {

            $('body').append(this.$element);

        }

        if (this.options.large == true) {

            this.$element.addClass('modal-lg');

        }

    }

    function _event() {

        var $this = this;

        this.$element.on('click', '[data-role=close]', function () {

            $this.hide()

        });

        $this.title()

    }


    Modal.prototype.load = function (url, params, fn) {

        var $this = this,

            _url,

            _params,

            _fn;

        if (typeof url == 'string') {

            _url = url

        } else if ($.isPlainObject(url)) {

            _url = $this.options.url;

            _params = url

        } else if ($.isFunction(url)) {

            _url = $this.options.url;

            _params = $this.options.params;

            _fn = url

        }

        if ($.isPlainObject(params)) {

            _params = params

        } else if ($.isFunction(params)) {

            _params = $this.options.params;

            _fn = params
        }

        if (!_url) {

            return false

        }

        this.$element.trigger('load');

        $('.modal-body', $this.$default).append('正在加载。。。').load(_url, _params, function (data) {

            $this.$element.trigger('done', [data]);

            _fn && _fn.call(this, data)

        })


    };


    Modal.prototype.title = function (title) {

        var _title = title || this.options.title || '';

        _title && $('[data-role=title]', this.$element).text(_title)

    };


    Modal.prototype.body = function (body) {

        var _body = body || '';

        _body && $(this.$element).empty().append(_body)

    };


    Modal.prototype.clear = function () {

        this.$element.empty();

    };


    Modal.prototype.button = function (button) {

        var $this = this;

        $('[data-role=button]', $this.$element).empty();

        $.each(button || [], function () {

            $('[data-role=button]', $this.$element).append(this)

        })

    };


    Modal.prototype.show = function () {

        this.$element.trigger('show');

        var $this = this;

        var background = $('<div class="modal-background">');

        $('body').addClass('body-hidden');

        this.$element.after(background);

        var bodyValue = $.trim($this.$element.html()).length;


        if (this.options.url && bodyValue == 0) {

            //  $this.$default.load($this.options.url , $this.options.params || params || {})

            $this.$element.load($this.options.url)

        }

        this.$element.addClass(function () {

            setTimeout($.proxy(function () {

                this.trigger('shown');

            }, $this.$element), 500);


            return 'modal-show';

        });


    };


    Modal.prototype.hide = function () {

        this.$element.trigger('hide');

        $('body').removeClass('body-hidden');

        var $this = this;

        this.$element.removeClass(function () {

            setTimeout($.proxy(function () {

                $this.$element.trigger('hidden');

                $('.modal-background').remove();

            }, $this.$element), 500);

            return 'modal-show'

        })


    };

    function Plugin(option) {

        var args = Array.prototype.slice.call(arguments, 1);

        return this.each(function () {

            var $this = $(this);

            var data = $this.data('by.modal');

            var options = typeof option == 'object' && option;

            if (!data) {

                $this.data('by.modal', (data = new Modal(this, options)))

            }

            if (typeof option == 'string') {

                data[option].apply(data, args)


            }

            return data;

        })

    }

    var old = $.fn.modal;

    $.fn.modal = Plugin;

    $.fn.modal.Constructor = Modal;

    $.fn.modal.noConflict = function () {

        $.fn.modal = old;

        return this

    }

}(jQuery);