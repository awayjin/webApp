/*
 * 疑问：
 *  1. e.stopPropagation() 调用时不用写兼容性
 *
 *
 * */

define(function (require) {

    /**
     * js基础库
     * @param {object} selector
     *
     */

    // jQuery选择器

    var $ = function (selector) {

        return new $.fn.constructor(selector);
    };


    $.fn = $.prototype = {
        constructor: function (selector) {

            if (typeof selector === "string") {
                var
                // ?:非获取匹配 匹配Class
                    pattern = /(?:\.([\w-]+))/,
                    classEle = "",
                    matches,
                    i;

                matches = pattern.exec(selector);
                // Class
                if (matches[1]) {
                    classEle = this.getClass(matches[1]);

                    if (classEle) {
                        for (i=0; i<classEle.length; i++) {
                            this[i] = classEle[i];
                        }
                    }

                    return this;
                }
            }

            this[0] = selector;
            return this;
        },

        show: function () {
            this.css("display", "block");
            return this;
        },

        hide: function () {
            this.css("display", "none")
        },

        /*
         * css方法
         * @param {string} name - css样式属性名
         * @param {string | number} value - css样式属性值
         *
         * */
        css: function (name, value) {
            var ele = this[0], camel, i;
            if (typeof name === "string") {
                ele.style[name] = value;
            } else if (name instanceof Object) {
                for (i in name) {
                    camel = $.camelCase(i);
                    ele.style[camel] = name[i];
                }
            }

            return this;
        },

        html: function (content) {
            if (content !== "") {
                this[0].innerHTML = content;
            } else {
                this[0].innerHTML = content;
            }
            return this;
        },

        // Class选择器
        getClass: function (className) {
            if (document.getElementsByClassName) {
                return document.getElementsByClassName(className);
            } else {
                var arr = [],
                    els = document.getElementsByTagName("*"),
                    sim, j, i;
                for ( i=0; i<els.length; i++) {
                    sim = els[i].className.split(" ");
                    for( j=0; j< sim.length; j++) {
                        if( sim[j] === className ) {
                            arr.push(els[i]);
                        }

                    }
                }
                return arr;
            }
        },

        // 删除当前节点
        remove: function () {
            var ele = this[0];
            ele.parentNode && ele.parentNode.removeChild(ele);
            return this;
        },

        /**
         * 添加事件监听.
         * @param {string} type 事件类型
         * @param {Function} callback  监听函数
         */
        bind: function (type, callback) {
            var that = this[0];

            // 两个对象以上遍历
            if (this[1]) {
                for (var i in this) {
                    var num = parseInt(i);
                    if (!isNaN(num)) {
                        // ele = this[i];
                        // number.push(n)
                        addEvent(this[i])
                    }
                }
            } else {
                addEvent();
            }

            function addEvent (selecotr) {
                var ele = selecotr || that;
                if (ele.addEventListener) {
                    //ele.addEventListener(type, callback, false);
                    //ele.addEventListener(type, function (e) {
                    //    alert(111111)
                    //callback.call(ele, $(e));
                    //}, false);

                    ele.addEventListener(type, function (e) {
                        callback.call(ele, e);
                    }, false);

                } else if (ele.attachEvent) {
                    // 解决 IE8 以下this指向问题
                    ele.attachEvent("on" + type, function (e) {
                        callback.call(ele, $(window.event));
                    });

                }
            }


            return this;
        },

        event: function (ev) {
            return ev || window.event
        },

        // 阻止事件冒泡
        stopPropagation: function () {
            var e = this.event();
            if (event.stopPropagation) {
                event.stopPropagation()
            } else {
                window.event.cancelBubble = true
            }
            return this;
        },

        // 阻止默认事件行为的触发
        preventDefault: function () {
            var e = this.event();
            if (e.preventDefault) {
                e.preventDefault()
            } else {
                window.event.returnValue = false
            }
            return this;
        }
    };

    $.fn.constructor.prototype = $.fn;



    // 基本类型检测
    $.type = function (obj) {
        var class2type = {}, // 存放各类型的 [object NativeConstructorName]
            toString = class2type.toString,
        // 可检测是否布尔值 数值 字符串 函数 数组 日期 正则 对象字面量 错误类型
            objType = "Boolean Number String Function Array Date RegExp Object Error Symbol",
            arr = objType.split(" "), // 把objType变成数组
            i; // arr数组的下标

        for (i in arr) {
            class2type["[object" + " " + arr[i] + "]"] = arr[i].toLowerCase();
        }

        // 这为了检测null,因为typeof null是object
        if (obj == null) {
            return obj + ""; // 这里必须要加一个"",才能返回字符
        }

        return typeof obj === "function" || typeof obj === "object" ?
            class2type[ toString.call(obj) ] :
            typeof obj;
    };

    // 函数检测
    $.isFunction = function (obj) {
        return $.type(obj) === "function";
    };

    // 数组检测
    $.isArray = function (arr) {
        return $.type(arr)  === "array";
    };

    // 转换为驼峰形式
    $.camelCase = function (string) {
        var
            msPrefix = /-ms-/ig,
            dashAlpha = /-([\da-z])/ig,
            fcamelCase = function (match, letter) {
                // 返回dashAlpha ()里的内容
                return letter.toUpperCase();
            }
        // IE是msTransform 标准是WebkitTransform
        return string.replace(msPrefix, "ms-").replace(dashAlpha, fcamelCase);

    };

    // 检查页面是否有重复id
    function isRepeatId(){
        var eles = document.getElementsByTagName("*");
        var arr = []; // 重复id数组
        var obj = {};
        var id = ''; // 重复id

        for (var i=0; i<eles.length; i++) {
            id = eles[i].id;
            if (id) {
                // arr.push(id);
                if ( obj[id] ) {
                    console.log("重复id:", id, ", 第一个元素位置:" + obj[id], ", 重复元素位置:" + i);
                    arr.push(id);
                } else {
                    obj[id] = i;
                }
            }

        }

        console.log(arr);

    }

    // 数组去重
    function isRepeatArray(){

        var arr = [];
        var obj2 = {};
        var arr2 = ["a", 232, 22, "a", 11, 22, "a", "sdfsd", "d", 11, "d"];

        for (var i=0; i<arr2.length; i++) {
            if ( !obj2[arr2[i]] ) {
                arr.push(arr2[i]);
                obj2[arr2[i]] = true;
            }
        }
        return arr;
    }

    // console.log(isRepeatArray());

    return $;
});