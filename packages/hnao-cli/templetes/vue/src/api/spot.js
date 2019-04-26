import request from '@/utils/request'

// 封装post请求
export function fetch (requestUrl, params = '') {
  return request({
    url: requestUrl,
    method: 'post',
    data: {
      'body': params
    }
  })
}
