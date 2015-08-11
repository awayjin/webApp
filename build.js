({
    appDir: './app',   //项目根目录
    dir: './dist',  //输出目录，全部文件打包后要放入的文件夹（如果没有会自动新建的）

    baseUrl: './js/',   //相对于appDir，代表要查找js文件的起始文件夹，下文所有文件路径的定义都是基于这个baseUrl的

    modules: [					  //要优化的模块
        { name:'main_detail'} ,{ name:'main_page'} ,
        { name:'main_user'}		//说白了就是各页面的入口文件，相对baseUrl的路径，也是省略后缀“.js”
    ],

    fileExclusionRegExp: /^(r|build)\.js|.*\.scss$/,	//过滤，匹配到的文件将不会被输出到输出目录去

    optimizeCss: 'standard',

    removeCombined: true,   //如果为true，将从输出目录中删除已合并的文件

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
    //	 ,shim:{ .....}	  //其实JQ和avalon都不是严格AMD模式，能shim一下最好了，不过这里咱省略
})



/*
({
    //appDir: "./",
    baseUrl:"./app/js/",
    // 仅优化单个模块及其依赖项
    name: "main",
    out: "./dist/main-built.js",
    optimize: "none"
})
*/


/*
define("one", [], function () {
    return 1
}), define("two", [], function () {
    return 2
}), define("three", [], function () {
    return 3
}), require(["one", "two", "three"], function (e, t, n) {
    alert(e + t + n)
}), define("main", function () {
});

*/
