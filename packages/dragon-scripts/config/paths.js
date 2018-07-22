const { resolve } = require("path");

const resolveApp = src => resolve(process.cwd(), src);

module.exports = {
  appPackageJson: resolveApp("package.json"),
  appIndexJs: resolveApp("app/index.js"),
  appSrc: resolveApp("app"),
  appStyle: resolveApp("app/style"),
  appCommon: resolveApp("app/common"),
  appStore: resolveApp("app/baseStore"),
  appConstant: resolveApp("app/constant"),
  appRegex: resolveApp("app/regex"),
  appApi: resolveApp("app/api"),
  appHttp: resolveApp("app/fetch"),
  appComponents: resolveApp("app/components"),
  appUtil: resolveApp("app/util"),
  appModules: resolveApp("node_modules"),
  appBuild: resolveApp("dist"),
  appHtml: resolveApp("index.html"),
  appBuildHtml: resolveApp("assets/template/index.html"),
  appConfig: resolveApp("hlj.config.js"),
  appfavicon: resolveApp("assets/imgs/logo.png"),
  appLess: resolve("app/style/less")
};
