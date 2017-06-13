+function ($) {

    var MenuList = function (element, options) {

        var _default = {

            url: 'list.json',

            targetTab: '#tab',

            dataOn: 0

        };

        this.$element = $(element);

        this.options = $.extend({}, _default, options);

        _createElement.call(this);

        _loadElement.call(this);

        _event.call(this)

    };

    //创建元素

    function _createElement() {

        this.$element.addClass('clear').append('<ul class="left-menu-list">');

    }

    function _loadElement() {

        var $this = this;

        $.getJSON(this.options.url, function (data) {

            $.each(data, function (i, Data) {


                var li = $('<li class="left-menu-one">'),

                    childUl,

                    childLi,

                    aData = {

                        name: Data.name,

                        url: Data.href,

                        target: Data.target,

                        icon: Data.icon

                    };

                if (i == $this.options.dataOn) {

                    li.addClass('on')

                }

                _openType.call($this, li, aData);

                if (Data.children && Data.children != null) {

                    childUl = $('<ul  class="left-menu-two">');

                    $.each(Data.children, function (i, Data) {

                        childLi = $('<li>');


                        if (i == $this.options.dataOn) {

                            childLi.addClass('on');

                        }

                        var childaData = {

                            name: Data.name,

                            url: Data.href,

                            target: Data.target,

                            icon: Data.icon,

                            isOn: (i == $this.options.dataOn) ? 1 : ''

                        };

                        if (childaData.url.indexOf(".html") != -1) {


                            childUl.append(childLi);

                            li.append(childUl);

                            _openType.call($this, childLi, childaData);
                        }


                    });

                }

                $('.left-menu-list', this.$element).append(li)

            })

        }).done(function(){

            $this.$element.trigger('load');

        })



    }

    function _openType(li, aData) {

        var _a = $('<a></a>'),

            iconClass = aData.icon || '',

            _i = $('<i class="' + iconClass + '">'),

            name = aData.name,

            type = aData.target || 'none';

        if (aData.isOn == 1) {

            _a.attr('data-on', '1')

        }

        switch (type) {

            case 'none':
            {
                _a.attr({'href': 'javaScript:void(0)', 'tiele': name}).append(_i).append(name);

                li.append(_a);

                return

            }

            case 'blank':
            {
                _a.attr({'href': aData.url, 'tiele': name, "target": "_blank"}).append(_i).append(name);

                li.append(_a);

                return

            }

            case 'tab':
            {
                _a.attr({

                    'href': 'javaScript:void(0)',

                    'data-role': 'tab',

                    'data-target': this.options.targetTab,

                    'data-name': name,

                    "data-url": aData.url

                }).append(_i).append(name);

                li.append(_a);

                $(this.options.elem).tab('setTabOn', 'data-on');

                return

            }

        }

    }

    function _event() {

        var $this = this;

        this.$element.on('click', 'li > a', function (e) {

            var _target = $(e.target).parent('li');


            $this.$element.find('li').removeClass('on');

            _target.addClass('on')

        })

    }

    function Plugin(option) {

        var args = Array.prototype.slice.call(arguments, 1);

        return this.each(function () {

            var $this = $(this);

            var data = $this.data('by.menuList');

            var options = typeof option == 'object' && option;

            if (!data) {

                $this.data('by.menuList', (data = new MenuList(this, options)))

            }

            if (typeof option == 'string') {

                data[option].apply(data, args)

            }

            return data;

        })

    }

    var old = $.fn.menuList;

    $.fn.menuList = Plugin;

    $.fn.menuList.Constructor = MenuList;

    $.fn.menuList.noConflict = function () {

        $.fn.menuList = old;

        return this

    }

}(jQuery);