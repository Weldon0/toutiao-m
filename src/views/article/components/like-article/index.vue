<template>
  <van-button
    :icon="value === 1 ? 'good-job' : 'good-job-o'"
    class="btn"
    :class="{ liked: value === 1 }"
    :loading="loading"
    @click="onLike"
  />
</template>
<script>
import { addLike, deleteLike } from "@/api/article";

export default {
  name: "LikeArticle",
  props: {
    // 接收对文字的态度
    value: {
      type: Number,
      required: true,
    },
    artId: {
      type: [String, Number],
      required: true,
    },
  },
  data() {
    return {
      // 加载中变量控制
      loading: false,
    };
  },
  methods: {
    async onLike() {
      this.loading = true;
      try {
        let status = -1;
        if (this.value === 1) {
          // 已点赞，要取消点赞
          await deleteLike(this.artId);
        } else {
          // 没有点赞，要添加点赞
          await addLike(this.artId);
          status = 1;
        }

        // 更新视图
        this.$emit("input", status);
        this.$toast.success(status === 1 ? "点赞成功" : "取消点赞");
      } catch (err) {
        console.log(err);
        this.$toast.fail("操作失败，请重试！");
      }
      this.loading = false;
    },
  },
  created() {},
};
</script>
<style scoped lang="less">
.liked {
  .van-icon {
    color: #e5645f;
  }
}

.btn {
  border: none;
}
</style>
