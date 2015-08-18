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
        // 百度手势事件
        "bdTouch": "../bower_components/touchjs/dist/touch-0.2.14",
        "searchList": "./page_search"

    },
    shim: {
        "zepto": {
            exports: "$"
        }
    }
});


requirejs([
    "zepto",
    "common"
], function($, PUR) {
    "use strict";
    // DOM加载完成之后, 以便加载相应的所需模块
    $(function() {


        var _html = ''

        var doc = window.document,
            scrollHigh,
            clientHigh,
            scrollY;
        window.addEventListener("scroll", function() {
             scrollHigh = doc.documentElement.scrollHeight;
             clientHigh = doc.documentElement.clientHeight;
             scrollY = window.scrollY;
            if (scrollHigh - clientHigh === scrollY) {
                // $("<li><div class='loading'>loading...</div></li>").appendTo("#forLoading");
                PUR.loading();
                console.log("到底了");
                $.ajax({
                    url: "./tpl_product.html",
                    success: function(data) {
                         $(".loading").hide();
                        for (var i=0; i< 4; i++) {
                            $("#forLoading").append(data)
                        }
                    }
                });
            }
        });


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


});




