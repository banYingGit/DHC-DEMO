+function ($) {

    var Autocompleter = function (element, options) {

        var _default = {};

        this.$default = $(element);

        this.options = $.extend({}, _default, options);

        _createElement.call(this);

        _event.call(this);

    };

    function _createElement() {

        this.$default.wrap('<div data-role="selectBox" class="auto-completer">').after('<ul data-role="selectList">');

        this.$element = this.$default.parents('div[data-role="selectBox"]');


    }

    function _style() {

        var _top = +(this.$default.height()) + 1;

        $('ul[data-role="selectList"]', this.$element).css('top', _top);

    }

    function _event() {

        var $this = this;

       this.$default.on('keyup',function (e) {

            e.stopPropagation();

            var keyData = $this.$default.val();

            _style.call($this);

           console.log(keyData)

            _load.call($this, keyData);

        })


        this.$element
            .on('click', 'ul[data-role="selectList"]>li', function (e) {

                e.stopPropagation();

                var liText = $(this).text();

                $this.$default.val(liText);

                $('ul[data-role="selectList"] > li', $this.$element).removeClass('on');
                $(this).addClass('on');

                $('ul[data-role="selectList"]', $this.$element).slideUp(500);

            });

        $(document).on('click', function (e) {

            $('ul[data-role="selectList"]', $this.$element).slideUp(500);

        })

    }

    function _load(keyData) {
		
		var $this=this;
   
     if(keyData){
   
        $.get(this.options.url, keyData, function (data) {

				 $('[data-role=selectList]', $this.$element).slideDown(500);

                $('[data-role=selectList]', this.$element).empty().append(data)

        });

            }else{

                $('[data-role=selectList]', this.$element).empty().slideUp(500);

            }

    }

    Autocompleter.prototype.getValue = function (fn) {

        var $this = this,

            boxVal =  $('ul[data-role="selectList"] > li.on', $this.$element);


        fn && fn(boxVal)

    };

    function Plugin(option) {

        var args = Array.prototype.slice.call(arguments, 1);

        return this.each(function () {

            var $this = $(this);

            var data = $this.data('by.autocompleter');

            var options = typeof option == 'object' && option;

            if (!data) {

                $this.data('by.autocompleter', (data = new Autocompleter(this, options)))

            }

            if (typeof option == 'string') {

                data[option].apply(data, args)

            }

            return data;

        })

    }

    var old = $.fn.autocompleter;

    $.fn.autocompleter = Plugin;

    $.fn.autocompleter.Constructor = Autocompleter;

    $.fn.autocompleter.noConflict = function () {

        $.fn.autocompleter = old;

        return this

    }

}(jQuery);