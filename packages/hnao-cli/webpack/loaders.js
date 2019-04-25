const getConfig = require('../utils/getConfigs')
const { resolve } = require('path')
const { __src, __test, assetsPath } = require('../utils/paths')

module.exports = [
  {
    test: /\.vue$/,
    loader: 'vue-loader',
    options: getConfig('vue-loader.config')
  },
  {
    test: /\.js$/,
    loader: 'babel-loader',
    include: [
      __src,
      __test
      // resolve('node_modules/webpack-dev-server/client')
    ]
  },
  {
    test: /\.svg$/,
    loader: 'svg-sprite-loader',
    include: [resolve(__src, 'icons')],
    options: {
      symbolId: 'icon-[name]'
    }
  },
  {
    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
    loader: 'url-loader',
    exclude: [resolve(__src, 'icons')],
    options: {
      limit: 50000,
      name: assetsPath('img/[name].[hash:7].[ext]'),
      publicPath: '../../'
    }
  },
  {
    test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
    loader: 'url-loader',
    options: {
      limit: 10000,
      name: assetsPath('media/[name].[hash:7].[ext]')
    }
  },
  {
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
    loader: 'url-loader',
    options: {
      limit: 10000,
      name: assetsPath('fonts/[name].[hash:7].[ext]'),
      publicPath: '../../'
    }
  }
]
