const webpack = require('webpack')
const path = require('path')
const vendors=require('./vendors').vendor
const OpenBrowserPlugin=require('open-browser-webpack-plugin')
const config = require('../config')
module.exports = {
    cache: true,
    devtool:'eval-source-map',
    entry: {
        example:[
            'webpack-hot-middleware/client?reload=true',
            path.join(__dirname, '../example/')
        ],
        vendor:vendors
    },
    output: {
        path: '/',
        chunkFilename: '[name].chunk.js',
        filename: '[name].min.js'
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            include: [
                path.join(__dirname, '../example'),
                path.join(__dirname, '../app')
            ],
            use: ['babel-loader?cacheDirectory=true']
        },{
            test: /\.(css|pcss)$/,
            include: [
                path.join(__dirname, '../example'),
                path.join(__dirname, '../app/common')
            ],
            use: [
                "style-loader",
                'css-loader?module&localIdentName=[name]__[local]___[hash:base64:5]',
                'postcss-loader'
            ]
        }, {
            test: /\.css$/,
            include: /node_modules/,
            use: ['style-loader','css-loader']
        }, {
            test: /\.(png|jpe?g|gif)$/,
            use: [{
                loader:'url-loader',
                options:{
                    limit: 5000,
                    name: '[hash:5].[name].[ext]'
                }
            }],
        }, {
            test: /\.(svg|woff2?|eot|ttf|otf)(\?.*)?$/,
            use: ['url-loader?limit=10240']
        }]
    },
    resolve: {
        modules: [
            path.join(__dirname, "../app"),
            "node_modules"
        ],
        extensions: ['.js', '.css', '.jsx','.pcss'],
        alias: {
            '@components': path.join(__dirname, '../example/components'),
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
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"development"',
            __DEV__:true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor_example',
            filename: 'vendor_example.min.js',
            minChunks: Infinity
        }),
        new OpenBrowserPlugin({ url: 'http://localhost:'+config.port }),
        new webpack.LoaderOptionsPlugin({
            options:{
                //https://github.com/webpack-contrib/css-loader/issues/413
                context: __dirname,
            }
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
}