const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpackMerge = require("webpack-merge");
const paths = require("./paths");
const OpenBrowserPlugin = require("open-browser-webpack-plugin");

module.exports = config => {
  const webpackConfig = webpackMerge(
    require("./webpack.config.common")(config),
    {
      entry: {
        app: [
          require.resolve("./polyfills"),
          "react-hot-loader/patch",
          paths.appIndexJs
        ]
      },
      output: {
        filename: "js/[name].js",
        chunkFilename: "js/[name].chunk.js"
      },
      plugins: [
        new HtmlWebpackPlugin({
          inject: true,
          template: paths.appHtml
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
      ],
      devtool: "cheap-module-eval-source-map",
      performance: {
        hints: false
      }
    }
  );

  if (config.autoOpen) {
    webpackConfig.plugins.push(
      new OpenBrowserPlugin({
        url: `http://localhost:${config.port}`
      })
    );
  }

  return webpackConfig;
};
