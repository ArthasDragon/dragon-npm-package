# yunfk

> A Vue.js project

## Build Setup

``` bash
# 安装依赖
yarn

# 启动服务（默认9528端口）
yarn start

# 打包
yarn build

```

> 有关webpack的一些配置可以在 config/index.js下进行配置

## 接口使用（支持form、get、post）

定义

```javascript
  import request from '@/request'

  export const editPassword = request.form('/api/Visitor/EditPassword')
```

使用

> 方法中或者在actions中使用

1. await方式

```javascript
  async mounted(){
    const {data: {success, message}} = await editPassword({name:'111'})
  }
```

2. .then方式

```javascript
  editPassword({
    name: '111'
  }).then(res => {...})
  
```

