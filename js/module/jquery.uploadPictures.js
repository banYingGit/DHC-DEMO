+function ($) {

    var UploadPicture = function (element, options) {

        var _default = {

            //这个单位为B 1KB=1024B 1MB=1024B × 1024B  1GB=1024B  × 1024B × 1024B
            imgSize: 1024 * 1024,

            imgFormat: ['PNG', 'GIF', 'JPG']

        };

        this.$element = $(element);

        this.options = $.extend({}, _default, options);

        _createElement.call(this);

        _event.call(this)

    };

    function _createElement() {


        this.$list = {};

        if (this.$element.hasClass('upload-picture')) return;

        this.$element.addClass('upload-picture');

        var uploadList = $('<ul class="upload-picture-list"><li title="添加一张" class="upload-picture-btn" data-role="add">+</li></ul>');

        this.$element.append(uploadList);


    }


    function _event() {

        var $this = this;

        this.$element.on('click', '.upload-picture-list > li[data-role="add"]', function (e) {

            var _li = $('<li class="upload-picture-box"><img src=""><input name="" type="file" ><span class="upload-picture-del"><i>删除</i></span></li>')

            $(this).before(_li)

        })
            .on('click', '.upload-picture-list > li > .upload-picture-del > i', function (e) {

                $(this).parents('li.upload-picture-box').remove()

            })
            .on('change', '.upload-picture-list > li > input[type="file"]', function (e) {

                if (_getURL.call(this, this.files[0]) == undefined) return

                var _file = _getURL.call(this, this.files[0]),

                    _val = $(this).val(),

                    type = _val.substring((_val.lastIndexOf(".")) + 1, _val.length).toUpperCase();


                if (_format.call($this, _val) && _checkImgSize.call($this, $this.options.imgSize, this.files[0], e)) {

                    $(this).siblings('img').attr('src', _file);

                    $(this).siblings('img').data({

                        'name': this.files[0].name,

                        //这里单位是KB
                        'size': (this.files[0].size / 1024).toFixed(2),

                        'type': type,

                        'src': _val

                    })


                }

            })

    }

    //获取文件
    function _getURL(file) {

        var url = null;


        if (file == undefined) return;

        if (window.createObjectURL != undefined) { // basic

            url = window.createObjectURL(file);

        }
        else if (window.URL != undefined) { // mozilla(firefox)

            url = window.URL.createObjectURL(file);

        }

        else if (window.webkitURL != undefined) { // webkit or chrome

            url = window.webkitURL.createObjectURL(file);

        }

        return url;
    }

    //URL对象是硬盘（SD卡等）指向文件的一个路径，如果我们做文件上传的时候，想在没有上传服务器端的情况下看到上传图片的效果图的时候就可是以通过var url=window.URL.createObjectURL(obj.files[0]);
    // 获得一个http格式的url路径，这个时候就可以设置到<img>中显示了。
    // window.webkitURL和window.URL是一样的，window.URL标准定义，window.webkitURL是webkit内核的实现（一般手机上就是使用这个），还有火狐等浏览器的实现。

    //图片格式校验
    function _format(file) {

        var valueopt = file.lastIndexOf("."),

            format = file.substring(valueopt + 1, file.length).toUpperCase();

        if ($.inArray(format, this.options.imgFormat) == -1) {

            alert('格式错误');

            return;

        }

        return true

    }

    //图片大小校验
    function _checkImgSize(maxsize, file, e) {


        var browser = {},

            fileSize = file.size;

        var ua = window.navigator.userAgent;

        if (ua.indexOf("MSIE") == -1) {

            if (fileSize > maxsize) {

                alert('图片大小超过' + maxsize);

                return

            }

        }
        else {

            //var obj_img = $(this).siblings('img');
            //
            //obj_img.dynsrc = $(this).value;
            //
            //fileSize = obj_img.fileSize;
            //
            //alert(fileSize)

        }

        return true

    }

    //获取当前img数据
    UploadPicture.prototype.getImgList = function (fn) {

        var arr = [];

        $('img', this.$element).each(function (i, data) {

            arr.push($(this).data())

        });

        fn && fn(arr)

    };

    //添加一个图片
    UploadPicture.prototype.AddImg = function () {

        $('.upload-picture-list > li[data-role="add"]', this.$element).trigger('click')

    };


    function Plugin(option) {

        var args = Array.prototype.slice.call(arguments, 1);

        return this.each(function () {

            var $this = $(this);

            var data = $this.data('by.uploadPicture');

            var options = typeof option == 'object' && option;

            if (!data) {

                $this.data('by.uploadPicture', (data = new UploadPicture(this, options)))

            }

            if (typeof option == 'string') {

                data[option].apply(data, args)

            }

            return data;

        })

    }

    var old = $.fn.uploadPicture;

    $.fn.uploadPicture = Plugin;

    $.fn.uploadPicture.Constructor = UploadPicture;

    $.fn.uploadPicture.noConflict = function () {

        $.fn.uploadPicture = old;

        return this

    }

}
(jQuery);