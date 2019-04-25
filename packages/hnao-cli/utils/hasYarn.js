const { shellSync } = require('execa')
module.exports = function() {
  try {
    shellSync('yarnpkg --version', { stdio: 'ignore' })
    return true
  } catch (e) {
    return false
  }
}
