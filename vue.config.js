<<<<<<< HEAD
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        assets: "@/assets",
        common: "@/common",
        components: "@/components",
        network: "@/network",
        views: "@/views",
      },
    },
  },
  devServer: {
    proxy: {
      // 配置跨域
      "/api": {
        target: "http://47.119.112.252:8089/party/",
        // ws: true,
        changOrigin: true, //是否开启代理
        pathRewrite: {
          //  /api开头的请求会去到target下请求
          "^/api": "", //   替换/api 为空字符
        },
      },
    },
  },
};
=======
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
>>>>>>> dev_cuiweiyuan
