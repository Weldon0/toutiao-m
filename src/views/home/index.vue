<template>
  <div class="home-container">
    <van-nav-bar fixed>
      <template #title>
        <van-button
          icon="search"
          block
          class="search-btn"
          size="small"
          type="info"
          round
          >搜索
        </van-button>
      </template>
    </van-nav-bar>
    <!--    频道列表-->
    <van-tabs swipeable animated v-model="active" class="channel-tabs">
      <van-tab v-for="item in userChannels" :key="item.id" :title="item.name">
        <ArticleList :channel="item" />
      </van-tab>
      <template #nav-right>
        <div class="placeholder"></div>
        <div class="hamburger-btn">
          <ToutiaoIcon icon="gengduo" />
        </div>
      </template>
    </van-tabs>
  </div>
</template>

<script>
import { getUserChannels } from "@/api/channel";
import ArticleList from "@/views/home/components/article-list";

export default {
  name: "HomePage",
  components: { ArticleList },
  props: {},
  data() {
    return {
      active: 0,
      /**
       * @type {{name: string, id: string}[]}
       */
      userChannels: [],
      list: {
        0: [],
        1: [], // html
        2: [],
      }, // 文章列表
    };
  },
  computed: {},
  watch: {},
  created() {
    this.handleGetUserChannel();
  },
  mounted() {},
  methods: {
    // 获取用户频道数据
    async handleGetUserChannel() {
      const res = await getUserChannels();
      this.userChannels = res.data.data.channels;
    },
  },
};
</script>

<style scoped lang="less">
.home-container {
  padding-top: 174px;
  padding-bottom: 100px;

  /deep/ .van-nav-bar__title {
    width: 80%;
    max-width: unset;
  }

  .van-nav-bar .van-icon {
    color: #fff;
  }

  .search-btn {
    background-color: #5babfb;
    border: none;
  }

  // 设置tabs的样式
  /deep/ .channel-tabs {
    .van-tabs__wrap {
      position: fixed;
      top: 92px;
      z-index: 1;
      left: 0;
      right: 0;
      height: 82px;
    }

    .van-tab {
      border-right: 1px solid #edeff3;
      min-width: 200px;
      height: 80px;

      .van-tab__text {
        font-size: 27px;
        color: #777777;
      }
    }

    .placeholder {
      flex-shrink: 0;
      width: 66px;
      height: 82px;
    }

    .van-tab--active .van-tab__text {
      color: #333 !important;
    }

    .van-tabs__line {
      width: 31px !important;
      height: 6px;
      background: rgba(50, 150, 250, 1);
      border-radius: 3px;
      bottom: 8px;
    }

    .van-tabs__nav {
      padding: 0;
    }
  }

  .hamburger-btn {
    position: fixed;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 66px;
    height: 82px;
    background-color: #fff;
    opacity: 0.902;

    /deep/ i.toutiao {
      font-size: 33px;
    }
  }
}
</style>
