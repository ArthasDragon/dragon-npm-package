const { shell } = require('execa')

module.exports = async function() {
  const _version = await shell(`npm view hnao-cli version`)
  console.log(_version)
}
