+function ($) {

    var TabContent = function (element, options) {

        var _default = {};

        this.$element = $(element);

        this.options = $.extend({}, _default, options);

        this.process = $('<div>').process();

        _event.call(this)

    };

    function _event() {

        var $this = this;

        this.$element.dataTable({

            informationTable: this.options.informationTable,

            url: this.options.url,

            modalElm: $('<div>').modal(),

            mesageElm: $('<div>').message(),

            processElm: this.process,

            btns: this.options.btns


        }).dataTable('loadData');


    }


    function Plugin(option) {

        var args = Array.prototype.slice.call(arguments, 1);

        return this.each(function () {

            var $this = $(this);

            var data = $this.data('by.tabContent');

            var options = typeof option == 'object' && option;

            if (!data) {

                $this.data('by.tabContent', (data = new TabContent(this, options)))

            }

            if (typeof option == 'string') {

                data[option].apply(data, args)

            }

            return data;

        })

    }

    var old = $.fn.tabContent;

    $.fn.tabContent = Plugin;

    $.fn.tabContent.Constructor = TabContent;

    $.fn.tabContent.noConflict = function () {

        $.fn.tabContent = old;

        return this

    }

}(jQuery);