const { __configs } = require('./paths')
const { pathExistsSync } = require('fs-extra')
const { error } = require('./tips')
const { resolve } = require('path')

module.exports = function(name) {
  if (!pathExistsSync(name)) {
    return ''
  }
  return require(resolve(__configs, name))
}
