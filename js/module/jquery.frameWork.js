+function ($) {

    var FrameWork = function (element, options) {

        var _default = {};

        this.$element = $(element);

        this.options = $.extend({}, _default, options);

        _rendering.call(this);

    };

    function _rendering() {

        var $this = this,

            modalElm = $('<div >').modal();

        //加载modal
        modalElm.modal('button', this.options.modalDetails.btns);

        //加载菜单
        $(this.options.menuDetails.elm).menuList({

            url: this.options.menuDetails.url,

            targetTab: this.options.TabElm,

            dataOn: 0

        }).on('load', function () {

            //加载tab
            $($this.options.TabElm).tab()

                .on('got',function(){

                })

                .tab('setTabOn', '[data-on="1"]');

        });




    }


    function Plugin(option) {

        var args = Array.prototype.slice.call(arguments, 1);

        return this.each(function () {

            var $this = $(this);

            var data = $this.data('by.frameWork');

            var options = typeof option == 'object' && option;

            if (!data) {

                $this.data('by.frameWork', (data = new FrameWork(this, options)))

            }

            if (typeof option == 'string') {

                data[option].apply(data, args)

            }

            return data;

        })

    }

    var old = $.fn.frameWork;

    $.fn.frameWork = Plugin;

    $.fn.frameWork.Constructor = FrameWork;

    $.fn.frameWork.noConflict = function () {

        $.fn.frameWork = old;

        return this

    }

}(jQuery);