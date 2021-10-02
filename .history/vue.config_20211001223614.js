module.exports ={
    devServer:{
        //跨域
        proxy:{
            '/api':{
                // 目标
                target:"http://47.119.112.252:8089/party/",
                // 允许跨域
                changeOrigin: true,
                // 重写路径
                pathRewrite:{
                    '^/api':''
                }
            }
        }
    }
}