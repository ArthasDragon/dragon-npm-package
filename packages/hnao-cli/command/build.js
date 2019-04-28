process.env.NODE_ENV = 'production'

const webpack = require('webpack')
const fs = require('fs-extra')
const { __dist } = require('../utils/paths')

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
  fs.emptyDirSync(__dist)

  build()
}

cleanAndBuild()
