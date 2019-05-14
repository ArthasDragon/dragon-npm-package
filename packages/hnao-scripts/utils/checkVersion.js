const { shell } = require('execa')
const { error } = require('./tips')

const checkVersion = async function() {
  const { stdout } = await shell(`npm view hnao-cli version`)

  const cur_version = require('../package.json').version
  if (stdout !== cur_version) {
    error("You should update your hnao-cli, it's not the latest version")
  }
}

module.exports = checkVersion
