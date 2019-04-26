const { resolve, posix } = require('path')
const { pathExistsSync } = require('fs-extra')
const resolvePath = src => resolve(process.cwd(), src)

const config = pathExistsSync(resolve(process.cwd(), 'config/index'))
  ? require(resolvePath('config'))
  : require('../config')

const assetsPath = function(_path) {
  const assetsSubDirectory =
    process.env.NODE_ENV === 'production'
      ? config.build.assetsSubDirectory
      : config.dev.assetsSubDirectory

  return posix.join(assetsSubDirectory, _path)
}

module.exports = {
  __pkgJson: resolvePath('package.json'),
  __root: process.cwd(),
  __src: resolvePath('src'),
  __main: resolvePath('src/main.js'),
  __nodeModules: resolvePath('node_modules'),
  __configs: resolvePath('config'),
  __test: resolvePath('test'),
  __favicon: resolvePath('favicon.png'),
  __devHtml: resolvePath('index.html'),
  __buildHtml: resolvePath('index.html'),
  __static: resolvePath('static'),
  getPath: resolvePath,
  assetsPath
}
