# hnao-cli 

> hnao CLI is the Standard Tooling for hnao company's Development.

## Installation

```shell
$ npm install hnao-cli -g
# OR
$ yarn global add hnao-cli
```

## Create a project:

please make sure your hnao-cli is the latest version, otherwise it will throw an error

```shell
$ hnao-cli create
$ cd your-project-name
$ npm start or yarn start
```


## Config

your config files are all in the folder config

## Router

write your routerConfig as this

```javascript
  import Vue from 'vue'
  import Router from 'vue-router'
  const Home = () => import('@/views/index') //按需加载

  Vue.use(Router)

  export default new Router({
    routes: [
      {
        path: '/',
        name: 'Home',
        component: Home
      }
    ]
  })

```

## Utils

the utils are in the folder src/utils 

> you must have a test file in the folder 'src/utils/\_\_tests__' for every util function



