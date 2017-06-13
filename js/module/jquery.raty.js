+function ($) {

    var Raty = function (element, options) {

        this.$element = $(element);

        var _default = {

            elmId: this.$element.attr('id'),

            number: 5,

            hints: ['失望', '很差', '一般', '满意', '惊喜'],

            score: 0,

            disabled: false

        };


        this.options = $.extend({}, _default, options);

        this.$score = this.options.score >= this.options.number ? this.options.number : this.options.score;

        this.$score = this.options.score < 0 ? 0 : this.$score;


        _createElement.call(this);

        if (this.options.disabled != true) {

            _event.call(this);

        } else {

            this.$element.addClass('disabled')

        }


    };

    function _createElement() {

        this.$element.addClass('raty');

        for (var i = 1; i <= this.options.number; i++) {

            this.$element.append("<span>★</span>")

        }


        this.options.hints ? this.$element.append("<p>") : '';

        this.$element.data({'even': 1});

        if (this.$score > 0) {

            $('>span', this.$element).eq(this.$score - 1).addClass('on').prevAll('span').addClass('on')

            _text.call(this, this.$score - 1);

            this.$element.data({'even': 0, 'onIndex': this.$score - 1})


        }


    }

    function _event() {

        var $this = this;

        this.$element.on('mouseenter ', '>span', function (e) {

            var _index = $(e.currentTarget).index();

            if ($this.$element.data('even') != 0) {

                $this.$element.data({'even': 1})

            }


            _change.call($this, _index);

            _text.call($this, _index)

        })
            .on('mouseleave  ', '>span', function (e) {

                if ($this.$element.data('even') == 0) {

                    var _index = $this.$element.data('onIndex')

                    _change.call($this, _index);

                    _text.call($this, _index);


                }

                if ($this.$element.data('even') == 1) {

                    $('>span', $this.$element).removeClass('on')

                    $('>p', $this.$element).hide()

                }

            })
            .on('click', '>span', function (e) {

                var _index = $(e.currentTarget).index();

                $this.$element.data({'even': 0, 'onIndex': _index})

                _change.call($this, _index);

                var data = {

                    ratyId: $this.options.elmId,

                    result: _index + 1

                }

                $this.$element.trigger('save', data);


            })


    }

    function _change(i) {

        $('span', this.$element).removeClass('on')

        $('span', this.$element).eq(i).addClass('on').prevAll('span').addClass('on');


    }

    function _text(i) {

        i = i + 1

        $('p', this.$element).css('display', 'block').text(i + '分： ' + this.options.hints[i - 1])


    }


    function Plugin(option) {

        var args = Array.prototype.slice.call(arguments, 1);

        return this.each(function () {

            var $this = $(this);

            var data = $this.data('by.raty');

            var options = typeof option == 'object' && option;

            if (!data) {

                $this.data('by.raty', (data = new Raty(this, options)))

            }

            if (typeof option == 'string') {

                data[option].apply(data, args)

            }

            return data;

        })

    }

    var old = $.fn.raty;

    $.fn.raty = Plugin;

    $.fn.raty.Constructor = Raty;

    $.fn.raty.noConflict = function () {

        $.fn.raty = old;

        return this

    }

}
(jQuery);