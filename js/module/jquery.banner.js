+function ($) {

    var Banner = function (element, options) {

        var _default = {

            animation: 'fade',

            focusStyle: 'point',

            interval: '2000'

        };

        this.$default = $(element);

        this.options = $.extend({}, _default, options);

        this.index = 0;

        this.liLength = $('li', this.$default).length;

        this.cycle = '';

        _createElement.call(this);

        _createFocus.call(this);

        _focusBody.call(this);

        _event.call(this)

    };

    //创建元素
    function _createElement() {

        this.$default.addClass('banner-body').wrap('<div class="banner">').find('a').addClass('banner-pic');

        this.$element = this.$default.parent('.banner');

        //设置箭头
        this.arrow = $('<ul class="banner-arrow"><li class="banner-arrow-prev"><span class="icon-arrow-left-1"></span></li><li class="banner-arrow-next"><span class="icon-arrow-right-1"></span></li></ul>')

        this.$default.after(this.arrow);

        this.nav = $('<ul class="banner-nav"></ul>');

    }

    //设置底部焦点
    function _createFocus() {

        var navList = $('li', this.$default),

            $this = this;

        navList.each(function () {

            $this.nav.append('<li>')

        });

        $('li:eq(0)', this.nav).addClass('on');

        this.options.focusPosition && this.nav.appendTo(this.$element);

        switch (this.options.focusPosition) {

            case 'left':
            {
                $this.nav.css('text-align', 'left');

                return

            }

            case 'center':
            {
                $this.nav.css('text-align', 'center');

                return

            }

            case 'right':
            {
                $this.nav.css('text-align', 'right');

                return

            }


        }


    }

    //设置底部焦点内容
    function _focusBody() {

        var $this = this;

        switch (this.options.focusStyle) {

            case 'img':
            {

                $this.nav.addClass('banner-nav-img');

                $('li', $this.$default).each(function (i) {

                    var _newImg = $('li', $this.nav).eq(i);

                    $(this).find('img').clone().appendTo(_newImg);

                });

                return
            }
            case 'text':
            {
                $this.nav.addClass('banner-nav-text');

                $('li', $this.$default).each(function (i) {

                    var _newImg = $('li', $this.nav).eq(i),

                        text = $(this).attr('title');

                    _newImg.text(text);

                });

                return
            }
            case 'point':
            {
                $this.nav.addClass('banner-nav-point');

                return
            }
        }


    }

    //设置私有事件
    function _event() {

        var $this = this;

        this.$element.on('click', '.banner-arrow-next', function () {

            $this.next()

        })

            .on('click', '.banner-arrow-prev', function () {

                $this.prev()

            })
            .on('mouseenter', function () {

                clearInterval($this.cycle);

            })
            .on('mouseleave', function () {

                $this.autoPlay()

            });

        this.nav.on('click', 'li', function () {

            var _li = $(this).index();

            console.log('焦点', _li);

            $this.num(_li + 1)

        });

        this.autoPlay()

    }

    //播放 这里有播放一圈后回调'loopEnd'
    function _play() {

        var $this = this,

            liWidth = $('li', $this.$default).width();

        //fade
        function fade() {

            $('li', $this.$default).fadeOut().eq($this.index).fadeIn();

            $('li', $this.nav).removeClass('on').eq($this.index).addClass('on')

        }


        //slide
        function slide() {

            var liWidth = $('li', $this.$default).width();

            $('li', $this.$default).css({'float': 'left', 'width': liWidth});

            $this.$default.css({'width': $this.liLength * liWidth});

            $this.$default.animate({'margin-left': -(liWidth * $this.index)}, 300);

            $('li', $this.nav).removeClass('on').eq($this.index).addClass('on')

        }


        //判断 fade|slide
        switch ($this.options.animation) {

            case 'fade':
                fade();
                break;

            case 'slide':
                slide();
                break;

        }

        if (this.index == (this.liLength - 1)) {

            this.$default.trigger('loopEnd')

        }

    }

    //下一个
    Banner.prototype.next = function () {

        var $this = this;

        $this.index = $this.index < ($this.liLength - 1) ? ($this.index + 1) : 0;

        console.log('当前 $this.index', $this.index);

        _play.call($this)

    };

    //上一个
    Banner.prototype.prev = function () {

        var $this = this;

        $this.index = $this.index > 0 ? ($this.index - 1) : ($this.liLength - 1);

        console.log('上一个 $this.index', $this.index);

        _play.call($this)

    };

    //跳到指定屏
    Banner.prototype.num = function (num) {

        var $this = this,

            _num = num - 1 | '';

        //参数num 从1开始计算

        $this.index = _num;

        clearInterval($this.cycle);

        _play.call($this)
    };

    //自动播放
    Banner.prototype.autoPlay = function () {

        var $this = this;

        this.cycle = setInterval(function () {

            $('.banner-arrow-next', $this.$element).trigger('click')

        }, this.options.interval);


        this.cycle


    };

    //停止播放 这里有播放停止后回调'end'
    Banner.prototype.stopPlay = function () {

        var $this = this;

        clearInterval($this.cycle);

        this.$default.trigger('end')
    };


    //？？？？？？？？？？停止后鼠标经过又会开始????????????????


    //默认结构
    function Plugin(option) {

        var args = Array.prototype.slice.call(arguments, 1);

        return this.each(function () {

            var $this = $(this);

            var data = $this.data('by.banner');

            var options = typeof option == 'object' && option;

            if (!data) {

                $this.data('by.banner', (data = new Banner(this, options)))

            }

            if (typeof option == 'string') {

                data[option].apply(data, args)

            }

            return data;

        })

    }

    var old = $.fn.banner;

    $.fn.banner = Plugin;

    $.fn.banner.Constructor = Banner;

    $.fn.banner.noConflict = function () {

        $.fn.banner = old;

        return this

    }

}(jQuery);
