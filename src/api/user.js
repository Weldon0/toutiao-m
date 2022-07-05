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
