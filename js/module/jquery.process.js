+function ($) {

    var Process = function (element, options) {

        var _default = {

            max: 100,

            type: '1',

            active: 1


        };

        this.$default = $(element);

        this.complete = 0;

        var _def = {};

        if (options.active) {

            _def.max = _def.value = _default.max

        }

        this.options = $.extend({}, _default, _def, options);

        _createElement.call(this);

        _event.call(this)

    };

    //创建元素
    function _createElement() {

        this.$element = $('<div class="process" data-context="">');

        this.$default.addClass('process-bar').before(this.$element);

        this.$element.append(this.$default);

        var _element = this.options.element || 'body';

        if ($('body').has(this.$default).size() == 0) {

            $(_element).append(this.$element)

        }

        if (this.options.active == 1) {

            this.$default.css('width', '100%')

        }

        if (this.options.type == 1) {

            this.$element.after('<div class="process-bg">').wrap('<div class="process-pop">')


        }

    }

    //创建私有事件
    function _event() {

        var $this = this;

        this.$element.on('context', function (e, context) {

            $(e.delegateTarget).attr('data-context', context)

        }).on('open', function () {

            $('.process-bg').show();

            $this.$element.parent('.process-pop').show()

        })
            .on('end', function () {

                setTimeout(function () {

                    $this.$element.parent('.process-pop').hide().siblings('.process-bg').hide()

                }, 1000);


            });

    }

    //value 方法
    Process.prototype.value = function (value) {

        var _value = value | this.options.value;

        this.complete = _value / this.options.max;

        this.complete = this.complete > 1 ? 1 : this.complete;

        if (this.complete == 0) {

            this.$default.css('width', 0);

            this.$default.trigger('start')

        }

        if (this.complete <= 1) {

            this.$default.css('width', this.complete * 100 + '%');

            this.$default.text((this.complete * 100).toFixed(2) + '%');

            this.$default.trigger('process', [value, this.options.max, this.complete * 100])

        }

        if (this.complete >= 1) {

            this.$element.addClass('process-active');

            this.$default.css('width', '100%');

            if (this.options.active != 1) {

                this.$default.trigger('end')

            }


        }

    };

    Process.prototype.show = function () {

        this.$element.parent('.process-pop').addClass('on')

        this.$element.parent('.process-pop').next('.process-bg').addClass('on')


    };

    Process.prototype.hide = function () {

        this.$element.parent('.process-pop').removeClass('on');

        this.$element.parent('.process-pop').next('.process-bg').removeClass('on')


    };


    function Plugin(option) {

        var args = Array.prototype.slice.call(arguments, 1);

        return this.each(function () {

            var $this = $(this);

            var data = $this.data('by.process');

            var options = typeof option == 'object' && option;

            if (!data) {

                $this.data('by.process', (data = new Process(this, options)))

            }

            if (typeof option == 'string') {

                data[option].apply(data, args)

            } else if ($.isPlainObject(options)) {

                $.extend(data.options, options)

            }

            return data;

        })

    }

    var old = $.fn.process;

    $.fn.process = Plugin;

    $.fn.process.Constructor = Process;

    $.fn.process.noConflict = function () {

        $.fn.process = old;

        return this

    }

}(jQuery);

