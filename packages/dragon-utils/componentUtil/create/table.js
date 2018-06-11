#!/usr/bin/env node

'use strict'

const { exec } = require('child_process')
const { dir } = require('../../config')
const path = process.argv[2]

exec(require.resolve('../sh/move.sh') + ' ' + dir + '/componentTpl/Table/List' + ' ' + path)


