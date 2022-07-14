<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
    :error.sync="error"
    error-text="出错了，点击重试"
  >
    <comment-item v-for="item in list" :key="item.com_id" :comment="item" />
    <!--    <van-cell-->
    <!--      v-for="item in list"-->
    <!--      :key="item.com_id"-->
    <!--      :title="item.content"-->
    <!--    ></van-cell>-->
  </van-list>
</template>
<script>
// console.log(comment);
import { getComments } from "@/api/comment";
import CommentItem from "@/views/article/components/comment-item";

export default {
  name: "CommentList",
  components: { CommentItem },
  props: {
    source: {
      type: [String, Number],
      required: true,
    },
  },
  data() {
    return {
      list: [], // 评论列表
      loading: false, // 上拉加载更多的 loading
      finished: false, // 是否加载结束
      limit: 10,
      offset: null,
      error: false,
    };
  },

  methods: {
    async onLoad() {
      try {
        const res = await getComments({
          type: "a", //  评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
          source: this.source, // 源id，文章id或评论id,【可能有大数字，所以执行一下toString 方法】
          offset: this.offset, // 评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
          limit: this.limit, // 获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量
        });
        this.list.push(...res.data.data.results);
        // 请求完数据以后，loading >> false
        this.loading = false;
        // 说明当前数据的最后一条的id和所有数据最后一条的id相等 >> 没有数据了
        // end_id：所有数据的最后一条
        if (res.data.data.last_id === res.data.data.end_id) {
          this.finished = true;
        } else {
          this.offset = res.data.data.last_id;
        }
      } catch (e) {
        this.error = true;
        this.loading = false;
      }
    },
  },
};
</script>
