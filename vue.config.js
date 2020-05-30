module.exports = {
    devServer: {
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
