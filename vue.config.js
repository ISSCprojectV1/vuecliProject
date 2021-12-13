module.exports = {
  // lintOnSave: false // 取消 eslint 验证
  devServer: {
    port: 8000, // 端口
    open: true,
    //sockHost: 'http://localhost:8080',
    proxy:
      {
        // '/api': {
        //   target: 'http://172.16.7.11:18860/market-service/resourceAllocation/', //API服务器的地址
        //   // target: 'http://localhost:8088', //API服务器的地址
        //   ws: true,  //代理websockets
        //   changeOrigin: true, // 虚拟的站点需要更管origin
        //   pathRewrite: {   //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
        //     '^/api': ''
        //   }
        // },
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


  chainWebpack: (config) => {
    /* 添加分析工具*/
    if (process.env.NODE_ENV === 'production') {
      if (process.env.npm_config_report) {
        config
          .plugin('webpack-bundle-analyzer')
          .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
          .end();
        config.plugins.delete('prefetch')
      }
      const CompressionPlugin = require('compression-webpack-plugin')
      return {
        plugins: [new CompressionPlugin({
          test: /\.js$|\.html$|\.css/, //匹配文件名
          threshold: 10240, //对超过10k的数据进行压缩
          deleteOriginalAssets: false //是否删除原文件
        })]
      }
    }
  }

}
