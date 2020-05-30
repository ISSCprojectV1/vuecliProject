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
        before(app) {
            app.get('/local/localldata', (req, res) => {
                res.json({
                    errno: 0,   // 这里是你的json内容
                    data: localldata
                })
            })
            app.get('/local/locallgexf', (req, res) => {
                res.json({
                    errno: 0,   // 这里是你的json内容
                    data: locallgexf
                })
            })


        },

        open:true,
        sockHost: 'http://localhost:8080',
        proxy: {
            '/api':{
                target:'http://localhost:8088',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '' //路径重写
                }

            }
        }
    }
}
