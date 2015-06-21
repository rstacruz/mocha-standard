'use strict'

const path = require('path')

module.exports = function (done) {
  const standard = require('standard')
  const options = getOptions()

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
  const pkg = require(path.join(process.cwd(), 'package.json'))
  const params = pkg.standard && pkg.standard || {}
  return params
}

/*
 * returns an Error object from a standard `results` object.
 */

function errorify (res) {
  const cwd = process.cwd()
  const count = res.errorCount + res.warningCount
  const err = new Error('' + count + (count === 1 ? ' issue' : ' issues') + ' found:')
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
