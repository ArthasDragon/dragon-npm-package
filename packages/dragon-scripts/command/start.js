global.mode = "start";
// const opn = require("opn");

const { success } = require("../utils/common/print");
const createCompiler = require("../utils/compiler");

// const webpack = require("webpack");
const devWebpackConf = require("../config/webpack.dev.conf");

const WebpackDevServer = require("webpack-dev-server");

const { port, host, proxy } = require("../utils/config")();
const compiler = createCompiler(devWebpackConf, port);

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
  noInfo: false,
  stats: {
    colors: true
  },
  hot: true,
  historyApiFallback: true,
  host,
  disableHostCheck: true,
  proxy: handleProxy(proxy)
};

const server = new WebpackDevServer(compiler, options);

module.exports = function() {
  server.listen(port, "127.0.0.1", err => {
    if (err) {
      return console.log(err);
    }

    // if (isInteractive) {
    //   clearConsole();
    // }
    success("Starting the development server...\n");
  });
};
