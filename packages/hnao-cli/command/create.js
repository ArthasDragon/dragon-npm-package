const inquirer = require('inquirer')
const { warning } = require('../utils/tips')
const getSpinner = require('../utils/getSpinner')
const { resolve } = require('path')
const { pathExistsSync } = require('fs-extra')
const { error } = require('../utils/tips')

module.exports = async function() {
  let projectName
  let category
  let language
  const categories = [
    { name: 'vue', value: 'vue' }
    // { name: 'react', value: 'react' }
  ]
  const languages = [
    {
      name: 'javascript',
      value: 'js'
    },
    {
      name: 'typescript',
      value: 'ts'
    }
  ]
  const { _projectName, _category, _language } = await inquirer.prompt([
    {
      type: 'input',
      message: 'What is the project name',
      name: '_projectName',
      validate(val) {
        return val.trim() ? true : 'you must provide a project name'
      }
    },
    {
      type: 'list',
      message: 'what kind of project?',
      name: '_category',
      choices: categories
    },
    {
      type: 'list',
      message: 'The language you want to use',
      name: '_language',
      choices: languages
    }
  ])
  projectName = _projectName
  category = _category
  language = _language
  if (pathExistsSync(resolve(process.cwd(), projectName))) {
    error(`${projectName} has already exists`)
  }
  createProject(projectName, category, language)
}

const createProject = async function(projectName, category, language) {
  console.log(
    pathExistsSync(resolve(process.cwd(), 'command')),
    resolve(process.cwd(), 'command')
  )
  let generateSpinner = getSpinner('generating... ')
  let installSpinner = getSpinner('installing... ')
}
