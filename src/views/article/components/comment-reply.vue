<template>
  <div class="comment-reply">
    <van-nav-bar title="回复" @click-left="$emit('close')">
      <template #left>
        <van-icon color="white" name="cross" />
      </template>
    </van-nav-bar>
    <comment-item :comment="currentComment" />
    <van-cell title="评论回复" :border="false"></van-cell>
    <comment-list type="c" :list="list" :source="currentComment.com_id" />
    <!-- 底部区域 -->
    <div class="reply-bottom">
      <van-button
        class="write-btn"
        size="small"
        round
        @click="isPostShow = true"
      >
        写评论
      </van-button>
    </div>
    <!-- /底部区域 -->

    <!-- 发布评论 -->
    <van-popup v-model="isPostShow" position="bottom">
      <comment-post
        @postSuccess="postSuccess"
        type="c"
        :target="currentComment.com_id"
      />
    </van-popup>
    <!-- /发布评论 -->
  </div>
</template>

<script>
import CommentItem from "@/views/article/components/comment-item";
import CommentList from "@/views/article/components/comment-list";
import CommentPost from "@/views/article/components/comment-post";
export default {
  name: "CommentReply",
  components: { CommentPost, CommentList, CommentItem },
  props: {
    currentComment: Object,
  },
  data() {
    return {
      list: [],
      isPostShow: false,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    postSuccess(comment) {
      //  发布评论成功以后
      this.isPostShow = false;
      this.list.unshift(comment);
      this.currentComment.reply_count++;
    },
  },
};
</script>
<style scoped lang="less">
.reply-bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 88px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-top: 1px solid #d8d8d8;
  .write-btn {
    width: 60%;
  }
}
</style>
