/**
 * Created by jinwei on 2015/6/19.
 */

define(["zepto"], function($) {
    "use strict";

    /**
     * 搜索列表内容控制
     *
     */

    var viewSwitch = $$("view-switch"),
    // 默认图标;
        defaultIcon = ("icon-list-i"),
    // 默认显示内容;
        defaultCont = ("icon-list"),
        bigIcon = ("icon-list-big"),  // 大图图标
        bigCont = ("pro-big"),  // 大图内容
        twoIcon = ("icon-list-two"),  // 两个图标
        twoCont = ("top-product");  // 两个内容



    var flag = 1; // 默认显示列表
    var viewCont = ".view-switch-cont";
    // 切换列表显示方式
    //viewSwitch.addEventListener("click", function(e) {

    $(".view-switch").click(function() {

        if (flag === 1) {
            // 切换到两图
            $(this).addClass(twoIcon).removeClass(defaultIcon);
            $(viewCont).addClass(twoCont).removeClass(defaultCont);
            flag++;
        } else if (flag === 2) {
            // 切换到大图
            $(this).addClass(bigIcon).removeClass(twoIcon);
            $(viewCont).addClass(bigCont).removeClass(twoCont);
            flag++;
        } else if (flag === 3) {
            // 切换到默认列表
            $(this).addClass(defaultIcon).removeClass(bigIcon);
            $(viewCont).addClass(defaultCont).removeClass(bigCont);
            flag = 1;
        }
    });

    //}, false);

    // class选择器
    function $$(selector) {
        return document.getElementsByClassName(selector)[0];
    }

    // 综合排序show hide
    var comp = $(".comp");
    comp.click(function() {
        $(".comp-cont, .m-mask").toggle();
        $("html").toggleClass("html-unscrollable");
    });

    // 综合排序半透明
    $(".m-mask").click(function() {
        comp.click();
    });

    // 综合排序 item
    $(".sorts .sort").click(function() {
        var index = $(this).index();
        comp.click();
        console.log(index);
    });

    // 筛选
    var maskSift = $(".mask-sift");
    var siftPanel = $(".sift-panel");
    $(".icons-sift").on("click", function() {
        $("html").toggleClass("sift-move");
        maskSift.toggle();
        siftPanel.toggle();
    });

    // 筛选半透明
    maskSift.click(function() {
        maskSift.toggle();
        siftPanel.toggle();
        $("html").toggleClass("sift-move");
    });

    // 有货
    $(".p-have").click(function() {
        $(this).toggleClass("h-selected");
    });
});