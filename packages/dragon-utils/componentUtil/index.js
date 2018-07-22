#!/usr/bin/env node

'use strict'

const { exec } = require('child_process')
const { resolve } = require('path')
const script = process.argv[2]
const cmp_name = process.argv[3]
const path = process.argv[4] || ''

switch (script) {
  case 'create':
    exec(
      'node ' +
        require.resolve('./create/' + cmp_name) +
        ' ' +
        resolve(process.cwd(), path)
    )
    break
  default:
    console.log(`Unknown script ${script}.`)
}
