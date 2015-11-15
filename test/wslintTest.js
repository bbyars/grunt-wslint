'use strict';

var assert = require('assert'),
    wslint = require('../tasks/lib/wslint');

describe('wslint', function () {
    describe('#noTrailingWhitespace', function () {
        it('should return no errors if no trailing whitespace', function () {
            var contents = 'First\nSecond\nThird';
            assert.deepEqual(wslint.noTrailingWhitespace('filename', contents), []);
        });

        it('should detect trailing spaces in one line', function () {
            var contents = 'First\nSecond  \nThird';
            assert.deepEqual(wslint.noTrailingWhitespace('filename', contents), [
                'filename:2 has trailing whitespace\n\t<<Second  >>'
            ]);
        });

        it('should detect trailing spaces in multiple lines', function () {
            var contents = 'First\nSecond  \nThird ';
            assert.deepEqual(wslint.noTrailingWhitespace('filename', contents), [
                'filename:2 has trailing whitespace\n\t<<Second  >>',
                'filename:3 has trailing whitespace\n\t<<Third >>'
            ]);
        });

        it('should detect trailing tabs', function () {
            var contents = 'First\nSecond\t\nThird';
            assert.deepEqual(wslint.noTrailingWhitespace('filename', contents), [
                'filename:2 has trailing whitespace\n\t<<Second\t>>'
            ]);
        });
    });

    describe('#noTabs', function () {
        it('should return no errors if no tabs', function () {
            var contents = 'First Line\nSecond Line\nThird Line';
            assert.deepEqual(wslint.noTabs('filename', contents), []);
        });

        it('should return tabs in one line', function () {
            var contents = 'First\tLine\nSecond Line\nThird Line';
            assert.deepEqual(wslint.noTabs('filename', contents), [
                'filename:1 has tabs\n\t<<First\tLine>>'
            ]);
        });

        it('should return tabs in multiple line', function () {
            var contents = 'First\tLine\nSecond Line\t\nThird Line';
            assert.deepEqual(wslint.noTabs('filename', contents), [
                'filename:1 has tabs\n\t<<First\tLine>>',
                'filename:2 has tabs\n\t<<Second Line\t>>'
            ]);
        });
    });

    describe('#trailingNewline', function () {
        it('should return no errors if a trailing newline exists', function () {
            var contents = 'Contents\n';
            assert.deepEqual(wslint.trailingNewline('filename', contents), []);
        });

        it('should return an error if no trailing newline exists', function () {
            var contents = 'Contents';
            assert.deepEqual(wslint.trailingNewline('filename', contents), [
                'filename has no trailing newline'
            ]);
        });

        it('should return no error if multiple trailing newlines exist', function () {
            var contents = 'Contents\n\n';
            assert.deepEqual(wslint.trailingNewline('filename', contents), []);
        });
    });

    describe('#noMultipleTrailingNewlines', function () {
        it('should return no errors if one trailing newline exists', function () {
            var contents = 'Contents\n';
            assert.deepEqual(wslint.noMultipleTrailingNewlines('filename', contents), []);
        });

        it('should return no error if no trailing newline exists', function () {
            var contents = 'Contents';
            assert.deepEqual(wslint.noMultipleTrailingNewlines('filename', contents), []);
        });

        it('should return an error if multiple trailing newlines exist', function () {
            var contents = 'Contents\n\n';
            assert.deepEqual(wslint.noMultipleTrailingNewlines('filename', contents), [
                'filename has more than one trailing newline'
            ]);
        });
    });
});
