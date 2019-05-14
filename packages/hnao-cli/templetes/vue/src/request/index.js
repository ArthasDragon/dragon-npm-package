/* eslint-disable */
import axios from 'axios'
import { message } from 'element-ui'

/**
* 定义请求常量
* TIME_OUT、ERR_OK
*/
export const TIME_OUT = 1000;    // 请求超时时间
export const ERR_OK = true;      // 请求成功返回状态，字段和后台统一
export const baseUrl = process.env.BASE_URL   // 引入全局url，定义在全局变量process.env中，开发环境为了方便转发，值为空字符串

// 请求超时时间
axios.defaults.timeout = TIME_OUT

// 封装请求拦截
axios.interceptors.request.use(
    config => {
        let token = localStorage.getItem('token')   // 获取token
        config.headers['Content-Type'] = 'application/json;charset=UTF-8'
        config.headers['Authorization'] = ''
        if(token != null){                          // 如果token不为null，否则传token给后台
            config.headers['Authorization'] = token
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)
// 封装响应拦截，判断token是否过期
axios.interceptors.response.use(
  response => {
    let {data} = response
    if (data.message === 'token failure!') {    // 如果后台返回的错误标识为token过期，则重新登录
      localStorage.removeItem('token')          // token过期，移除token
      // 进行重新登录操作
    } else {
      return Promise.resolve(response)
    }
  },
  error => {
    return Promise.reject(error)
  }
)

let strategy = {
  get: (url, data) => axios({url,
    method: 'get',
    params: {...data},
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }}),
  post: (url, data) => axios({url,
    method: 'post',
    data: {...data},
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }}),
  form: (url, data) => axios({
    url,
    method: 'post',
    data: {...data},
    transformRequest: [function (data) {
      let ret = ''
      let keys = Object.keys(data)
      let len = keys.length
      len && keys.forEach((key, i) => {
        ret += encodeURIComponent(key) + '=' + encodeURIComponent(data[key]) + (len === i + 1 ? '' : '&')
      })
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  })
}

let http = {
  get: (url) => {
    return data => strategy.get(url, data)
  },
  post: (url) => {
    return data => strategy.post(url, data)
  },
  form: (url) => {
    return data => strategy.form(url, data)
  }
}

export default http