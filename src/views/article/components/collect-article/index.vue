<template>
  <van-button :loading="loading" class="btn" @click="changeCollected">
    <template #icon>
      <van-icon
        :color="isCollected ? 'red' : ''"
        :name="isCollected ? 'star' : 'star-o'"
      ></van-icon>
    </template>
  </van-button>
</template>
<script>
// value
// input事件
import { addCollect, deleteCollect } from "@/api/article";

export default {
  name: "CollectArticle",
  model: {
    prop: "isCollected",
    event: "changeCollected", // 事件名称自定义了
  },
  props: {
    isCollected: {
      type: Boolean,
      required: true,
    },
    // 文章的id
    artId: {
      type: [String, Number],
    },
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    async changeCollected() {
      this.loading = true;
      //   请求接口修改收藏的状态
      //   判断是否已经收藏chu
      try {
        if (this.isCollected) {
          //  已经收藏 >> 取消收藏
          // console.log(this.arId);
          await deleteCollect(this.artId);
        } else {
          //  没有收藏 >> 去收藏
          await addCollect(this.artId);
        }
        // 修改父组件的收藏状态 >> 界面更新
        this.$emit("changeCollected", !this.isCollected);
        // isCollected 修改前的状态
        this.$toast(this.isCollected ? "取消收藏" : "收藏成功");
        this.loading = false;
      } catch (e) {
        this.loading = false;
      }
    },
  },
  created() {},
};
</script>
<style scoped lang="less">
.btn {
  border: none;
}
</style>
