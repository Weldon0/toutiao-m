<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      title="黑马头条"
      @click-left="$router.back()"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="loading">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-else-if="article.art_id">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ article.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="article.aut_photo"
          />
          <div slot="title" class="user-name">{{ article.aut_name }}</div>
          <div slot="label" class="publish-date">
            {{ article.pubdate | relativeTime }}
          </div>
          <FollowUser :autId="article.aut_id" v-model="article.is_followed" />
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
          ref="content"
          class="article-content markdown-body"
          v-html="article.content"
        ></div>
        <van-divider>正文结束</van-divider>

        <!-- 评论组件-->
        <comment-list :source="article.art_id" />
        <!-- 评论组件-->

        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button class="comment-btn" type="default" round size="small">
            写评论
          </van-button>
          <van-icon name="comment-o" :badge="article.comm_count" color="#777" />
          <!-- 收藏的icon-->
          <CollectArticle
            :artId="article.art_id"
            v-model="article.is_collected"
          />
          <like-article v-model="article.attitude" :artId="article.art_id" />
          <van-icon
            @click="showShowShare = true"
            name="share"
            color="#777777"
          ></van-icon>
        </div>
        <!-- /底部区域 -->
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="isNotFound">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="getArticleDetail">
          点击重试
        </van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>

    <!--      分享面板-->
    <Share :showShowShare.sync="showShowShare" />
    <!--      面板-->
  </div>
</template>

<script>
import { getArticleById } from "@/api/article";
// 引入美化markdown的样式文件
import "github-markdown-css";
import { ImagePreview } from "vant";
import FollowUser from "@/views/article/components/follow-user";
import CollectArticle from "@/views/article/components/collect-article";
import LikeArticle from "@/views/article/components/like-article";
import Share from "@/views/article/components/share";
import CommentList from "@/views/article/components/comment-list";

// yarn add github-markdown-css -S
// 当前文件通过import 'github-markdown-css' 引入 >> 不需要加路径
// 内容添加类名 markdown-body

// 重启一下

export default {
  name: "ArticleIndex",
  components: {
    CommentList,
    Share,
    LikeArticle,
    CollectArticle,
    FollowUser,
  },
  props: {
    // 使用props获取动态路由的数据
    articleId: {
      type: [Number, String],
      required: true,
    },
  },
  data() {
    return {
      isNotFound: false, // 标识当前是不是404状态
      loading: false, // 文章加载状态
      showShowShare: false,
      /**
       * @type {ArticleDetail.Data}
       */
      article: {}, // 文章对象
      isFollowLoading: false,
    };
  },
  computed: {},
  watch: {},
  created() {
    this.getArticleDetail();
  },
  mounted() {},
  methods: {
    previewImg() {
      // 获取所有的img图片
      //  src属性
      //  push到一个新的数组里面
      // 获取到界面所有的图片dom结构
      const imgs = this.$refs.content.querySelectorAll("img");

      //  存储所有图片的路径数组
      const images = [];

      // 逻辑错误
      // 登录401
      // >> token >> 网络请求
      // >>

      // 遍历dom结构获取图片链接，存入数组
      imgs.forEach((item, index) => {
        images.push(item.src);
        item.addEventListener("click", function () {
          // 事件内部开始展示图片预览功能
          ImagePreview({
            images: images,
            startPosition: index, // 指定图片的起始位置 >> 图片的index
          });
        });
      });
    },
    async getArticleDetail() {
      this.loading = true;
      try {
        const res = await getArticleById(this.articleId);
        this.article = res.data.data;

        // 已经成功获取到了数据
        // 绑定图片预览功能 >> img图片
        this.loading = false;
        // 因为界面的更新是异步的
        // 所以修改完数据以后，直接获取最新的dom结构是获取不到的
        // 需要通过$nextTick在界面更新完毕以后再去获取才可以
        // $nextTick: 界面更新完毕以后想要拿到最新的dom结构就可以使用这个api

        this.$nextTick(() => {
          this.previewImg();
        });
      } catch (e) {
        console.log(e);
        this.loading = false;
        // 判断当前是不是404状态
        console.log(e);
        this.isNotFound = e?.response?.status === 404;
      }
    },
  },
};
</script>

<style scoped lang="less">
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }

  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;

      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }

      .van-cell__label {
        margin-top: 0;
      }

      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }

      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }

      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;

      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;

    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }

    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }

    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;

    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }

    .van-icon {
      font-size: 40px;

      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
