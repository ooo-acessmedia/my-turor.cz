'use strict';
module.exports = function (grunt) {
    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);

    var deployServer = 'u460049.ftp.masterhost.ru',
        deployFolder = 'my-tutor.cz',
        liveReloadFolder = 'http://my-tutor.cz/';

    grunt.initConfig({

        //ts: {
        //
        //    options: {
        //        compile: true,                 // perform compilation. [true (default) | false]
        //        comments: false,               // same as !removeComments. [true | false (default)]
        //        target: 'es5',                 // target javascript language. [es3 | es5 (grunt-ts default) | es6]
        //        module: 'amd',                 // target javascript module style. [amd (default) | commonjs]
        //        sourceMap: true,               // generate a source map for every output js file. [true (default) | false]
        //        sourceRoot: 'assets/templates/typescript/',                // where to locate TypeScript files. [(default) '' == source ts location]
        //        mapRoot: 'assets/templates/typescript/',                   // where to locate .map.js files. [(default) '' == generated js location.]
        //        declaration: false,            // generate a declaration .d.ts file for every output js file. [true | false (default)]
        //        htmlModuleTemplate: 'My.Module.<%= filename %>',    // Template for module name for generated ts from html files [(default) '<%= filename %>']
        //        htmlVarTemplate: '<%= ext %>',                      // Template for variable name used in generated ts from html files [(default) '<%= ext %>]
        //        noImplicitAny: false,          // set to true to pass --noImplicitAny to the compiler. [true | false (default)]
        //        fast: "watch"                  // see https://github.com/TypeStrong/grunt-ts/blob/master/docs/fast.md ["watch" (default) | "always" | "never"]
        //    },
        //    dev: {
        //        files: {
        //            src: 'assets/templates/typescript/main.ts',
        //            out: 'assets/templates/js/main.js'
        //        },
        //        options: {
        //            module: 'commonjs'
        //        }
        //    }
        //},

        typescript: {
            base: {
                src: ['assets/templates/typescript/*.ts'],
                dest: 'assets/templates/js/',
                options: {
                    module: 'commonjs', //or commonjs
                    target: 'es5', //or es3
                    rootDir: 'assets/templates/typescript/',
                    sourceMap: false,
                    declaration: false
                }
            }
        },


        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'assets/templates/css',
                    src: ['assets/templates/main.css'],
                    dest: 'assets/templates/main.css',
                    ext: '.css'
                }]
            },
            options: {
                keepSpecialComments: 0
            }
        },

        less: {
            develop: {
                options: {
                    paths: ['assets/templates'],
                    relativeUrls: true,
                    modifyVars: {}
                },
                files: {
                    'assets/templates/css/main.css': 'assets/templates/less/main.less'
                }
            },

            production: {
                options: {
                    paths: ['assets/templates'],
                    relativeUrls: true,
                    plugins: [
                        (new (require('less-plugin-clean-css'))({}))
                    ],
                    modifyVars: {}
                },
                files: {
                    'assets/templates/css/main.css': 'assets/templates/less/main.less'
                }
            }
        },

        'ftp-deploy': {
            css: {
                auth: {
                    host: deployServer,
                    port: 21,
                    authKey: 'key1'
                },
                src: 'assets/templates/css/',
                dest: deployFolder + '/www/assets/templates/css/',
                exclusions: ['assets/templates/css/owl.min.less', 'assets/templates/css/fancybox.min.less',
                    'assets/templates/css/bootstrap.min.less', 'assets/templates/css/boilerplate.min.less']
            },

            js: {
                auth: {
                    host: deployServer,
                    port: 21,
                    authKey: 'key1'
                },
                src: 'assets/templates/js/',
                dest: deployFolder + '/www/assets/templates/js/',
                exclusions: ['jquery.fancybox.min.js', 'jquery-1.12.0.min.js', 'owl.carousel.min.js']

            },

            images: {
                auth: {
                    host: deployServer,
                    port: 21,
                    authKey: 'key1'
                },
                src: 'assets/templates/img/',
                dest: deployFolder + '/www/assets/templates/img/'
            },

            'js-minishop': {
                auth: {
                    host: deployServer,
                    port: 21,
                    authKey: 'key1'
                },
                src: 'assets/components/minishop2/js/web/',
                dest: deployFolder + '/www/assets/components/minishop2/js/web/'
            }

        },

        uglify: {
            simple: {
                files: {
                    'assets/templates/js/main.min.js': ['assets/templates/js/main.js']
                }
            },

            production: {
                files: {
                    'assets/templates/js/main.min.js': ['assets/templates/js/main.js'],
                    'assets/templates/js/ajaxform.js': ['assets/templates/js/ajaxform.js'],
                    'assets/components/minishop2/js/web/default.js': 'assets/components/minishop2/js/web/default.js'
                }
            }
        },

        imagemin: {
            dynamic: {
                options: {
                    optimizationLevel: 3
                },

                files: [{
                    expand: true,
                    cwd: 'assets/templates/img',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'assets/templates/img'

                }]
            }
        },

        autoprefixer: {
            options: {
                browsers: ['last 3 versions', 'ie 10']
            },
            dist: {
                files: {
                    'assets/templates/css/main.css': 'assets/templates/css/main.css'
                }
            }
        },

        watch: {
            css: {
                files: ['assets/templates/less/**/*.less'],
                tasks: ['less:develop', 'autoprefixer', 'ftp-deploy:css'],
                options: {
                    spawn: false,
                    livereload: {
                        host: liveReloadFolder
                    }
                }
            },

            ts: {
                files: ['assets/templates/typescript/main.ts'],
                tasks: ['typescript', 'ftp-deploy:js'],
                options: {
                    spawn: false,
                    livereload: {
                        host: liveReloadFolder
                    }
                }
            },

            'grunt-js': {
                files: ['gruntfile.js'],
                tasks: ['watch'],
                options: {
                    spawn: false,
                    livereload: {
                        host: liveReloadFolder
                    }
                }
            }
        }
    });

    grunt.registerTask('default', ['watch']);

    // Production
    grunt.registerTask('production', ['uglify:production', 'ftp-deploy:js', 'less:production', 'ftp-deploy:css',
        'imagemin', 'ftp-deploy:images']);

    // Production without images
    grunt.registerTask('production-wimages', ['uglify:production', 'ftp-deploy:js', 'less:production',
        'ftp-deploy:css']);

    // Production for minishop2
    grunt.registerTask('production-minishop', ['uglify:production', 'ftp-deploy:js', 'ftp-deploy:js-minishop',
        'less:production', 'ftp-deploy:css', 'imagemin', 'ftp-deploy:images']);

};
