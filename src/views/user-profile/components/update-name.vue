<template>
  <div class="update-name">
    <van-nav-bar
      class="nav"
      left-text="取消"
      title="设置昵称"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="submit"
    />
    <van-field
      v-model="message"
      rows="4"
      autosize
      type="textarea"
      maxlength="10"
      placeholder="请输入昵称"
      show-word-limit
    />
  </div>
</template>

<script>
import { updateUserProfile } from "@/api/user";

export default {
  name: "UpdateName",
  props: {
    value: String,
  },
  data() {
    return {
      message: this.value,
    };
  },
  methods: {
    async submit() {
      try {
        await updateUserProfile({
          name: this.message,
        });
        this.$emit("close");
        this.$emit("input", this.message);
      } catch (e) {
        this.$toast.fail("更新昵称失败");
      }
    },
  },
};
</script>

<style scoped lang="less">
.update-name {
  .nav {
    /deep/.van-nav-bar__text {
      color: white;
    }
  }
}
</style>
