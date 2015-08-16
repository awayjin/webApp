/**
 * config配置文件
 *   zepto非AMD需要shim exports
 *
 */
requirejs.config({
    baseUrl: "../js",
    urlArgs: "bust=" +  (new Date()).getTime(), // 防止缓存,开发需要
    paths: {
//        "zepto": "../bower_components/zepto/zepto",
        "common": "./common",
        "slide": "./slide",
        "searchList": "./page-search",
        "swipeSlide": "./lib/swipeSlide.min",
        // 百度手势事件
        "bdTouch": "../bower_components/touchjs/dist/touch-0.2.14.min",
        "city": "./user/dist_pick"
    },
    shim: {
        "zepto": {
            exports: "$"
        },
        "swipeSlide": ["zepto"]
        //,"city": {
        //    exports: "citySelectComponent"
        //}
    }
});


requirejs(["common"], function(PUR) {

    // 返回
    PUR.pageBack();

    // DOM加载完成之后, 以便加载相应的所需模块
    $(function() {

        //
        $(".pro-delete").click(function() {
            alert(222);
            alert(33);
            console.log(44);
        });

        if ( $("#province").length > 0 ) {
            // 省市县联动
            requirejs(["city"], function (city) {
                city.initDist({
                    "provinceNo": "root-20",
                    "cityNo": "root-20-4",
                    "distNo": "root-20-1-2",
                    "urlProvince": "../js/user/province.json",
                    "urlCity": "../js/user/city.json",
                    "urlDist": "../js/user/district.json"
                });
            });

        }

    });

    // 支付方式
    $(".til").click(function() {
        $(this).siblings(".pay-info").toggle();
    });


   // 全选
    var checked = true,
        chcAll = ".mui-checkbox";
    $(".check-all .mui-checkbox").on("click", function() {
        if (checked) {
            $(chcAll).each(function(index, domEle) {
                $(this)[0].checked = true;
            });
            checked = false;

        } else {
            $(chcAll).each(function(index, domEle) {
                $(this)[0].checked = false;
            });
            checked = true;

        }
    });

    // 购物车加1
    var val = 1;
    $(".increase").on("click", function() {
        val = $(this).siblings(".num").attr("value");
        $(this).siblings(".num").attr("value", parseInt(val)+1);
    });

    // 减少1
    $(".decrease").on("click", function() {
        val = $(this).siblings(".num").attr("value");
        if (val > 1) {
            $(this).siblings(".num").attr("value", parseInt(val)-1);
        }

    });

    // 购物车数字验证
    $(".num").on("keyup", function() {
        console.log(1111);
    });



    // 发票显示
    $(".til").on("click", function() {
       $(this).siblings(".receipt").toggle();
    });



});


