<template>
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button :disabled="!message.length" class="post-btn" @click="onPost"
      >发布</van-button
    >
  </div>
</template>

<script>
import { addComment } from "@/api/comment";

export default {
  name: "CommentPost",
  props: {
    target: {
      type: [String, Number],
      required: true,
    },
  },
  data() {
    return {
      message: "",
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onPost() {
      // loading效果
      this.$toast.loading({
        duration: 0, // 表示toast不会消失
        forbidClick: true, // 禁用背景点击
      });
      try {
        // 点击发布评论的时候调用接口发布评论
        const res = await addComment({
          target: this.target, // 评论目标id（评论文章即文章id，对评论进行回复则为评论id） 防止有大数字最好也执行一下toString方法！
          content: this.message, // 评论内容
          art_id: null, // 文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数。
        });
        // 成功的提示
        this.$toast.success("发布评论成功");

        // Res里面有当前的文章评论对象
        // 某一个数据报错了，找到这个数据的源头

        // 1、关闭弹层
        this.$emit("postSuccess", res.data.data.new_obj);
        // TODO: 发布成功以后的处理
        console.log(res);
      } catch (e) {
        this.$toast.success("发布评论失败");
        console.log(e);
      }
    },
  },
};
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;

  .post-field {
    background-color: #f5f7f9;
  }

  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;

    &::before {
      display: none;
    }
  }
}
</style>
