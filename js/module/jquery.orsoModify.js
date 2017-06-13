+function ($) {

    var OrsoModify = function (element, options) {

        var _default = {};

        this.$element = $(element);

        this.options = $.extend({}, _default, options);

        _rendering.call(this);

        //_event.call(this)


    };

    function _rendering() {

        var $this = this,

            _btn = $('<P class="orso-li-btn" data-role="btn"><i data-role="editor" title="±à¼­">±à¼­</i><i data-role="del" title="É¾³ý">É¾³ý</i></P>');

        this.$element.orsoElect({

            leftTitle: this.options.leftTitle,

            rightTitle: this.options.rightTitle,

            url: this.options.url
        });

        $('.orso-left .orso-content ul li', this.$element).each(function () {

            console.log('------')


            $(this).addClass('_btn')


        })


    }


    function Plugin(option) {

        var args = Array.prototype.slice.call(arguments, 1);

        return this.each(function () {

            var $this = $(this);

            var data = $this.data('by.orsoModify');

            var options = typeof option == 'object' && option;

            if (!data) {

                $this.data('by.orsoModify', (data = new OrsoModify(this, options)))

            }

            if (typeof option == 'string') {

                data[option].apply(data, args)

            }

            return data;

        })

    }

    var old = $.fn.orsoModify;

    $.fn.orsoModify = Plugin;

    $.fn.orsoModify.Constructor = OrsoModify;

    $.fn.orsoModify.noConflict = function () {

        $.fn.orsoModify = old;

        return this

    }

}
(jQuery);