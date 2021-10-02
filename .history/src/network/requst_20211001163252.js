//封装好的请求方法（axios）

import axios from "axios"

export function requst(config) {
  const instance = axios.create({
    baseURL:'https://47.119.112.252',
    timeout:5000
  })
  instance.interceptors.request.use(config=>{
    return config
  },err=>{
    console.log(err);
  })
  instance.interceptors.response.use(res=>{
    return res
  },err=>{
    console.log(err);
  })
  return instance(config)
}
