// 配置axios实例

import axios from "axios";
import store from "@/store";
import JSONBig from "json-bigint";

// 创建一个axios实例
// 通过axios创建出来的实例跟axios一模一样
// 但是集成了一些配置项
const request = axios.create({
  baseURL: "http://42.192.129.12:8000/",
  // baseURL: "http://toutiao.itheima.net",
  // 原始的处理数据的方法 >> 如果直接使用JSON.parse数字会失去精度
  transformResponse: [
    function (data) {
      // data json 格式 >> 里面可能包含大数字
      try {
        // 调用jsonBigInt进行数据的处理
        return JSONBig.parse(data);
      } catch (e) {
        return data;
      }
    },
  ],
});

// 设置请求拦截器
request.interceptors.request.use(
  (config) => {
    // config >> 当前的配置项
    //  设置token
    //  判断token是否存在
    const token = store.state?.user?.token;

    //  判断token是否存在
    //  存在 >> 添加请求头
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // 配置完return >> config配置项
    return config;
  },
  (err) => {
    // 为了报错
    return Promise.reject(err);
  }
);
// 后端如果给你返回了超出精度的数字 >> 浏览器没法解析

request.interceptors.response.use(); // 响应拦截器

// // 测试接口请求 >>
// request.get("http://localhost:3000/name").then((res) => {
//   console.log(res);
// });

// app.get("/list", (res, err) => {
//   res.send({});
// });

export default request;

// 安装json-server >> yarn add json-server -D
// 项目根目录创建db.json >> json文件
// package.json中配置一个脚本 "mock": "json-server --watch ./db.json"
