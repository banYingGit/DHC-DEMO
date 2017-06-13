+function ($) {

    var PageZoom = function (element, options) {

        var _default = {};

        this.$element = $(element);

        this.options = $.extend({}, _default, options);

        _event.call(this)

    };

    function _event() {

        var bodySize = this.options.zoom;

        $('body').on('zoom', function (e, iframe, val) {


            $('body').css({

                'transform': 'scale(' + bodySize + ',' + bodySize + ')',

                'moz-transform': 'scale(' + bodySize + ',' + bodySize + ')',

                '-webkit-transform': 'scale(' + bodySize + ',' + bodySize + ')',

                '-o-transform': 'scale(' + bodySize + ',' + bodySize + ')'
            });

            $(iframe).find("body").css({

                'transform': 'scale(' + val + ',' + val + ')',

                'moz-transform': 'scale(' + val + ',' + val + ')',

                '-webkit-transform': 'scale(' + val + ',' + val + ')',

                '-o-transform': 'scale(' + val + ',' + val + ')'
            });


        })


    }


    function Plugin(option) {

        var args = Array.prototype.slice.call(arguments, 1);

        return this.each(function () {

            var $this = $(this);

            var data = $this.data('by.pageZoom');

            var options = typeof option == 'object' && option;

            if (!data) {

                $this.data('by.pageZoom', (data = new PageZoom(this, options)))

            }

            if (typeof option == 'string') {

                data[option].apply(data, args)

            }

            return data;

        })

    }

    var old = $.fn.pageZoom;

    $.fn.pageZoom = Plugin;

    $.fn.pageZoom.Constructor = PageZoom;

    $.fn.pageZoom.noConflict = function () {

        $.fn.pageZoom = old;

        return this

    }

}
(jQuery);