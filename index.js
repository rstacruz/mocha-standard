'use strict'

var path = require('path')

module.exports = mochaStandard
mochaStandard.module = 'standard'

function mochaStandard (done) {
  var standard = require(mochaStandard.module)
  var options = getOptions()

  standard.lintFiles(options.files || [], options, function (err, res) {
    if (err) return done(err)
    if (res.errorCount === 0 && res.warningCount === 0) return done()
    done(errorify(res))
  })
}

/*
 * return custom `standard` options in package.json.
 */

function getOptions () {
  var standard = mochaStandard.module
  var pkg = require(path.join(process.cwd(), 'package.json'))
  var params = pkg[standard] && pkg[standard] || {}
  return params
}

/*
 * returns an Error object from a standard `results` object.
 */

function errorify (res) {
  var cwd = process.cwd()
  var count = res.errorCount + res.warningCount
  var err = new Error('' + count + (count === 1 ? ' issue' : ' issues') + ' found:')
  err.stack = '' + err.message

  res.results.forEach(function (result) {
    result.messages.forEach(function (message) {
      err.stack += ('\n    ' +
        result.filePath.replace(cwd, '').replace(/^\//, '') +
        ':' + message.line + ':' + message.column + ': ' +
        message.message + ' (' + message.ruleId + ')')
    })
  })

  return err
}
