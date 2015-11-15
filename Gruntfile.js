'use strict';

var fs = require('fs'),
    thisPackage = require('./package.json'),
    version = process.env.WS_GRUNT_VERSION || thisPackage.version;

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        mochaTest: {
            options: {
                reporter: 'spec'
            },
            unit: {
                src: ['test/**/*.js']
            }
        },
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/**/*.js',
                'test/**/*.js'
            ],
            options: {
                node: true,
                globals: {
                    describe: false,
                    it: false,
                    before: false,
                    beforeEach: false,
                    after: false,
                    afterEach: false
                },
                newcap: false,
                camelcase: true,
                curly: true,
                eqeqeq: true,
                latedef: true,
                undef: true,
                unused: true,
                trailing: true,
                maxparams: 4,
                maxdepth: 3,
                maxcomplexity: 5
            }
        },
        wslint: {
            all: [
                'Gruntfile.js',
                'tasks/**/*.js',
                'test/**/*.js'
            ],
            options: {
                noTrailingWhitespace: true,
                noTabs: true,
                trailingNewline: true,
                noMultipleTrailingNewlines: true
            }
        }
    });

    grunt.loadTasks('tasks');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-mocha-test');

    grunt.registerTask('version', 'Set the version number', function () {
        var newPackage = require('./package.json');

        newPackage.version = version;
        console.log('Using version ' + version);
        fs.writeFileSync('./package.json', JSON.stringify(newPackage, null, 2) + '\n');
    });

    grunt.registerTask('default', ['wslint', 'jshint', 'version', 'mochaTest']);
};
