/**
 * Created by jinwei-258246377@qq.com on 2015/7/3.
 */

define(function(require, exports, module) {
    var $ = require("zepto");
    var dMask = ".d-mask";

    return {

       // 半透明遮罩
       mask: function() {
           var high = document.documentElement.scrollHeight,
               mask =  '<div class="d-mask"></div>';

           $(dMask).remove();
           $("body").append(mask);
           $(dMask).css("height", high);
       },

        /**
         * 移除遮罩 相关图层
         * @param {string} ele - 选择器
         */
       maskRemove: function(ele) {
            $(dMask).remove();
            if ($(ele) && $(ele).length > 0) {
                $(ele).remove();
            }
       },

       // 返回上一页
       pageBack: function() {
           $("body").on("click", ".back-bla", function() {
               var a = window.location.href;
               if (/#top/.test(a)) {
                   window.history.go( -2);
                   // window.location.load(window.location.href);
               } else {
                   window.history.back();
                   // window.location.load(window.location.href);
               }
           });

       }
   };
});