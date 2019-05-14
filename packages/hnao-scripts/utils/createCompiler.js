const chalk = require('chalk')
const isInteractive = process.stdout.isTTY

function clearConsole() {
  process.stdout.write(
    process.platform === 'win32' ? '\x1Bc' : '\x1B[2J\x1B[3J\x1B[H'
  )
}

const printInstructions = (appName, port) => {
  console.log()
  console.log(`You can now view ${chalk.bold(appName)} in the browser.`)
  console.log()

  console.log(`  ${chalk.bold('Local:')}            port ${port}`)

  console.log()
  console.log('Note that the development build is not optimized.')
  console.log(
    `To create a production build, use ` + `${chalk.cyan('yarn build')}.`
  )
  console.log()
}
const createCompiler = (webpack, config, port) => {
  const compiler = webpack(config)

  compiler.plugin('invalid', () => {
    if (isInteractive) {
      clearConsole()
    }
    console.log('Compiling...')
  })

  compiler.plugin('done', () => {
    if (isInteractive) {
      clearConsole()
    }

    console.log(chalk.green('Compiled successfully!'))
    printInstructions(port)
  })
  return compiler
}

module.exports = createCompiler
