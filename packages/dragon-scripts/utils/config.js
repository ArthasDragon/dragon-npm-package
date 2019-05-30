const fs = require('fs-extra')
const {__config} = require('./paths')()

module.exports = () => {
  let dragonConfig = require('../dragon.config')

  if (fs.pathExistsSync(__config)) {
    dragonConfig = Object.assign(dragonConfig, require(__config))
  }

  return dragonConfig
}
