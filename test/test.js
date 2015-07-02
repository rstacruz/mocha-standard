/* global it, beforeEach, afterEach, describe */
/* jshint expr: true */

var ms = require('../index')
var standard = require('standard')
var expect = require('chai').expect

beforeEach(function () {
  this.sinon = require('sinon').sandbox.create()
})

afterEach(function () {
  this.sinon.restore()
})

describe('actually running it:', function () {
  it('fails in this project', function (next) {
    ms(function (err) {
      expect(err).not.to.be.undefined
      expect(err.message).match(/issues? found:/)
      expect(err.stack).include('Extra semicolon. (semi)')
      expect(err.stack).include('test/fixtures/error.js:1:26')
      next()
    })
  })

  it('works', ms.files([ 'index.js' ]))
})

describe('in a mocked environment:', function () {
  beforeEach(function () {
    this.sinon.stub(require('standard'), 'lintFiles')
  })

  it('works', function () {
    ms()
    expect(standard.lintFiles.calledOnce).eq(true)
  })

  it('.files()', function () {
    ms.files(['index.js'])()
    var call = standard.lintFiles.firstCall
    expect(call.args[0]).eql(['index.js'])
  })

  it('.files() with string', function () {
    ms.files('index.js')()
    var call = standard.lintFiles.firstCall
    expect(call.args[0]).eql(['index.js'])
  })

  it('.files() with options', function () {
    ms.files('index.js', { x: true })()
    var call = standard.lintFiles.firstCall
    expect(call.args[0]).eql(['index.js'])
    expect(call.args[1]).eql({ x: true })
  })
})
