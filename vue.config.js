module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        //别名，例如可用assets/xx.txt代替../../assets/xx.txt等
        assets: "@/assets",
        common: "@/common",
        components: "@/components",
        network: "@/network",
        views: "@/views",
        store: "@/store",
        router: "@/router",
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
