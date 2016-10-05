module.exports = (grunt) ->
    grunt.initConfig
        pkg: grunt.file.readJSON 'package.json'

        copy:
            www:
                cwd: 'src'
                src: ['**', '!**/*.coffee']
                dest: 'www'
                expand: true

        clean:
            www:
                src: ['www']

        cordovacli:
            options:
                path: "."
                cli: "cordova"
            add_platforms:
                options:
                    command: 'platform'
                    action: 'add'
                    platforms: ['android', 'browser']
            add_plugins:
                options:
                    command: 'plugin'
                    action: 'add'
                    plugins: [
                        'contacts'
                    ]
            build_android:
                options:
                    command: 'build'
                    platforms: ['android']
            build_browser:
                options:
                    command: 'build'
                    platforms: ['browser']
            run_browser:
                options:
                    command: 'run'
                    platforms: ['browser']

        coffee:
            build:
                options:
                    bare: true
                    sourceMap: true
                expand: true
                cwd: 'src'
                src: ['**/*.coffee', '!js/vendor/**']
                dest: 'www'
                ext: '.js'

        requirejs:
            compile:
                options:
                    baseUrl: "lib/client/js"
                    mainConfigFile: "lib/client/js/require.config.js"
                    generateSourceMaps: true
                    include: [ "application" ]
                    out: "built.js"
                    packages: [
                            name: "dexie"
                            location: "vendor/dexie"
                            main: "dist/dexie"
                        ,
                            name: "domReady"
                            location: "vendor/domReady"
                            main: "domReady"
                        ,
                            name: "jquery"
                            location: "vendor/jquery"
                            main: "dist/jquery"
                        ,
                            name: "lodash"
                            location: "vendor/lodash"
                            main: "lodash"
                        ,
                            name: "materialize"
                            location: "vendor/materialize"
                            main: "dist/js/materialize"
                        ,
                            name: "moment"
                            location: "vendor/moment"
                            main: "moment"
                        ,
                            name: "q"
                            location: "vendor/q"
                            main: "q"
                        ,
                            name: "rivets"
                            location: "vendor/rivets"
                            main: "dist/rivets"
                        ,
                            name: "sightglass"
                            location: "vendor/sightglass"
                            main: "index"
                        ,
                            name: "sw-toolbox"
                            location: "vendor/sw-toolbox"
                            main: "sw-toolbox"
                        ,
                            name: "text"
                            location: "vendor/text"
                            main: "text"
                        ,
                            name: "url-pattern"
                            location: "vendor/url-pattern"
                            main: "lib/url-pattern"
                        ]
                    shim:
                        "materialize":
                            deps: [ "jquery" ]


    grunt.loadNpmTasks 'grunt-contrib-copy'
    grunt.loadNpmTasks 'grunt-contrib-clean'
    grunt.loadNpmTasks 'grunt-cordovacli'
    grunt.loadNpmTasks 'grunt-contrib-requirejs'
    grunt.loadNpmTasks 'grunt-contrib-coffee'

    grunt.registerTask 'scripts', ['coffee:build']
    grunt.registerTask 'build', ['clean:www', 'copy:www', 'scripts']

    grunt.registerTask 'debugInBrowser', 'Builds the Cordova app for the browser and opens it', ['build', 'cordovacli:run_browser']

    grunt.registerTask 'prepare', 'Prepares the cordova app for building', ['cordovacli:add_platforms', 'cordovacli:add_plugins']
