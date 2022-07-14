<template>
  <van-button
    v-if="!isFollowed"
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    @click="follow"
    :loading="isFollowLoading"
  >
    关注
  </van-button>
  <van-button
    @click="follow"
    v-else
    class="follow-btn"
    round
    size="small"
    :loading="isFollowLoading"
  >
    已关注
  </van-button>
</template>

<script>
import { addFollow, deleteFollow } from "@/api/user";

export default {
  name: "FollowUser",
  // 自定义父组件通过v-model传递过来的属性的key，事件的名称
  model: {
    prop: "isFollowed", // key >> value >> ?
    event: "changeFollowed", // 自定义事件的名称 >> input >> ?
  },
  props: {
    // 是否关注的状态需要从父组件接收
    // 作者的id，需要从父组件接收
    autId: {
      type: [String, Number],
      required: true,
    },
    isFollowed: {
      type: [Boolean],
    },
  },
  // 组件添加v-model
  // 目的：允许子组件直接修改父组件的值
  // 1、把值通过value属性传递给子组件 >> 子组件可以props(value)属性接收
  // 2、提供子组件一个input事件 >> 修改v-model后面的值的
  data() {
    return {
      isFollowLoading: false,
    };
  },
  methods: {
    async follow() {
      // sentry 错误上报
      this.isFollowLoading = true;
      try {
        // 调用接口，关注/取消关注 当前作者
        if (this.isFollowed) {
          // this.article.is_followed
          //  取消关注
          await deleteFollow(this.autId);
        } else {
          //  去关注
          await addFollow(this.autId);
        }
        // 让当前关注的状态取反 >> 界面响应式更新
        // this.article.is_followed = !this.article.is_followed;
        // FIXME: 需要修改
        // this.isFollowed = !this.isFollowed;
        // 通过自定义事件修改isFollow
        this.$emit("changeFollowed", !this.isFollowed);
        // 关注之后进行提示
        this.$notify({
          type: "success",
          message: this.value ? "取消关注" : "取消关注",
        });

        this.isFollowLoading = false;
      } catch (e) {
        this.$notify({
          type: "danger",
          message: "操作失败",
        });

        this.isFollowLoading = false;
      }
    },
  },
};
</script>
