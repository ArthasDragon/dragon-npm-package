const webpack = require('webpack')
const path = require('path')
const noParse = require('./vendors').noParse
const config = require('../config')
const util = require('./util')
const loaders = require('./loaders')
const defineDEV=util.getDefineENV()
const happyPacks=require('./happyPack')
const isDev = util.isDev()
const define = {
    'process.env.NODE_ENV': isDev?'"development"':'"production"',
}
Object.keys(defineDEV).forEach(function (key) {
    define[key] = defineDEV[key]
})
const baceConfig = {
    cache: true,
    entry: util.getEntrys(config.entrys),
    output: {
        path: config.outputPath,
        chunkFilename: '[name].chunk.js',
        filename: '[name].min.js'
    },
    module: {
        noParse: noParse,
        rules: loaders
    },
    resolve: {
        modules: [
            path.join(__dirname, "../app"),
            "node_modules"
        ],
        extensions: ['.js', '.css', '.jsx','.pcss','.tsx','.ts'],
        alias: {
            '@components': path.join(__dirname, '../app/components'),
            '@common': path.join(__dirname, '../app/common'),
            '@util': path.join(__dirname, '../app/util'),
            '@store': path.join(__dirname, '../app/baseStore'),
            '@mixins': path.join(__dirname, '../app/components/mixins'),
            '@http': path.join(__dirname, '../app/api/fetch'),
            '@api':path.join(__dirname, '../app/api'),
            '@constant':path.join(__dirname, '../app/constant'),
        }
    },
    plugins: [
        new webpack.DefinePlugin(define),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor.min.js',
            minChunks: Infinity,
            // minimize: true,
            // debug: false
        }),
        new webpack.LoaderOptionsPlugin({
            options:{
                //https://github.com/webpack-contrib/css-loader/issues/413
                context: __dirname,
            }
        }),
        ...happyPacks
    ]
}
if (config.eslint) {
    baceConfig.module.rules.push({
        test: /\.jsx?$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: path.join(__dirname, '../app')
    })
}
module.exports = baceConfig