process.env.NODE_ENV = "development";

const chalk = require("chalk");
const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const fs = require("fs-extra");
const paths = require("../config/paths");
const { createCompiler } = require("../util/WebpackDevServerUtils");
const clearConsole = require("../util/clearConsole");
const mergeConfig = require("../util/mergeConfig")();
let webpackConfig = require("../config/webpack.dev.config")(mergeConfig);

const isInteractive = process.stdout.isTTY;
const { port, proxy } = mergeConfig;

const handleProxy = proxy => {
  return Object.keys(proxy).reduce((config, currentProxyKey) => {
    config[currentProxyKey] = {
      target: proxy[currentProxyKey],
      changeOrigin: true
    };
    return config;
  }, {});
};

const options = {
  clientLogLevel: "none",
  noInfo: true,
  stats: {
    colors: true
  },
  hot: true,
  historyApiFallback: true,
  host: "localhost",
  disableHostCheck: true,
  proxy: handleProxy(proxy)
};

WebpackDevServer.addDevServerEntrypoints(webpackConfig, options);

const appName = require(paths.appPackageJson).name;
const compiler = createCompiler(webpack, webpackConfig, appName, port);
const server = new WebpackDevServer(compiler, options);

server.listen(port, "127.0.0.1", err => {
  if (err) {
    return console.log(err);
  }

  if (isInteractive) {
    clearConsole();
  }
  console.log(chalk.cyan("Starting the development server...\n"));
});
