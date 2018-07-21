const isDev = require('./util').isDev()
const HappyPack = require('happypack')
const threadPool = HappyPack.ThreadPool({size: 8})
const cssModules = {
  modules: true,
  importLoaders: 1,
  localIdentName: '[path][name]__[local]--[hash:base64:5]'
}
const createHappyPack = function (id, loaders) {
  return new HappyPack({
    id,
    // threads: 8,
    threadPool,
    loaders,
  })
}
module.exports = [
  createHappyPack('jsx', [{
    loader: 'babel-loader',
    options: {cacheDirectory: isDev}
  }]),

  createHappyPack('css', ['css-loader']),

  createHappyPack('css_post', ['css-loader', 'postcss-loader']),

  createHappyPack('css_modules_post', [{
    loader: 'css-loader',
    options: cssModules
  }, 'postcss-loader']),
  // createHappyPack('less', ['css-loader','less-loader']),
]