const chalk = require('chalk')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
// const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
// const generateCssLoader = require('../webpack/generateCssLoader')

const devWebpackConfig = require('../webpack/webpack.dev.conf.js')
const getConfig = require('../utils/getConfigs')
const config = getConfig('index.js')
const createCompiler = require('../utils/createCompiler')

const host = process.env.HOST || config.dev.host
const port = (process.env.PORT && Number(process.env.PORT)) || config.dev.port

const isInteractive = process.stdout.isTTY

function clearConsole() {
  process.stdout.write(
    process.platform === 'win32' ? '\x1Bc' : '\x1B[2J\x1B[3J\x1B[H'
  )
}

// these options should be customized in /config/index.js
const options = {
  clientLogLevel: 'warning',
  historyApiFallback: true,
  hot: true,
  compress: true,
  host,
  port,
  open: config.dev.autoOpenBrowser,
  overlay: config.dev.errorOverlay ? { warnings: false, errors: true } : false,
  publicPath: config.dev.assetsPublicPath,
  proxy: config.dev.proxyTable,
  // quiet: true, // necessary for FriendlyErrorsPlugin
  watchOptions: {
    poll: config.dev.poll
  }
}

// devWebpackConfig.plugins.push(
//   new FriendlyErrorsPlugin({
//     compilationSuccessInfo: {
//       messages: [`Your application is running here: http://${host}:${port}`]
//     },
//     onErrors: config.dev.notifyOnErrors
//       ? generateCssLoader.createNotifierCallback()
//       : undefined
//   })
// )

WebpackDevServer.addDevServerEntrypoints(devWebpackConfig, options)

const compiler = createCompiler(webpack, devWebpackConfig, port)
const server = new WebpackDevServer(compiler, options)

module.exports = function() {
  server.listen(port, '127.0.0.1', err => {
    if (err) {
      return console.log(err)
    }

    if (isInteractive) {
      clearConsole()
    }
    console.log(chalk.cyan('Starting the development server...\n'))
  })
}
