const inquirer = require('inquirer')
const { info, success, error } = require('../utils/tips')
const getSpinner = require('../utils/getSpinner')
const { resolve } = require('path')
const {
  pathExistsSync,
  copySync,
  writeFileSync
} = require('fs-extra')
const { shell } = require('execa')
const checkVersion = require('../utils/checkVersion')

module.exports = async function() {
  await checkVersion()
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
    }
    // {
    //   name: 'typescript',
    //   value: 'ts'
    // }
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
  let generateSpinner = getSpinner('generating... ')
  let installSpinner = getSpinner('installing... ')
  const { stdout: scriptVersion } = await shell(`npm view hnao-scripts version`)

  let templetePath = resolve(__dirname, '../templetes/vue')
  let initialPkg = require(resolve(templetePath, 'package.json'))
  initialPkg.name = projectName
  initialPkg.scripts = {
    start: 'hnao-scripts start',
    build: 'hnao-scripts build',
    dev: 'npm run start',
    test: "jest --notify"
  }
  initialPkg['devDependencies'] = {
    'hnao-scripts': scriptVersion
  }

  try {
    info(`\n start generate project: ${projectName}`)
    generateSpinner.start()

    let projectPath = resolve(process.cwd(), projectName)
    await shell(`mkdir ${projectName}`)
    copySync(templetePath, projectPath)
    writeFileSync(
      resolve(projectPath, 'package.json'),
      JSON.stringify(initialPkg, null, 2)
    )

    generateSpinner.stop()
    success('\n √ generate completed!')

    // info(`\n start install dependencies`)
    // installSpinner.start()

    // await shell(`cd ${projectName} && npm install`)

    // installSpinner.stop()
    // success('\n √ install completed!')
  } catch (e) {
    generateSpinner.stop()
    installSpinner.stop()
  }
}
