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
        "searchList": "./page-search",
        "swipeSlide": "./lib/swipeSlide.min",
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

