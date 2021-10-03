//封装好的请求方法（axios）

import axios from "axios";

export function requst(config) {
  const instance = axios.create({
    timeout: 5000,
  });
  instance.interceptors.request.use(
    (config) => {
      // 添加请求拦截器，在请求头中加token
      if (localStorage.getItem("Authorization")) {
        config.headers.Authorization = localStorage.getItem("Authorization");
      }
      return config;
    },
    (err) => {
      console.log(err);
    }
  );
  instance.interceptors.response.use(
    (res) => {
      return res;
    },
    (err) => {
      console.log(err);
    }
  );
  return instance(config);
}
