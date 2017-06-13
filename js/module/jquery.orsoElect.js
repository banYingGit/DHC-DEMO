+function ($) {

    var OrsoElect = function (element, options) {

        var _default = {



        };

        this.$element = $(element);

        this.options = $.extend({}, _default, options);

        _rendering.call(this);

        _event.call(this)


    };

    function _rendering() {

        var $this = this;

        //创建容器
        var rightNum = this.options.rightTitle.length;

        this.$element.addClass('orso clear');

        this.$leftBox = $('<div class="orso-left">');

        this.$rightBox = $('<div class="orso-right orso-right-' + rightNum + '">');

        //添加内容（左侧）
        var orsoBoxLeft = $('<div class="orso-content"></div>'),

            orsotitleLeft = $('<h3 class="orso-title">').text(this.options.leftTitle);

        orsoBoxLeft.append(orsotitleLeft).append('<ul>');

        this.$leftBox.append(orsoBoxLeft);

        //添加内容（右侧）

        $.each(this.options.rightTitle, function (i, data) {

            var boxContent = $('<div class="orso-right-box" data-role="orso-right-' + i + '">'),

                orsoBoxRight = $('<div class="orso-content"></div>'),

                orsotitleRight = $('<h3 class="orso-title">').text($this.options.rightTitle[i]),

                orsoBtn = $('<div class="orso-btn"><i class="icon-arrow-right-1" title="向右移动" data-role="btn-right"></i><i class="icon-arrow-left-1" title="向左移动" data-role="btn-left"></i></div>');

            orsoBoxRight.append(orsotitleRight).append('<ul>');

            boxContent.append(orsoBtn).append(orsoBoxRight);

            $this.$rightBox.append(boxContent);


        });

        this.$element.append(this.$leftBox).append(this.$rightBox);

        _loadData.call(this)

    }

    function _event() {

        var $this = this;

        this.$element.on('click', '.orso-right .orso-btn i[data-role=btn-right]', function () {

            var _tarElm = $(this).parents('.orso-right-box:first').find('ul:first');

            _moveLi.call($this, $this.$leftBox, _tarElm);


        })
            .on('click', '.orso-right .orso-btn i[data-role=btn-left]', function () {

                var formElm = $(this).parents('.orso-right-box:first'),

                    _tarElm = $this.$leftBox.find('ul:first');

                _moveLi.call(this, formElm, _tarElm)

            })

            .on('click', '.orso-left li span', function () {

                var _elm = $(this).parent().children('input[type=checkbox]');

                if (_elm.prop("checked") == true) {

                    _elm.prop("checked", false);

                } else {

                    _elm.prop("checked", true);

                }

            })


    }

    function _moveLi(fromMoveElm, toMoveElm) {

        fromMoveElm.find(' .orso-content ul li input[type=checkbox]:checked')

            .each(function () {

                toMoveElm.append($(this).parent('li'))

            });

    }

    function _loadData() {

        function S4() {

            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }

        var $this = this;

        $.getJSON(this.options.url, function (datas) {

            $.each(datas, function (i, data) {

                var _id = (S4() + S4()),

                    _li = $('<li class="check-group" data-role="item"><input type="checkbox" id="' + _id + '"><label for="' + _id + '"></li>'),

                    _span = $('<span>' + data.name + '</span>');

                _li.data('data', data);

                _li.append(_span);

                $('.orso-left > .orso-content > ul', this.$element).append(_li)

            })

        })

    }

    OrsoElect.prototype.getValue = function (fn) {

        var data = [];

        $('[data-role^=orso-right]', this.$element).each(function () {

            var obj = [];

            $('li[data-role=item]', this).each(function () {

                obj.push($(this).data('data'));

            });

            data.push(obj);

        });

        fn && fn(data)

    };


    function Plugin(option) {

        var args = Array.prototype.slice.call(arguments, 1);

        return this.each(function () {

            var $this = $(this);

            var data = $this.data('by.orsoElect');

            var options = typeof option == 'object' && option;

            if (!data) {

                $this.data('by.orsoElect', (data = new OrsoElect(this, options)))

            }

            if (typeof option == 'string') {

                data[option].apply(data, args)

            }

            return data;

        })

    }

    var old = $.fn.orsoElect;

    $.fn.orsoElect = Plugin;

    $.fn.orsoElect.Constructor = OrsoElect;

    $.fn.orsoElect.noConflict = function () {

        $.fn.orsoElect = old;

        return this

    }

}(jQuery);