export const getUrlParams = function (name, def, url=window.location.href) {
  let reg = new RegExp('(^|&)' + name + '=([^&]*?)(&|$|#)', 'g')
  let reg1 = new RegExp('(^|&)' + name + '=([^&]*?)(&|$|#)')
  let searchArr = url.split('?')

  let result = null
  searchArr.forEach(item => {
    if (item.match(reg)) {
      item.match(reg).forEach(mat => {
        result = mat.match(reg1) || result
      })
    }
  })
  if (result) {
    return unescape(result[2])
  }
  return def || ''
}

