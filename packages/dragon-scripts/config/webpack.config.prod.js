const webpack = require("webpack");
const webpackMerge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const paths = require("./paths");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

module.exports = config => {
  const webpackConfig = webpackMerge(
    require("./webpack.common.config")(config),
    {
      entry: {
        app: [require.resolve("./polyfills"), paths.appIndexJs],
        vendor: [
          "react",
          "react-dom",
          "react-router",
          "mobx",
          "mobx-react",
          "classnames",
          "moment"
        ]
      },
      output: {
        filename: "js/[name].[chunkhash:8].js",
        chunkFilename: "js/[name].[chunkhash:8].chunk.js"
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: paths.appBuildHtml,
          filename: "index.html",
          showErrors: true,
          inject: "body",
          favicon: paths.appfavicon,
          minify: {
            removeComments: true,
            collapseWhitespace: true,
            chunksSortMode: "dependency"
          }
        }),
        new webpack.optimize.UglifyJsPlugin({
          sourceMap: false,
          compress: {
            warnings: false,
            drop_console: true,
            unused: true
          }
        }),
        new ExtractTextPlugin({
          filename: "css/style.[contentHash:8].css",
          allChunks: true
        }),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new webpack.optimize.CommonsChunkPlugin({
          names: ["vendor", "manifest"],
          minChunks: Infinity
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new BundleAnalyzerPlugin()
      ],
      devtool: false
    }
  );

  return webpackConfig;
};
