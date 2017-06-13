$(function () {

    //请求菜单数据


    $.get('../menuList.html', function (data) {

        $('#leftMenu').append(data)

    });


    


});