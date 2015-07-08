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
        "swipeSlide": "./lib/swipeSlide.min",
        // 遮罩
        "mask": "./mask",
        "touchSlide": "./lib/TouchSlide/TouchSlide.1.1"
    },
    shim: {
        "zepto": {
            exports: "$"
        },
        "swipeSlide": ["zepto"],
        "touchSlide":{
            exports: "TouchSlide"
        }
    }
});


requirejs([
    "zepto",
    "common",
    "touchSlide"
], function($, PUR, touch) {

    touch({
        slideCell:"#focusFull",
        titCell:".hd ul", //开启自动分页 autoPage:true ，此时设置 titCell 为导航元素包裹层
        mainCell:".bd ul",
        effect:"left",
        autoPlay: false,//自动播放
        autoPage:true, //自动分页
        switchLoad:"_src" //切换加载，真实图片路径为"_src"
    });

    // 详细页大图滑动
    //touch({
    //    slideCell:"#slide4",
    //    titCell:".hd ul", //开启自动分页 autoPage:true ，此时设置 titCell 为导航元素包裹层
    //    mainCell:".bd ul",
    //    effect:"left",
    //    autoPlay: false,//自动播放
    //    autoPage:true, //自动分页
    //    switchLoad:"_src" //切换加载，真实图片路径为"_src"
    //});

    // DOM加载完成之后, 以便加载相应的所需模块
    $(function() {


        // 详细页大图滑动
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

        // 顶部tab
        $(".top-tab a").click(function() {
            var index = $(this).index();
            $(this).addClass("current").siblings("a").removeClass("current");
            $(this).parents(".page-detail").find(".top-hoc").eq(index).show().siblings(".top-hoc").hide();
        });

        // 详细tab
        $(".sub-title a").click(function() {
            var index = $(this).index();
            $(this).addClass("s-cur").siblings("a").removeClass("s-cur");
            $(this).parents(".top-hoc").find(".sub-cont").eq(index).show().siblings(".sub-cont").hide();
        });

        // 规格
        $(".sku-title").click(function() {
            $(this).find(".sku-content").toggle();
        });

        // 评价条数
        $(".comment-info").click(function() {
            $(".top-tab a").eq(2).addClass("current").siblings("a").removeClass("current");
            $(".top-hoc").eq(2).show().siblings(".top-hoc").hide();
        });

       // 商品详细
        $(".detail-base-info").click(function() {
            $(".top-tab a").eq(1).addClass("current").siblings("a").removeClass("current");
            $(".top-hoc").eq(1).show().siblings(".top-hoc").hide();
        });


        // 返回
        $(".back-bla").click(function() {
            pageBack();
        });

        // 全屏大图展示
        $(".inner li").click(function() {
            PUR.mask();
            var _this = $(this).clone(true),
                _wrap = ".sd-full-count" ;

            var ul;

            ul = $(this).parents(".inner").find("ul li img").clone();

            console.log(ul, ul.length);


            $(_wrap).find("ul").html("").html(ul)
            $(".slide-full-wrap").show();
        });

        // 移除商品
        $("body").on("click", ".d-mask", function() {
            PUR.maskRemove(".slide-full-wrap");
        });

        $("body").on("click", ".slide-full-wrap li img", function() {
            PUR.maskRemove(".slide-full-wrap");
        });


    });





});

// 返回上一页
function pageBack() {
    var a = window.location.href;
    if (/#top/.test(a)) {
        window.history.go( -2);
       // window.location.load(window.location.href);
    } else {
        window.history.back();
       // window.location.load(window.location.href);
    }
}


