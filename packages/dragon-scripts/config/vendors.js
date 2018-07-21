const path = require('path')
const nodeModulesPath = path.resolve(__dirname, '..', 'node_modules')
module.exports={
	vendor:[
        'react',
        'react-dom',
        'react-router',
        'classnames',
        'whatwg-fetch',
        'mobx',
        'mobx-react',
        'moment',
        'babel-polyfill',
        "twemoji",
        "sha1",
        "react-sortable-hoc",
        "react-image-crop",
        "react-copy-to-clipboard"
    ],
    noParse: [
        path.resolve(nodeModulesPath, 'classnames/index.js'),
        path.resolve(nodeModulesPath, 'whatwg-fetch/fetch.js'),
        path.resolve(nodeModulesPath, 'moment/moment.js'),
        path.resolve(nodeModulesPath, 'moment/local/zh-cn.js'),
    ],
}