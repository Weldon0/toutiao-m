import request from "@/utils/request";

export const fetchArticle = (params) => {
  return request({
    method: "GET",
    url: "/v1_0/articles",
    params,
  });
};

// 获取文章详情的接口
/**
 * 根据 id 获取指定文章
 */
export const getArticleById = (articleId) => {
  return request({
    method: "GET",
    url: `/v1_0/articles/${articleId}`,
  });
};
