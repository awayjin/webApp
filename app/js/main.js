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
        "swipeSlide": "./lib/swipeSlide.min"
    },
    shim: {
        "zepto": {
            exports: "$"
        },
        "swipeSlide": ["zepto"]
    }
});


requirejs(["zepto"], function($) {

    // DOM加载完成之后, 以便加载相应的所需模块
    $(function() {
        // 首页轮播slide
        if ($(".index-slide").length > 0) {
            // 加载轮播
            requirejs(["swipeSlide"], function() {
                $('#slide3').swipeSlide({
                    continuousScroll:true,
                    speed : 3000,
                    transitionType : 'cubic-bezier(0.22, 0.69, 0.72, 0.88)',
                    callback : function(i){
                        $('.dot').children().eq(i).addClass('cur').siblings().removeClass('cur');
                    }
                });
            });
        }

        // 搜索列表
        if ($(".search-list").length > 0) {
            requirejs(["searchList"]);
        }

        // 搜索框
        if ($(".index-search").length > 0) {
            $(".index-search").click(function() {
                $(".viewport").hide();
                $(".search-pop").show();
            });

            $(".index-back").click(function() {
                $(".viewport").show();
                $(".search-pop").hide();
            });
        }

        // 详细页大图滑动
        if ($(".detail-slide").length >0) {

            requirejs(["swipeSlide"], function() {
                $('#slide4 .inner').swipeSlide({
                    continuousScroll:true,
                    autoSwipe: false,
                    transitionType : 'cubic-bezier(0.22, 0.69, 0.72, 0.88)',
                    callback : function(i){
                        $('.dot').children().eq(i).addClass('cur').siblings().removeClass('cur');
                    }
                });


            });
        }



    });




});

// 返回上一页
function pageBack() {
    var a = window.location.href;
    if (/#top/.test(a)) {
        window.history.go( - 2);
        window.location.load(window.location.href)
    } else {
        window.history.back();
        window.location.load(window.location.href)
    }
}


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

