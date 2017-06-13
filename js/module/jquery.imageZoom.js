+function ($) {

    var ImageZoom = function (element, options) {

        var _default = {

            zoomW: 200,

            zoomH: 200,

            cursorW: 100,

            cursorH: 100,

            cloneW: 350,

            cloneH: 350

        };

        this.$element = $(element);

        this.options = $.extend({}, _default, options);

        _rendering.call(this);

        _event.call(this)

    };

    function _rendering() {

        this.$element.addClass('image-zoom').css({width: this.options.zoomW, height: this.options.zoomH})

        this.$element.children('img').wrap('<div class="image-zoom-box">')

        this.$element.append('<div class="image-zoom-cursor">').append('<div class="image-zoom-clone" data-role="clone">')

        $('.image-zoom-cursor', this.$element).css({width: this.options.cursorW, height: this.options.cursorH})

        $('.image-zoom-clone', this.$element).css({
            width: this.options.cloneW,
            height: this.options.cloneH
        });

        var src = this.$element.find('img').attr('src')

        $('.image-zoom-clone', this.$element).append("<img src=" + src + ">")

    }

    function _event() {

        var $this = this,

            percent,

            pageX, offX, moveX,

            pageY, offY, moveY,

            imgH, imgW;

        $(this.$element).on('mousemove', function (e) {

            imgH = $('.image-zoom-clone img', $this.$element).height();

            imgW = $('.image-zoom-clone img', $this.$element).width();


            pageX = e.pageX;

            offX = $(this).offset().left;//固定不会改变

            moveX = pageX - offX;

            if (moveX < ($this.options.cursorW / 2)) {

                _changeX.call($this, 0, 0)

            }

            if (moveX > ($this.options.cursorW / 2)) {

                percent = (-(moveX + $this.options.cursorW) / $this.options.zoomW) * 100 + '%';

                _changeX.call($this, (moveX - ($this.options.cursorW / 2)), percent)

            }
            if (moveX > ($this.options.zoomW - ($this.options.cursorW / 2))) {

                _changeX.call($this, $this.options.cursorW - 2, -(imgW - $this.options.cloneW))


            }


            pageY = e.pageY;

            offY = $(this).offset().top;//固定不会改变

            moveY = pageY - offY;


            if (moveY < ($this.options.cursorH / 2)) {

                _changeY.call($this, 0, 0)

            }

            console.log(moveY,($this.options.cursorH / 2), ($this.options.zoomH - ($this.options.cursorH / 2)))



            if (moveY > ($this.options.cursorH / 2)) {


                percent = (-(moveY + $this.options.cursorH) / $this.options.zoomH) * 100 + '%';
                console.log(percent)
                _changeY.call($this, (moveY - ($this.options.cursorH / 2)), percent)


            }
            if (moveY > ($this.options.zoomH - ($this.options.cursorH / 2))) {

                _changeY.call($this, $this.options.cursorH - 2, -(imgH - $this.options.cloneH))


            }

        })

    }

    function _changeX(cursor, clone) {

        $('.image-zoom-cursor', this.$element).css({'left': cursor});

        $('.image-zoom-clone img', this.$element).css({'left': clone})

    }

    function _changeY(cursor, clone) {

        $('.image-zoom-cursor', this.$element).css({'top': cursor});

        $('.image-zoom-clone img', this.$element).css({'top': clone})

    }


    function Plugin(option) {

        var args = Array.prototype.slice.call(arguments, 1);

        return this.each(function () {

            var $this = $(this);

            var data = $this.data('by.imageZoom');

            var options = typeof option == 'object' && option;

            if (!data) {

                $this.data('by.imageZoom', (data = new ImageZoom(this, options)))

            }

            if (typeof option == 'string') {

                data[option].apply(data, args)


            }

            return data;

        })

    }

    var old = $.fn.imageZoom;

    $.fn.imageZoom = Plugin;

    $.fn.imageZoom.Constructor = ImageZoom;

    $.fn.imageZoom.noConflict = function () {

        $.fn.imageZoom = old;

        return this

    }

}

(jQuery);