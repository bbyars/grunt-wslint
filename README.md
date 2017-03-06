# grunt-mountebank

[![Greenkeeper badge](https://badges.greenkeeper.io/bbyars/grunt-wslint.svg)](https://greenkeeper.io/)

Linting for whitespace, to ensure consistency throughout the codebase and to make
diffing easier.

## Getting Started

This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out
the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains
how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as
install and use Grunt plugins. Once you're familiar with that process, you
may install this plugin with this command:

```shell
npm install grunt-wslint --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-wslint');
```

## Grunt Configuration

In your project's Gruntfile, add a section named `wslint` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  wslint: {
    all: [
      '**/*',
      '!node_modules/**/*',
      '!.git/**/*',
      '!.DS_Store',
      '!*.iml'
    ],
    options: {
      noTrailingWhitespace: true,
      noTabs: true,
      trailingNewline: true,
      noMultipleTrailingNewlines: true
    }
  },
});
```

The files source represented in `all` use the standard
[Grunt globbing patterns](http://gruntjs.com/configuring-tasks#globbing-patterns).  The example
above shows including all files except the ones listed.

All options are represented in the example above.  Leave an option off (or set it to false) to
avoid executing that option.  The options are as follows:

* `noTrailingWhitespace` - Disallow lines that end in whitespace
* `noTabs` - Disallow tabs
* `trailingNewline` - Require at least one trailing newline at the end of the file
* `noMultipleTrailingNewlines` - Disallow two or more trailing newlines at the end of the file
