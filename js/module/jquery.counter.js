+function ($) {

    var Counter = function (element, options) {

        var _default = {

            //0为水平 num-horizontal  1为垂直 num-vertical
            type: 0,

            min: 1

        };

        this.$element = $(element);

        this.options = $.extend({}, _default, options);

        _createElement.call(this);

        _event.call(this);

        _btnDisable.call(this);

        _disable.call(this)

    };

    function _createElement() {

        if (!this.$element.is(':has(input)')) {

            this.$element.addClass('num');

            var box = $('<input name="" type="text" class="num-input" value="' + this.options.min + '">'),

                addBtn = $('<input type="button" class="num-add" value="+">'),

                reduceBtn = $('<input type="button" class="num-reduce" value="-">');

            this.$element.append(box).append(addBtn).append(reduceBtn);

        }

        if (this.options.type == 0) this.$element.addClass('num-horizontal').removeClass('num-vertical');

        if (this.options.type == 1) this.$element.addClass('num-vertical').removeClass('num-horizontal');

        if (this.options.size == 'sm') this.$element.addClass('num-sm');


        if (!$('.num-input', this.$element).val()) {

            $('.num-input', this.$element).val(this.options.min)

        }

    }

    function _event() {

        var $this = this,

            boxVal = 0;

        this.$element.on('change', '.num-input', function () {

            _val.call($this);

            _btnDisable.call($this);

        })
            .on('click', '.num-reduce', function () {

                boxVal = parseInt($('.num-input', $this.$element).val());

                var _boxVal = (boxVal > $this.options.min) ? boxVal - 1 : $this.options.min;

                $('.num-input', $this.$element).val(_boxVal);

                $this.$element.trigger('getValue', _boxVal);

                _btnDisable.call($this);

            })
            .on('click', '.num-add', function () {

                boxVal = parseInt($('.num-input', $this.$element).val());

                var _boxVal = (boxVal < $this.options.max) ? boxVal + 1 : $this.options.max;

                $('.num-input', $this.$element).val(_boxVal);

                _btnDisable.call($this);

                $this.$element.trigger('getValue', _boxVal);

            })
        ;


    }

    //手动设置 box 值
    function _val() {

        var boxVal = parseInt($('.num-input', this.$element).val()) || this.options.min;

        boxVal = (boxVal >= this.options.min) && (boxVal <= this.options.max) ? boxVal : this.options.max;

        $('.num-input', this.$element).val(boxVal);

        _btnDisable.call(this);

        this.$element.trigger('getValue', boxVal);


    }

    //设置加减不可点击
    function _btnDisable() {

        var boxVal = parseInt($('.num-input', this.$element).val());

        if (boxVal >= this.options.max) {

            $('.num-add', this.$element).attr("disabled", "disabled");

        } else {

            $('.num-add', this.$element).removeAttr("disabled")
        }

        if (boxVal <= this.options.min) {

            $('.num-reduce', this.$element).attr("disabled", "disabled");


        } else {

            $('.num-reduce', this.$element).removeAttr("disabled")
        }

    }

    //设置数字框整体不可操作
    function _disable() {

        if (this.$element.attr('data-state') == 'disabled') {

            $('input', this.$element).attr("disabled", "disabled");

            var boxValue = parseInt($('input', this.$element).val());

        }
    }

    //公开设置 box 值
    Counter.prototype.setVal = function (value) {

        value = (value >= this.options.min) && (value <= this.options.max) ? value : this.options.min;

        var _value = value || 0;


        if (this.$element.attr('data-state') == 'disabled') {

            var boxValue = parseInt($('input', this.$element).val());

            _value = boxValue

        } else {

            $('.num-input', this.$element).val(_value);

            this.$element.trigger('getValue', _value);

            _btnDisable.call(this);
        }

    };


    //将数量盒子改变为可操作
    Counter.prototype.operation=function(){

        this.$element.removeAttr('data-state');

        $('input',this.$element).removeAttr('disabled');

        _btnDisable.call(this);
    };


    function Plugin(option) {

        var args = Array.prototype.slice.call(arguments, 1);

        return this.each(function () {

            var $this = $(this);

            var data = $this.data('by.counter');

            var options = typeof option == 'object' && option;

            if (!data) {

                $this.data('by.counter', (data = new Counter(this, options)))

            }

            if (typeof option == 'string') {

                data[option].apply(data, args)

            }

            return data;

        })

    }

    var old = $.fn.counter;

    $.fn.counter = Plugin;

    $.fn.counter.Constructor = Counter;

    $.fn.counter.noConflict = function () {

        $.fn.counter = old;

        return this

    }

}(jQuery);