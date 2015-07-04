/**
 * config配置文件
 *   zepto非AMD需要shim exports
 *
 */
requirejs.config({
    baseUrl: "../js",
    urlArgs: "bust=" +  (new Date()).getTime(), // 防止缓存,开发需要
    paths: {
        "zepto": "../bower_components/zepto/zepto",
        "slide": "./slide",
        "searchList": "./page-search",
        "swipeSlide": "./lib/swipeSlide.min",
        "city": "./user/city",
        "common": "./common"
    },
    shim: {
        "zepto": {
            exports: "$"
        },
        "swipeSlide": ["zepto"],
        "city": {
            exports: "citySelectComponent"
        }
    }
});


// 共有js
requirejs(["common"], function(PUR) {
    // 返回
    PUR.pageBack();
});

requirejs(["zepto"], function($) {

    // DOM加载完成之后, 以便加载相应的所需模块
    $(function() {

        //
        $(".pro-delete").click(function() {
            alert(222);
            alert(33);
            console.log(44);
        });

        if ( $(".address-add").length > 0 ) {
            // 省市联动
            requirejs(["city"], function (city) {
                city(".province" , ".city");
            });

        }

    });

    // 支付方式
    $(".til").click(function() {
        $(this).siblings(".pay-info").toggle();
    });





});





///**
// * 搜索列表
// */
//requirejs(["searchList"])
//
//
///**
// * slide轮播
// */
//requirejs(["zepto", "slide"], function($, slide) {
//    console.log("1.zepto:"+$);
//    console.log("2.slide:"+slide);
//
//});
//
//requirejs(["zepto"], function($) {
//    // 搜索框弹出
//    $(".pt-header-icon-category").click(function() {
//        $(".viewport").hide();
//        $(".search-pop").show();
//    });
//
//    // 首页返回
//    $(".index-back").click(function() {
//        $(".viewport").show();
//        $(".search-pop").hide();
//    });
//});

