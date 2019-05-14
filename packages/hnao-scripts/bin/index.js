#!/usr/bin/env node

//update

const program = require('commander')
program.version(require('../package').version, '-v, --version')
program.usage('<command>')

program
  .command('start')
  .description('run start')
  .alias('s')
  .action(() => {
    require('../command/start')()
  })

program
  .command('build')
  .description('run build')
  .alias('b')
  .action(() => {
    require('../command/build')()
  })

program.parse(process.argv)
if (!program.args.length) {
  program.help()
}
