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
        "common": "./common",
        "slide": "./slide",
        "searchList": "./page_search",
        "swipeSlide": "./lib/swipeSlide.min",
        // 百度手势事件
        "bdTouch": "../bower_components/touchjs/dist/touch-0.2.14",
        "city": "./user/city"
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


requirejs([
    "zepto",
    "common"
], function($, PUR) {

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


        // 删除订单
        $(".pro-delete").click(function() {
            alert(222);
            console.log(44);
        });

        // 省市联动
        if ( $(".address-add").length > 0 ) {

            requirejs(["city"], function (city) {
                city(".province" , ".city");
            });

        }

    });

    // 积分切换
    $("#coupon li").on("click", function() {
        var index = $(this).index();
        $(this).addClass("current").siblings("li").removeClass("current");
        $(".asset-coupon").eq(index).addClass("asset-show").siblings("div").removeClass("asset-show");
    });

    // 返回
    PUR.pageBack();

    // 去顶部
    PUR.goTop();

    // alert模拟框
    $(document).on("click", function() {
        // alert(11);
        PUR.purAlert({
            test: "a-test",
            ok: function (){
                alert("不能关闭,因为返回了 false");
                return false;
            },
            okValue: "确定",
            cancel: true,
            fixed: false,
            timeout: 5000,
            lock: true,
            content: "<h2>5秒后自动关闭 <input type='text'/></h2>",
            title: "对话框"
        });
    });
});




