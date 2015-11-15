'use strict';

var fs = require('fs'),
    os = require('os'),
    wslint = require('./lib/wslint');

module.exports = function (grunt) {
    grunt.registerMultiTask('wslint', 'Check for whitespace problems that make diffing harder', function () {
        var options = this.options({
                noTrailingWhitespace: false,
                noTabs: false,
                trailingNewline: false,
                noMultipleTrailingNewlines: false
            }),
            enforcedOptions = Object.keys(options).filter(function (option) {
                return options[option] === true;
            }),
            errors = [];

        this.filesSrc.forEach(function (file) {
            var contents = fs.readFileSync(file, 'utf8');
            enforcedOptions.forEach(function (option) {
                errors = errors.concat(wslint[option](file, contents));
            });
        });

        if (errors.length > 0) {
            grunt.warn(errors.join(os.EOL));
        }
    });
};
