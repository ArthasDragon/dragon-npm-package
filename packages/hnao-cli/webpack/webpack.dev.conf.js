const generateCssLoader = require('./generateCssLoader')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const getConfig = require('../utils/getConfigs')
const config = getConfig('index.js')
const { __favicon, __devHtml, __static } = require('../utils/paths')

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  module: {
    rules: generateCssLoader.styleLoaders({
      sourceMap: config.dev.cssSourceMap,
      usePostCSS: true
    })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  plugins: [
    new webpack.DefinePlugin({
      'process.env': getConfig('dev.env.js')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: __devHtml,
      inject: true,
      favicon: __favicon
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: __static,
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

module.exports = devWebpackConfig
