/**
 * Created by jinwei on 2015/6/15.
 */

define(["zepto"], function($) {

    var slide = document.querySelector(".slide");

    //  鼠标滑过
    $(".dot span").click(function(e) {
        console.log("index:"+$(this).index());
        console.log("index:"+$(this).index());
        console.log("index:"+$(this).index());

        $(this).addClass("cur").siblings("span").removeClass("cur");
    });

    return slide;
});