$(function () {

    //滚动条设置
    $('.perfect-scroll').mouseover(function () {

        if (!$(this).data('scroll')) {

            $(this).perfectScrollbar({minScrollbarLength: 100});

            $(this).data('scroll', 1);
        }
    });
	
	//菜单折叠
	var menuWidth='';
	$('.menu-btn').click(function(){
		$(this).toggleClass('menu-open')
		menuWidth=$('.left-menu').width();
		
		
		if($('.menu-btn').hasClass('menu-open')){
			$('.left-menu').css({'left':-menuWidth})
			$('.container').css({'padding-left':0})
			
			
			
			
			}
			else{
				$('.left-menu').css({'left':0})
				$('.container').css({'padding-left':menuWidth})
				}
		})
		
		
	



   


});