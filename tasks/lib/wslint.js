'use strict';

var os = require('os');

function eolFor (contents) {
    // May not match os.EOL if e.g. git changes it
    var index = contents.indexOf('\n');
    if (index > 0) {
        if (contents.substring(index -1, index) === '\r') {
            return '\r\n';
        }
        else {
            return '\n';
        }
    }
    else {
        return os.EOL;
    }
}

function noTrailingWhitespace (file, contents) {
    var lines = contents.split(eolFor(contents)),
        errors = [];

    for (var i = 0; i < lines.length; i++) {
        if (/\s$/.test(lines[i])) {
            errors.push(file + ':' + (i + 1) + ' has trailing whitespace\n\t<<' + lines[i] + '>>');
        }
    }
    return errors;
}

function noTabs (file, contents) {
    var lines = contents.split(eolFor(contents)),
        errors = [];

    for (var i = 0; i < lines.length; i++) {
        if (/\t/.test(lines[i])) {
            errors.push(file + ':' + (i + 1) + ' has tabs\n\t<<' + lines[i] + '>>');
        }
    }
    return errors;
}

function trailingNewline (file, contents) {
    var errors = [];
    if (contents[contents.length-1] !== '\n') {
        errors.push(file + ' has no trailing newline');
    }
    return errors;
}

function noMultipleTrailingNewlines (file, contents) {
    var errors = [],
        doubleNewlines = eolFor(contents)  + eolFor(contents),
        endOfFile = contents.substring(contents.length - doubleNewlines.length, contents.length);
    if (endOfFile === doubleNewlines) {
        errors.push(file + ' has more than one trailing newline');
    }
    return errors;
}

module.exports = {
    noTrailingWhitespace: noTrailingWhitespace,
    noTabs: noTabs,
    trailingNewline: trailingNewline,
    noMultipleTrailingNewlines: noMultipleTrailingNewlines
};
