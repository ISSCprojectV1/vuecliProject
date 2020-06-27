
module.exports = {
    // lintOnSave: false // 取消 eslint 验证
    devServer: {
        port: 8000, // 端口
        open:true,
        //sockHost: 'http://localhost:8080',
        proxy:
            {
            '/api': {
                target: 'http://localhost:8088', //API服务器的地址
                ws: true,  //代理websockets
                changeOrigin: true, // 虚拟的站点需要更管origin
                pathRewrite: {   //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
                    '^/api': ''
                }
            },
            '/lips': {
                target: 'http://api.map.baidu.com', //API服务器的地址
                ws: true,  //代理websockets
                changeOrigin: true, // 虚拟的站点需要更管origin
                pathRewrite: {   //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
                    '^/lips': ''
                }
            },

             '/moc': {

                target: 'https://www.fastmock.site/mock/7433813b1c79b90e88d0541ef0e6767d/vueProject', //API服务器的地址
                ws: true,  //代理websockets
                changeOrigin: true, // 虚拟的站点需要更管origin
                pathRewrite: {   //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
                    '^/moc': ''
                }
            },
        },
    },
    // lintOnSave: false // 取消 eslint 验证


    // chainWebpack: config => {
    //
    // }
}
