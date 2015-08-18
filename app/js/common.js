/**
 * Created by jinwei-258246377@qq.com on 2015/7/3.
 */
requirejs.config({
    baseUrl: "../js",
    urlArgs: "bust=" +  (new Date()).getTime(), // 防止缓存,开发需要
    paths: {
        "zepto": "../bower_components/zepto/zepto",
        // 百度手势事件
        "bdTouch": "../bower_components/touchjs/dist/touch-0.2.14"
},
    shim: {
        "zepto": {
            exports: "$"
        }
    }
});

define(function (require, exports, module) {
    var $ = require("zepto");
    var dMask = ".d-mask";

    var dialog = require("./dialog/dialog");
    var touch = require("bdTouch");

    return {

        // 半透明遮罩
        mask: function () {
            var high = document.documentElement.scrollHeight,
                mask = '<div class="d-mask"></div>';

            $(dMask).remove();
            $("body").append(mask);
            $(dMask).css("height", high);
        },

        /**
         * 移除遮罩 相关图层
         * @param {string} ele - 选择器
         */
        maskRemove: function (ele) {
            $(dMask).remove();
            if ($(ele) && $(ele).length > 0) {
                $(ele).remove();
            }
        },

        // 返回上一页
        pageBack: function () {
            $("body").on("click", ".back-bla", function () {
                alert(44);
                // return;
                var a = window.location.href;
                if (/#top/.test(a)) {
                    window.history.go(-2);
                    // window.location.load(window.location.href);
                } else {
                    window.history.back();
                    //window.location.load(window.location.href);
                }
            });

        },

        // 返回顶部
        goTop: function () {

            var htmlTxt = "";
            htmlTxt += "<div class=\"pt-gotop\">";
            htmlTxt += "    <a href=\"#top\" title=\"回到顶部\">";
            htmlTxt += "       回到顶部";
            htmlTxt += "    <\/a>";
            htmlTxt += "<\/div>";

            var top = (".pt-gotop");
            var top2 = "top2";
            var scrollTop,
                clientHigh;

            $(top).remove();
            $("body").append(htmlTxt);
            $(top).hide();
            $(top).on("click", function () {
                $(top).hide();
                $(window).scrollTop(0);
            });


            $(window).scroll(function () {

                scrollTop = window.scrollY;
                clientHigh = $(window).height();

                // 在页面底部
                /*if(   $(document).height()-$(window).height() == window.scrollY ) {
                 $(".pt-gotop").addClass(top2).show().css('bottom', '8rem');
                 return false;
                 }*/

                if (scrollTop >= 100) {
                    $(".pt-gotop").addClass(top2).show();
                } else {
                    $(".pt-gotop").removeClass(top2).hide();
                }


            });

        },

        purAlert: function (obj) {

            dialog(obj);
        },

        // 加载中
        loading: function () {
            $(".loading").remove();
            var _html = '<div class="loading">加载中... </div>';
            $("body").append(_html);
        }
    };


});