// Generated on 2015-06-01 using
// purCotton-webapp 0.0.1
module.exports = function (grunt) {
    'use strict';

    // 时间进度条
    require("time-grunt")(grunt);

    // 自动载入grunt任务
    require("load-grunt-tasks")(grunt);


    var config = {
        app: "app",
        dist: "dist"
    };

    grunt.initConfig({
        config: config,

        //读取 包名
        pkg: grunt.file.readJSON("package.json"),

        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        "./dist",
                        '<%= config.dist %>*//*',
                        '!<%= config.dist %>/.git*'
                    ]
                }]
            },
            server: '.tmp'
        },

        htmlmin: {
            dist: {
                options: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    removeAttributeQuotes: true,
                    removeCommentsFromCDATA: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= config.dist %>',
                    //src: '{,*//*}*.html',
                    src: 'app/static/*.html',
                    dest: '<%= config.dist %>/static'
                }]
            },

            activity: {

                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/activity',
                    src: '{,*//*}*.html',
                    dest: '<%= config.dist %>/activity/'
                }]
            }
        },

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            bower: {
                files: ['bower.json'],
                tasks: ['wiredep']
            },
            js: {
                files: [
                    //'<%= config.app %>/scripts/{,*//*}*.js',
                    "<%= config.app %>/**/*"
                ],
                //tasks: ['jshint', "csslint", "htmllint"],
                tasks: ['jshint', "csslint", "htmllint"],
                options: {
                    livereload: true
                }
            }
        },


        // 开启静态服务器 The actual grunt server settings
        connect: {
            options: {
                port: 9000,
                open: true,
                livereload: 35729,
                // Change this to '0.0.0.0' to access the server from outside
                hostname: '172.16.80.54'
                //hostname: "localhost"
            },
            livereload: {
                options: {
                    middleware: function(connect) {
                        console.log("1111:Away");
                        return [
                            connect.static('.tmp'),
                            connect().use('/bower_components', connect.static('./bower_components')),
                            connect.static(config.app)
                        ];
                    }
                }
            }
        },

        // 代码质量检查 Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                //"<%= config.app %>/js/**/*",
                '<%= config.app %>/js/{,*!//!*}*.js',
                '<%= config.app %>/js/user/{,*!//!*}*.js'
                //'!<%= config.app %>/scripts/vendor*!//!*',
                //'test/spec/{,*!//!*}*.js'
            ]
        },


        // 加前缀
        postcss: {
            options: {
               // map: true, // inline sourcemaps

                // or
                map: {
                    inline: false, // save all sourcemaps as separate files...
                    annotation: 'dist/maps/' // ...to the specified directory
                },

                processors: [
                    require('pixrem')(), // add fallbacks for rem units
                    require('autoprefixer-core')({browsers: 'last 50 versions'}), // add vendor prefixes
                    require('cssnano')() // minify the result
                ]
            },
            dist: {
                src: 'test/css/demo.css',
                dest: "dist/demo-min.css"
            }
        },

        // CSS验证
        csslint: {
            options: {
                csslintrc: '.csslintrc'
            },

            lax: {
                options: {
                    import: false
                },
                src: ['<%= config.app %>/css/member.css']
            }

        },

        // HTML验证
        htmllint: {
            all: ["<%= config.app %>/static/sales_promotion.html", "tests/**/*.html"]
        },

        // Copies remaining files to places other tasks can use
        // 复制剩余文件去的地方 其他任务可以使用
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= config.app %>',
                    dest: '<%= config.dist %>',
                    src: [
                        '*.{ico,png,txt}',
                        'images/{,*//*}*.webp',
                        '{,*//*}*.html',
                        'css/{,*//*}*.*'
                    ]
                }, {
                    src: 'node_modules/apache-server-configs/dist/.htaccess',
                    dest: '<%= config.dist %>/.htaccess'
                }, {
                    expand: true,
                    dot: true,
                    cwd: 'bower_components/bootstrap/dist',
                    src: 'fonts*//*',
                    dest: '<%= config.dist %>'
                }]
            },
            styles: {
                expand: true,
                dot: true,
                cwd: '<%= config.app %>/css',
                dest: '<%= config.dist %>/css/',
                src: '{,*//*}*.css'
            }
        },

        // The following *-min tasks produce minified files in the dist folder
        imagemin: {
            options: {                       // Target options
                optimizationLevel: 3
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/images',
                    src: '{,*//*}*.{gif,jpeg,jpg,png}',
                    dest: '<%= config.dist %>/images'
                }]
            },
            activity: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/activity/images',
                    src: '{,*//*}*.{gif,jpeg,jpg,png}',
                    dest: '<%= config.dist %>/activity/images'
                }]
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        /**
         * 读取HTML的usemin模块使自动的生成concat、压缩和校对文件。
         * 在内存中创建的配置，以便其他任务可以对它们进行操作
         */
        useminPrepare: {
            options: {
                dest: '<%= config.dist %>'
            },
            html: '<%= config.app %>/index.html'
        },

        // Performs rewrites based on rev and the useminPrepare configuration
        usemin: {
            options: {
                assetsDirs: [
                    '<%= config.dist %>',
                    '<%= config.dist %>/images',
                    '<%= config.dist %>/styles'
                ]
            },
            html: ['<%= config.dist %>/{,*//*}*.html'],
            css: ['<%= config.dist %>/styles/{,*//*}*.css']
        },

        // Run some tasks in parallel to speed up build process
        // 运行某些任务并行，加快构建过程
        concurrent: {
            server: [
                'copy:styles'
            ],
            test: [
                'copy:styles'
            ],
            dist: [
                'copy:styles',
                'imagemin'
            ]
        },

        concat: {
            dist: {}
        },

        // 压缩css
        cssmin: {
            options: {
                //keepSpecialComments: 0, //删除特殊的注释, 不建议设置。 设置后可能会出现大面积的乱码
                banner:  '/*!away-258246377@qq.com <%= pkg.name %>-<%= grunt.template.today("yyyy-mm-dd HH:MM:ss TT")%>*/'
            },

            minify: {
                expand: true,
                cwd: '<%= config.app %>/css/',
                src: ['*.css', '!*.min.css'],
                dest: 'dist/css',
                ext: '.css'
            }

        },

        uglify: {
            options: {
                banner: '/*<%= pkg.name %><%= grunt.template.today("yyyy-mm-dd HH:MM:ss TT")%>*/\n',
                footer:  '\n/*! <%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %> footer*/'
            },
            requirejs:  {
                src: '<%= config.app %>/bower_components/requirejs/require.js',
                dest: '<%= config.dist %>/bower_components/requirejs/require.js'
            },
//           buildC: {
//               files: {
//                   '<%= paths.dist %>/js/ht_common.min.js': '<%= paths.js %>/ht_common.js'
//               }
//           },


            compresAllJS: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>',
                    src: 'js/{,*//*}*.js',
                    dest: 'dist/'
                }]
            }
        },


        requirejs: {
            //compile: {
            //    "options": {
            //        "baseUrl": "./src/",
            //        "name": 'testName',
            //        "paths": {
            //            "test": "Test01",
            //            "test2": "Test02"
            //        },
            //        "include": [
            //            "test",
            //            "test2"
            //        ],
            //        "out": "./dist/allLibs.js"
            //    }
            //}

            compile: {
                options: {
                    //"name":  './main_page',
                    //"name":  ['main_detail.js', 'main_page.js','main_user.js'],
                    // mainConfigFile: "main_page",
                    appDir: './app/js/',   // 复制压缩项目根目录里的文件
                    baseUrl: "./",
                    dir: './dist/js',  //输出目录，全部文件打包后要放入的文件夹（如果没有会自动新建的）

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

                    //include: [
                    //    "zepto", "bdTouch", "common", "swipeSlide", "touchSlide"
                    //],

                   // appDir: './app',   //项目根目录
                   // out: './dist/main_page.js',  //输出目录，全部文件打包后要放入的文件夹（如果没有会自动新建的）
                    //mainConfigFile: "./build.js",
                    //name: "app/js/main_page", // assumes a production build using almond
                    //out: "./dist"
                }
            }
        }




    });

    grunt.registerTask("autocss", [ "clean", "postcss"]);

    grunt.registerTask('build', [
        //"clean",
        "htmlmin:dist",
        'imagemin:dist'
    ]);

    // 活动专题压缩
    grunt.registerTask("topic", [
        "clean",
        "htmlmin:activity",
        "imagemin:activity"
    ]);


    grunt.registerTask('build', [
        'clean:dist',
        'useminPrepare',
        'concurrent:dist',
        'concat',
        'cssmin',
        "uglify:requirejs",
        "requirejs",
         'copy:dist',

        //'uglify',
        //'rev',
        //'usemin',
        //'htmlmin'
    ]);

    grunt.registerTask('default', [
        'newer:jshint',
        'test',
        'build'
    ]);

    // 实时监控自动刷新
    grunt.registerTask("live", ["connect", "watch"]);

};
