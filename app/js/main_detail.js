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
        // 百度手势事件
        "bdTouch": "../bower_components/touchjs/dist/touch-0.2.14",
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
//requirejs(["bdTouch"]);

requirejs([
    "zepto",
    "common",
    "touchSlide",
    "bdTouch"
], function($, PUR, touch, bdTouch) {



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
        $(".top-tab a").on("tap", function() {
            var index = $(this).index();
            $(this).addClass("current").siblings("a").removeClass("current");
            $(this).parents(".page-detail").find(".top-hoc").eq(index).show().siblings(".top-hoc").hide();
        });

        // 详细tab
        $(".sub-title a").on("tap", function() {
            var index = $(this).index();
            $(this).addClass("s-cur").siblings("a").removeClass("s-cur");
            $(this).parents(".top-hoc").find(".sub-cont").eq(index).show().siblings(".sub-cont").hide();
        });

        // 规格
        $(".sku-title").on("tap", function() {
            $(this).find(".sku-content").toggle();
        });

        // 评价条数
        $(".comment-info").on("tap", function() {
            $(".top-tab a").eq(2).addClass("current").siblings("a").removeClass("current");
            $(".top-hoc").eq(2).show().siblings(".top-hoc").hide();
        });

       // 商品详细
        $(".detail-base-info").on("tap", function() {
            $(".top-tab a").eq(1).addClass("current").siblings("a").removeClass("current");
            $(".top-hoc").eq(1).show().siblings(".top-hoc").hide();
        });




        // 全屏大图显示
        $(".inner li").on("tap", function() {
            PUR.mask();
            var _this = $(this).clone(true),
                _wrap = ".sd-full-count" ;

            var imgs, i,
                focusFull = "#focusFull",
                _index = $(this).index();

            imgs = $(this).parents(".inner").find("ul li img").clone();

            // 大图模版滑动展示
            $.ajax({
                type: 'get',
                url: '../static/tpl_detail_pic.html',
                //dataType: 'html',
                timeout: 5000,
                asyns: false,
                success: function(data){
                    $(focusFull).html(data);
                    $(_wrap).find("ul").html("");

                    if (imgs.length == 1) {
                        $("<li>").append(imgs[0]).appendTo($(_wrap).find("ul"));
                    } else {
                        $(imgs).each(function(index, domEle) {
                            if (index !== 0 && index !== imgs.length -1 ) {
                                $("<li>").append(domEle).appendTo($(_wrap).find("ul"));
                            }
                        });
                    }
                    // 点击弹出的大图
                    touch({
                        slideCell:"#focusFull",
                        titCell:".hd ul", //开启自动分页 autoPage:true ，此时设置 titCell 为导航元素包裹层
                        mainCell:".bd ul",
                        effect:"left",
                        defaultIndex:  _index-1,
                        autoPlay: false,//自动播放
                        autoPage:true, //自动分页
                        switchLoad:"_src" //切换加载，真实图片路径为"_src"
                    });

                    $(".slide-full-wrap").show();


                    //$(".hd ul").find("li").eq(_index-1).addClass("on").siblings("li").removeClass("on");
                    //
                    //var liWidth = $(document).width();
                    //$(".bd ul").css({
                    //    "-webkit-transform": "translate(-"+liWidth*(_index-1)+"px, 0px) translateZ(0px)"
                    //});


                    // $(_wrap).find("ul").html("").html(ul)
                    $(".slide-full-wrap").show();

                },
                error: function(xhr, type){
                    $(".d-mask").hide();
                    alert('Ajax error!');
                }
            });

        });

        // 移除商品
        $("body").on("tap", ".slide-full-wrap, .d-mask", function() {
            PUR.maskRemove(".slide-full-wrap li");
        });

    });

    // 返回
    PUR.pageBack();


    // alert(!!(window.history && history.pushState));

});



