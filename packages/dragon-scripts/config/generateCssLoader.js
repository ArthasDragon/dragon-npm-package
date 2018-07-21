const isDev = require('./util').isDev()
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const generateCssLoader = function ({include, exclude, happyId,test}) {
    const hp = `happypack/loader?id=${happyId}`
    test=test||/\.p?css$/
    return {
        test,
        include,
        exclude,
        use: isDev ? ['style-loader', hp] :
            ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [hp],
            }),
    }
}
module.exports = generateCssLoader
