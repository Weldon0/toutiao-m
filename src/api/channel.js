import request from "@/utils/request";

// 获取频道数据的的接口
export const getUserChannels = () => {
  return request({
    method: "GET",
    url: "/v1_0/user/channels",
  });
};
