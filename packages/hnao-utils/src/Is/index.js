export * from './regTest'
export const isPlainObj = function(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]'
}
export const isFunc = function(obj) {
  return typeof obj === 'function'
}
export const isNum = function(value, isStrict) {
  if (!isStrict) {
    value = +value
  }
  return typeof value === 'number' && !Number.isNaN(value)
}
export const isStr = function(obj) {
  return typeof obj === 'string'
}
export const isBool = function(obj) {
  return typeof obj === 'boolean'
}
export const isArr = function(obj) {
  return Array.isArray(obj)
}
export const isUNN = function(obj) {
  return obj === null || obj === undefined || Number.isNaN(obj)
}
export const isSymbol = function(obj) {
  return typeof obj === 'symbol'
}
export const isHljKey = function(key) {
  return isSymbol(key) && key.toString() === `Symbol(__hljKey__)`
}
export const isEmptyObj = function(obj) {
  for (let key in obj) {
    return false
  }
  return true
}
export const isEmptyArr = function(obj) {
  return isArr(obj) && obj.length === 0
}
export const isPromise = function(obj) {
  return isFunc(obj) && obj.then
}
