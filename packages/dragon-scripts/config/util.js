const vendors = require('./vendors').vendor
module.exports = {
    getENV: function () {
        return (process.env.NODE_ENV || 'development').trim()
    },
    isDev: function () {
        return this.getENV() !== 'production'
    },
    getDefineENV: function () {
        const ENV = this.getENV()
        return {
            __fmt1: '"YYYY-MM-DD"',
            __fmt2: '"YYYY-MM-DD HH:mm:ss"',
            __DEV__: ENV !== 'production'
        }
    },
    getEntrys: function (entrys) {
        const isDev = this.isDev()
        Object.keys(entrys).forEach(function (entryName) {
            const entryPath = entrys[entryName]
            const entryConfig = []
            if (isDev) {
                entryConfig.push('react-hot-loader/patch')
                entryConfig.push('webpack-hot-middleware/client?reload=true')
            }
            entryConfig.push(entryPath)
            entrys[entryName] = entryConfig
        })
        entrys.vendor = vendors || []
        return entrys
    },
}