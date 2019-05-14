const Spinner = require('cli-spinner').Spinner
module.exports = function(title, spinerText) {
  let _spinner = new Spinner(title)
  _spinner.setSpinnerString(spinerText || '|/-\\')
  return _spinner
}
