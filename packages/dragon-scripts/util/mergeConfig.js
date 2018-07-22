const fs = require("fs-extra");
const paths = require("../config/paths");

module.exports = () => {
  let mergeConfig = require("../webpack.config");

  if (fs.pathExistsSync(paths.appConfig)) {
    mergeConfig = Object.assign(mergeConfig, require(paths.appConfig));
  }

  return mergeConfig;
};
