import request from "@/utils/request";

// 获取频道数据的的接口
export const getUserChannels = () => {
  return request({
    method: "GET",
    url: "/v1_0/user/channels",
  });
};

// 获取所有频道数据
export const fetchAllChannels = () => {
  return request({
    method: "GET",
    url: "/v1_0/channels",
  });
};
