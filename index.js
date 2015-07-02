module.exports = mochaStandard
mochaStandard.module = 'standard'

/*
 * Runs `standard.lintFiles`, and throws meaningful errors if it fails.
 * Typically used to plug into mocha's `it()`.
 */

function mochaStandard (done) {
  var standard = require(mochaStandard.module)

  var files = this.files || []
  var options = this.options || {}

  standard.lintFiles(files, options, function (err, res) {
    if (err) return done(err)
    if (res.errorCount === 0 && res.warningCount === 0) return done()
    done(errorify(res))
  })
}

/*
 * Changes `files` to be passed onto standard.lintFiles
 *
 *     it('is clean',
 *       require('mocha-standard').files([
 *         'index.js', 'test/*.js'
 *       ]))
 *
 * Or pass options:
 *
 *       require('mocha-standard').files('index.js', { ... })
 */

mochaStandard.files = function (files, options) {
  if (!Array.isArray(files)) files = [files]
  return this.bind({ files: files, options: options })
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
