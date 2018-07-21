const webpack = require('webpack')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const webpackConfig = require('./webpack.config.base')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const config = require('../config')
// const CompressionPlugin = require('compression-webpack-plugin')
const plugins = [
  new webpack.optimize.UglifyJsPlugin({
    sourceMap: false,
    minimize: true,
    compress: {
      warnings: false,
      drop_console: true,
      unused: true,
      // drop_debugger: true
    }
  }),
  //开启gzip压缩
  // new CompressionPlugin({
  //     asset: '[path].gz[query]',
  //     algorithm: 'gzip',
  //     test: /\.js$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
  //     threshold: 10240,
  //     minRatio: 0.8
  // }),
  new webpack.optimize.ModuleConcatenationPlugin(),
  new ExtractTextPlugin({
    filename: '[name].min.css',
    allChunks: true,
  }),
  new HtmlWebpackPlugin({
    template: 'assets/template/index.html',
    filename: 'index.html',
    showErrors: true,
    inject: 'body',
    hash: true,
    favicon: 'assets/imgs/logo.png',
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      chunksSortMode: 'dependency'
    },
  }),
  new webpack.ProgressPlugin(function (percentage, msg, current, active, modulepath) {
    if (process.stdout.isTTY && percentage < 1) {
      process.stdout.cursorTo(0)
      modulepath = modulepath ? ' …' + modulepath.substr(modulepath.length - 30) : ''
      current = current ? ' ' + current : ''
      active = active ? ' ' + active : ''
      process.stdout.write((percentage * 100).toFixed(0) + '% ' + msg + current + active + modulepath + ' ')
      process.stdout.clearLine(1)
    } else if (percentage === 1) {
      process.stdout.write('\n')
      console.log('100% 编译完成，等待部署...')
    }
  })
]
module.exports = merge(webpackConfig, {
  devtool: false,
  output: {
    publicPath: config.publicPath
  },
  plugins
})