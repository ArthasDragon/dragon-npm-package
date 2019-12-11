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

module.exports = async function () {
  await checkVersion()
  let projectName
  let category
  let language
  let useDva
  const categories = [
    // { name: 'vue', value: 'vue' }
    { name: 'react', value: 'react' }
  ]
  const languages = [
    // {
    //   name: 'javascript',
    //   value: 'js'
    // }
    {
      name: 'typescript',
      value: 'ts'
    }
  ]
  const { _projectName, _category, _language, _useDva } = await inquirer.prompt([
    {
      type: 'input',
      message: 'What is the project name',
      name: '_projectName',
      validate (val) {
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
    },
    {
      type: 'confirm',
      message: "是否使用dva？",
      name: "_useDva"
    }
  ])
  useDva = _useDva
  projectName = _projectName
  category = _category
  language = _language
  if (pathExistsSync(resolve(process.cwd(), projectName))) {
    error(`${projectName} has already exists`)
  }
  createProject(projectName, category, language, useDva)
}

const createProject = async function (projectName, category, language, useDva) {
  let generateSpinner = getSpinner('generating... ')
  let installSpinner = getSpinner('installing... ')
  const { stdout: scriptVersion } = await shell(`npm view dragon-scripts version`)

  let templetePath = useDva ? resolve(__dirname, '../templates/dva') : resolve(__dirname, '../templates/react')
  let initialPkg = require(resolve(templetePath, 'package.json'))
  initialPkg.name = projectName
  initialPkg.scripts = {
    start: 'dragon-scripts start',
    build: 'dragon-scripts build',
    dev: 'npm run start',
    test: "jest --notify",
    ts: "tslint -c tslint.json 'src/**/*.tsx'"
  }
  initialPkg['devDependencies'] = {
    'dragon-scripts': scriptVersion
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

  } catch (e) {
    generateSpinner.stop()
    installSpinner.stop()
  }
}
