# mocha-standard

**Integrates [standard] into your mocha tests.** This allows you to enforce a "one true" JavaScript coding style in your project via Mocha tests.

This offers a finer alterantive to adding *standard* into package.json's `scripts.test` block.

* Runs in the same node process as mocha, removing maybe 500ms of startup time.
* Use `mocha --watch` to recheck for style failures. `standard` is used programatically, removing a huge overhead (around 1500ms) in re-running it repeatedly with `--watch`.
* Painlessly integrate standard into your travisci.org tests.

(Your speed gains may be a bit different from my Pentium II, of course.)

![](https://raw.githubusercontent.com/rstacruz/mocha-standard/gh-pages/screenshot.png)

[![Status](http://img.shields.io/travis/rstacruz/mocha-standard/master.svg)](https://travis-ci.org/rstacruz/mocha-standard/ "See test builds")

<br>

## Usage

Add this test file to your Mocha suite:

```js
/* test/standard_test.js */
it('conforms to standard', require('mocha-standard'))
```

<br>

## Installation

```sh
npm install --save-dev mocha-standard standard
```

[standard]: https://www.npmjs.com/package/standard
