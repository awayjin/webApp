/**
 * Created by jinwei on 2015/7/2.
 */

define(function(require, exports, module) {
    var $ = require("zepto");
    var dMask = ".d-mask";

    return  {
        show: function() {
            var high = document.documentElement.scrollHeight,
                mask =  '<div class="d-mask"></div>';

            $(dMask).remove();
            $("body").append(mask);
            $(dMask).css("height", high);
        },

        /**
         * @param {string} ele - 选择器
         */
        remove: function(ele) {

            $(dMask).remove();
            if ($(ele) && $(ele).length > 0) {
                $(ele).remove();
            }

        }
    };

});