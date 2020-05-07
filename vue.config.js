module.exports = {
    devServer: {
        disableHostCheck: true,
        proxy: {
            '/api': {
                target: 'http://trademark.hnmykj.vip', //对应自己的接口(测试环境)
                // target: 'https://www.tmwww.net/api', //正式环境  
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}