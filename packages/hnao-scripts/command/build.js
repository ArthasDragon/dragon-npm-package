process.env.NODE_ENV = 'production'

const webpack = require('webpack')
const fs = require('fs-extra')
const path = require('path')
const resolvePath = src => path.resolve(process.cwd(), src)

let webpackConfig = require('../webpack/webpack.prod.conf')

const build = () => {
  const compiler = webpack(webpackConfig)
  compiler.run((err, stats) => {
    if (err) {
      return console.log(err)
    }

    console.log(
      stats.toString({
        colors: true,
        modules: false,
        children: false
      })
    )
  })
}

const cleanAndBuild = () => {
  fs.emptyDirSync(resolvePath('dist'))

  build()
}

module.exports = cleanAndBuild
