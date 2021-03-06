# mocha-standard

**Integrates [standard] into your mocha tests.** This allows you to enforce a "one true" JavaScript coding style in your project via Mocha tests.

----

![](https://raw.githubusercontent.com/rstacruz/mocha-standard/gh-pages/screenshot.png)

----

[![Status](http://img.shields.io/travis/rstacruz/mocha-standard/master.svg)](https://travis-ci.org/rstacruz/mocha-standard/ "See test builds")

<br>

## Features

This offers a finer alternative to adding *standard* into package.json's `scripts.test` block.

* Runs in the same node process as mocha, removing maybe 500ms of startup time.
* Use `mocha --watch` to recheck for style failures. `standard` is used programatically, removing a huge overhead (around 1500ms) in re-running it repeatedly with `--watch`.
* Painlessly integrate standard into your travisci.org tests.

(Your speed gains may be a bit different from my Pentium II, of course.)

<br>

## Usage

Install it:

```sh
npm install --save-dev mocha-standard standard
```

Then add this test file to your Mocha suite:

```js
/* test/standard_test.js */
it('conforms to standard', require('mocha-standard'))
```

To configure what files to consume:

```js
var standard = require('mocha-standard')

it('conforms to standard', standard.files([
  'index.js', 'test/*.js'
]))
```

<br>

## Timeouts

Since the first run of a standard test takes a while to execute (sometimes more than Mocha's default 2 second timeout), it'd be wise to change the timeout for your mocha-standard tests. You can do this using `this.timeout` inside a `describe()` block, or with `--timeout` in `mocha.opts`.

```js
describe('coding style', function () {
  this.timeout(5000)

  it('conforms to standard', require('mocha-standard'))
})
```

<br>

## Globals

To specify global variables, pass `{ global: [...] }` into `.files()`. This is especially useful for Mocha test files. (Be sure you're using standard 5.0.0 or above.)

```js
var standard = require('mocha-standard')

describe('coding style', function () {
  this.timeout(5000)

  it('lib conforms to standard', standard.files([
    '*.js',
    'lib/**/*.js'
  ]))

  it('tests conform to standard', standard.files([
    'test/**/*.js'
  ], {
    global: ['describe', 'it', 'before', 'beforeEach', 'after', 'afterEach', 'xdescribe', 'xit']
  }))
  })
```

<br>

## Semicolons

To use [semistandard] instead, use:

```sh
npm install --save-dev mocha-standard semistandard
```

```js
/* test/standard_test.js */
it('conforms to standard', require('mocha-standard/semistandard'))
```

[semistandard]: https://github.com/Flet/semistandard

<br>

## Thanks

**mocha-standard** © 2015+, Rico Sta. Cruz. Released under the [MIT] License.<br>
Authored and maintained by Rico Sta. Cruz with help from contributors ([list][contributors]).

> [ricostacruz.com](http://ricostacruz.com) &nbsp;&middot;&nbsp;
> GitHub [@rstacruz](https://github.com/rstacruz) &nbsp;&middot;&nbsp;
> Twitter [@rstacruz](https://twitter.com/rstacruz)

[MIT]: http://mit-license.org/
[contributors]: http://github.com/rstacruz/mocha-standard/contributors
[standard]: https://www.npmjs.com/package/standard
