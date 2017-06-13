$(function () {

 //面板切换
    $('.wgt-code-title li').click(function () {

        $(this).addClass('on').siblings('li').removeClass('on');

        var i = $(this).index();

        $(this).parent('.wgt-code-title').siblings('.wgt-code-box').children('li').eq(i).addClass('on')

            .siblings('li').removeClass('on');

    });
	
});