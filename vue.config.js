const express = require('express')
const app = express()

var localldata = require('./public/static/json/data')  //本地json文件数据

var locallshandong = require('./public/static/json/shandong')  //本地json文件数据
var locallprediction = require('./public/static/json/prediction')  //本地json文件数据
var locallechartsData = require('./public/static/json/echartsData')  //本地json文件数据
//var locallgexf = require('./static/les-miserables.gexf')  //本地json文件数据

var apiRoutes = express.Router();

app.use('/local', apiRoutes)



module.exports = {
    devServer: {
      port: 8088, // 端口
        proxy: {
            '/api': {
                target: 'http://localhost:8088', //API服务器的地址
                ws: true,  //代理websockets
                changeOrigin: true, // 虚拟的站点需要更管origin
                pathRewrite: {   //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
                    '^/api': ''
                }
            }
        },
    },
    // lintOnSave: false // 取消 eslint 验证
  }