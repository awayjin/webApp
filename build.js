

// RequireJS配置
requirejs.config({
    baseUrl: '../js',//js文件载入基路径
    //enforceDefine: true,//enforceDefine用来强制模块使用define定义，否则可能会报No define call for ...之类错误
    paths: {
        ctrl: './models',
        libs:"./lib",
        'jquery':"./lib/jquery",
        "backbone":"./lib/backbone",
        'underscore':"./lib/underscore"
    } /*路徑別名*/
});

require(["ctrl/m1","jquery"], function (m1,$) {
    var view=new m1()
    $("html body").html(view.el)

});


// 新建built.js

({
    appDir:'./',
    baseUrl: './',
    dir:'./app-build',
    paths: {
        ctrl: './models',
        libs:"./lib",
        'jquery':"./lib/jquery",
        "backbone":"./lib/backbone",
        'underscore':"./lib/underscore"
    },
    modules:[{
        name:"./lib/main"
    }]
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
