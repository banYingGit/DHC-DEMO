+function ($) {

    var Message = function (element, options) {

        var _default = {

            callback: $.noop,

            type: 'info',

            cls: 1,

            time: 0

        };

        this.$default = $(element);

        this.options = $.extend({}, _default, options);

        _rendering.call(this);

        _event.call(this)

    };

    //创建元素

    function _rendering() {

        this.$element = $('<div class="message"><h2 class="message-title"><span data-role="title"></span><a href="javacScrit:void(0)" data-role="shut">关闭</a></h2></div>');

        var footer = $('<div class="message-footer">');


        var _default = this.$default.replaceWith('<h3 data-role="body"></h3>');
	

        _default.wrap('<div class="message-body">');

        var defaultParent = _default.parent();

        this.$element.append(defaultParent).append(footer);

        this.type();

        this.title();

        this.body();

        if ($('body').has(this.$element).size() == 0) {

            $('body').append(this.$element);

        }

    }

    //创建页面按钮

    Message.prototype.btns = function (cls) {


        var _cls = cls || this.options.cls,


            _btns = [];


        if ((_cls & 1) == 1) {

            _btns.push('<a href="javascript:void(0)" class="btn btn-default" data-role="sure">确 定</a>')

        }

        if ((_cls & 2) == 2) {

            _btns.push('<a href="javascript:void(0)"  class="btn btn-default" data-role="yes">是</a>')

        }

        if ((_cls & 4) == 4) {

            _btns.push('<a href="javascript:void(0)"  class="btn btn-default-alt" data-role="cancel">取 消</a>')

        }

        if ((_cls & 8) == 8) {

            _btns.push('<a href="javascript:void(0)" class="btn btn-default-alt" data-role="no">否</a>')

        }

        console.log(_btns)

        return $('.message-footer', this.$element).empty().append(_btns);

    };

    //选择外观样式

    Message.prototype.type = function (type) {

        var _type = type || this.options.type;

        switch (_type) {

            case 'info':

            {
                this.$element.addClass('message-info');

                $('[data-role=title]', this.$element).append('信息');

                return

            }

            case 'warning':

            {
                this.$element.addClass('message-warning');

                $('[data-role=title]', this.$element).append('警告');

                return

            }

            case 'error':

            {
                this.$element.addClass('message-error');

                $('[data-role=title]', this.$element).append('错误');

                return

            }
            case 'complete':

            {
                this.$element.addClass('message-complete');

                $('[data-role=title]', this.$element).append('完成');

                return

            }


        }


    }

    //创建页面私有事件

    function _event() {

        var $this = this;

        this.$element.on('click', '[data-role="shut"]', function () {

            $this.hide();

        })
            //点击 底部 [data-role] 按钮 添加 回调事件

            .on('click', '.message-footer [data-role]', function (e) {

                var _role = $(this).attr('data-role'),

                    cls = 1;

                if (_role == 'sure') {

                    // trigger  事件是传出去用的
                    $this.$element.trigger('sure', {

                        cls: 1

                    });

                    //cls = 1 是用在 e.cls = cls; 是回调用
                    cls = 1;

                }
                else if (_role == 'yes') {

                    cls = 2;

                    $this.$element.trigger('yes', {

                        cls: 2
                    })

                } else if (_role == 'cancel') {

                    cls = 4;

                    $this.$element.trigger('cancel', {

                        cls: 4
                    })

                } else if (_role == 'no') {

                    cls = 8;

                    $this.$element.trigger('no', {

                        cls: 8
                    })
                }

                e.cls = cls;

                $this.options.callback.apply(this, [].concat(Array.prototype.slice.call(arguments)).concat(
                    function () {

                        $this.hide();

                    }
                ))

            })

            //添加倒计时
            .on('time', function () {

                var timeBox = $('<i>'),

                    _time = $this.options.time;

                $('[data-role="sure"]', $this.$element).append(timeBox);


                var timer = setInterval(function () {

                    if (_time <= 0) {

                        $this.hide();

                        return

                    }

                    timeBox.text(_time--);

                }, 1000);

                $(this).data('timer', timer);

            })

            //取消 倒计时 时间 事件
            .on('clearTimer', function () {

                var timer = $(this).data('timer');

                clearInterval(timer);

                $('[data-role=sure]>i', $this.$element).remove();

            })

    }


    //设置标题
    Message.prototype.title = function (title) {

        var $this = this;

        var _title = title || this.options.title || '';

        //if (!$.trim(_title)) {
        //
        //    $('[data-role=title]', $this.$element).remove();
        //
        //}
        _title && $($this.$element).find('[data-role=title]').text(_title);
    };

    //设置内容
    Message.prototype.body = function (body) {

        var $this = this;

        var _body = body || this.options.body || '';

        _body && $($this.$element).find('[data-role=body]').html(_body);

    };

    // 显示
    Message.prototype.show = function (fn) {

        var $this = this;

        // 如果 time 设置 大于0 就从设置的时间开始算起，如果设置为0 则不添加倒计时 事件
        if (this.options.time > 0) {

            this.$element.trigger('time');

        }

        this.$element.trigger('show');

        var background = $('<div class="message-background">');

        this.$element.after(background).addClass(function () {

            setTimeout($.proxy(function () {

                $(this).trigger('shown')

            }, $this.$default), 500);

            return 'message-show'

        });

        //添加点击底部按钮时的回调方法
        fn && ( $this.options.callback = fn);

    };

    //隐藏
    Message.prototype.hide = function () {

        var $this = this;

        this.$element.trigger('clearTimer');

        this.$element.trigger('hide');

        this.$element.removeClass(function () {

            setTimeout($.proxy(function () {

                $(this).trigger('hiden');

                $('.message-background').remove();

            }, $this.$default), 500);

            return 'message-show'
        })

    };

    // touch 方法是用来销毁 当前点击按钮上的方法事件，然后在添加一次该按钮所触发的事件，$this.$element.trigger('yes', {cls: 1});
    Message.prototype.touch = function (type, fn) {

        this.$element.off(type).one(type, fn);

    };

    function Plugin(option) {

        var args = Array.prototype.slice.call(arguments, 1);

        return this.each(function () {

            var $this = $(this);

            var data = $this.data('by.message');

            var options = typeof option == 'object' && option;

            if (!data) {

                $this.data('by.message', (data = new Message(this, options)))

            }

            if (typeof option == 'string') {

                data[option].apply(data, args)

            }

            return data;

        })

    }

    var old = $.fn.message;

    $.fn.message = Plugin;

    $.fn.message.Constructor = Message;

    $.fn.message.noConflict = function () {

        $.fn.message = old;

        return this

    }

}(jQuery);