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
    >关注
  </van-button>
  <van-button
    @click="follow"
    v-else
    class="follow-btn"
    round
    size="small"
    :loading="isFollowLoading"
    >已关注
  </van-button>
</template>

<script>
import { addFollow, deleteFollow } from "@/api/user";

export default {
  name: "FollowUser",
  props: {
    // 是否关注的状态需要从父组件接收
    isFollowed: {
      type: Boolean,
      required: true,
    },
    // 作者的id，需要从父组件接收
    autId: {
      type: [String, Number],
      required: true,
    },
  },
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
          //  取消关注
          await deleteFollow(this.autId);
        } else {
          //  去关注
          await addFollow(this.autId);
        }
        // 让当前关注的状态取反 >> 界面响应式更新
        // this.article.is_followed = !this.article.is_followed;
        // FIXME: 需要修改
        this.isFollowed = !this.isFollowed;
        // 关注之后进行提示
        this.$notify({
          type: "success",
          message: this.isFollowed ? "关注成功" : "取消关注",
        });

        this.isFollowLoading = false;
      } catch (e) {
        console.log(e);
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
