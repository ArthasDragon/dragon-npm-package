const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin=require('html-webpack-plugin')
const OpenBrowserPlugin=require('open-browser-webpack-plugin')
const webpackConfig = require('./webpack.config.base')
const config = require('../config')
const plugins=[
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
        template: 'index.html',
        filename: 'index.html',
        showErrors: true,
        inject: 'body',
        favicon:'assets/imgs/logo.png',
    })
]
if(process.platform!=='linux'){
    plugins.push(
        new OpenBrowserPlugin({ url: 'http://localhost:'+config.port })
    )
}
module.exports = merge(webpackConfig, {
    //cheap-eval-source-map,#eval-source-map,cheap-module-eval-source-map
    devtool: 'cheap-module-eval-source-map',
    output: {
        publicPath: '/'
    },
    plugins: plugins
})