// 登录的接口
// 引入request请求方法
import request from "@/utils/request";

// 登录的接口
export const login = (data) => {
  return request({
    method: "POST",
    url: "/v1_0/authorizations",
    data,
  });
};

// 获取验证码接口
export const getSmsCode = (mobile) => {
  return request({
    method: "GET",
    url: `/v1_0/sms/codes/${mobile}`,
  });
};

// 需求：获取用户资料
//    my/index.vue 封装请求的方法，created钩子内部进行调用
// 接口 >> 需要权限
// headers: { Authorization: 'Bearer token'}

// 获取用户信息接口
export const fetchUserInfo = () => {
  return request({
    method: "GET",
    url: "/v1_0/user",
  });
};
