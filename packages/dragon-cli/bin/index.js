#!/usr/bin/env node

//update

const program = require('commander')
program.version(require('../package').version, '-v, --version')
program.usage('<command>')
program
  .command('create')
  .description('create a new project')
  .alias('c')
  .action(() => {
    require('../command/create')()
  })

program.parse(process.argv)
if (!program.args.length) {
  program.help()
}
