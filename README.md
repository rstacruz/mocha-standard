# mocha-standard

**Integrates [standard] into your mocha tests.** This offers a finer alterantive to adding *standard* into package.json's `scripts.test` block.

* Runs in the same node process as mocha, removing maybe 500-1000ms of overhead in startup time.
* Use `mocha --watch` to recheck for style failures. `standard` is used programatically, removing a huge overhead in re-running it repeatedly with `--watch`.
* Painlessly integrate standard into your travisci.org tests.

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
