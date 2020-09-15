export const debounce = (fn, delay) => {
  let timer = null
  return function(...rest) {
    const aaa = function() {
      fn(...rest)
    }
    if (timer) {
      clearTimeout(timer)
    }
    // timer && clearTimeout(timer)
    timer = setTimeout(aaa, delay || 1000)
  }
}
