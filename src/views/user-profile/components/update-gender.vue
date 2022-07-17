<template>
  <van-picker
    title="修改性别"
    show-toolbar
    :columns="columns"
    @confirm="onConfirm"
    @cancel="onCancel"
    :default-index="value"
  />
</template>

<script>
import { updateUserProfile } from "@/api/user";

export default {
  name: "UpdateGender",
  props: ["value"],
  data() {
    return {
      columns: ["女", "男"],
    };
  },
  methods: {
    async onConfirm(...[, index]) {
      // 单例模式 >> 设计模式
      this.$toast.loading({
        duration: 0, // 一直展示
        forbidClick: true,
        message: "加载中..",
      });
      // 已经拿到选择的性别了
      // 提交服务器
      try {
        await updateUserProfile({
          gender: index,
        });
        this.$toast.success("修改性别成功");
        this.$emit("close");
        //  通知父组件修改本地数据 >> 界面更新
        this.$emit("input", index);
      } catch (e) {
        this.$toast.fail("更新失败");
      }
    },
    onCancel() {
      // 点击取消 关闭弹层
      this.$emit("close");
    },
  },
};
</script>
