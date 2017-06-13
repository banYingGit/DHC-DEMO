// JavaScript Document
$(function () {


 // less编译 css 下载
    var change = function () {

        var obj = {};

        $('.variable label').each(function () {

            var variable = $(this).children('span').text();

            var value = $(this).children('input').val();

            obj[variable] = value;
			
			console.log('variable,value',variable,value)

        });

        less.modifyVars(obj);

    };

    var downCss = function () {

        var tempLess = document.getElementById('less:less-KIT'),

            NewTemp = document.getElementById('down');

        NewTemp.download = 'build.css';

        NewTemp.href = "data:text/css," + tempLess.innerHTML;

    };

    $('#sure').on('click', function () {

        change()

    });

    $('#down').on('click', function () {

        downCss()

    });

    // 用户自定义界面切换

    $.get('custom.html', function (data) {

        $('#customPage').append(data)

    });
    $.get('preview.html', function (data) {

        $('#previewPage').append(data)

    });

    $('#preview').on('click', function () {

        if ($(this).text() == '预览效果') {

            $(this).text('编辑样式');

            $('#custom').addClass('preview-show');


        } else {

            $(this).text('预览效果');

            $('#custom').removeClass('preview-show');

        }


    });

	
});