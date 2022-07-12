<template>
  <div class="channel-edit">
    <van-cell style="text-align: center" title="频道编辑"></van-cell>
    <van-cell title="我的频道" :border="false">
      <template #default>
        <van-button
          @click="isEdit = !isEdit"
          class="edit-btn"
          plain
          round
          size="mini"
          type="danger"
        >
          <!--          编辑-->
          {{ isEdit ? "完成" : "编辑" }}
        </van-button>
      </template>
    </van-cell>
    <van-grid class="my-channel" :gutter="10">
      <van-grid-item
        class="channel-item"
        v-for="(value, index) in userChannels"
        :key="value.id"
        @click="onMyChannelClick(value, index)"
      >
        <template #icon v-if="isEdit && index !== 0">
          <van-icon name="clear" />
        </template>
        <template #text>
          <span class="text" :class="{ active: active === index }">
            {{ value.name }}
          </span>
        </template>
      </van-grid-item>
    </van-grid>
    <van-cell title="推荐频道" :border="false"></van-cell>
    <van-grid class="recommend-channel" direction="horizontal" :gutter="10">
      <van-grid-item
        icon="plus"
        class="channel-item"
        v-for="item in recommendChannels"
        :key="item.id"
        @click="addChannel(item)"
      >
        <template #text>
          <span class="text">{{ item.name }}</span>
        </template>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
// 出效果 ？

import {
  deleteUserChannel,
  fetchAddChannel,
  fetchAllChannels,
} from "@/api/channel";
import differenceBy from "lodash/differenceBy";
import { Notify } from "vant";
import { mapState } from "vuex";
import { setLocal } from "@/utils/storage";
import { USERCHANNELKEY } from "@/constants";

export default {
  name: "ChannelEdit",
  components: {},
  props: {
    userChannels: {
      type: Array,
      default: () => [],
    },
    active: {
      type: Number,
    },
  },
  data() {
    return {
      allChannels: [],
      isEdit: false,
    };
  },
  computed: {
    recommendChannels() {
      // 不要进行任何的异步操作
      return differenceBy(this.allChannels, this.userChannels, "id");
    },
    ...mapState(["user"]), // this.$store.state.user
    // user: function () {
    //   return this.$store.state.user;
    // },
    // count: function () {
    //   return this.$store.state.count;
    // },
    // user() {
    //   return this.$store.state.user;
    // },
    // recommendChannels() {
    //   // 从所有的频道数据里面，找到我的频道数据 >> 过滤掉
    //   return this.allChannels.filter((item) => {
    //     // 返回true >> 留下来了
    //     //  什么样的数据才是满足条件的？
    //
    //     // >> 如果找到了 >> true
    //     // 如果所有频道里面的item在userChannels里面招到了，当前项就被保存
    //     return !this.userChannels.some((userItem) => userItem.id === item.id);
    //   });
    // },
  },
  created() {
    this.getAllChannels();
  },
  methods: {
    async deleteChannel(channel) {
      // 想要删除的频道项
      try {
        if (this.user) {
          //  从接口删除
          await deleteUserChannel(channel.id);
        } else {
          //  修改之后的数据存储到本地存储
          setLocal(USERCHANNELKEY, this.userChannels);
        }
        this.$toast("删除成功");
      } catch (e) {
        this.$toast("删除失败");
      }
    },
    onMyChannelClick(channel, index) {
      //   1、判断是否处于编辑状态
      if (this.isEdit) {
        // 出于编辑状态
        if (index === 0) return Notify({ type: "danger", message: "不让删除" });
        if (index <= this.active) {
          // 如果index小于选中项 >> 手动让选中项 - 1
          this.$emit("changeActive", this.active - 1, true);
        }
        // 从代码里面删除了数组的某一项
        this.userChannels.splice(index, 1);
        //  持久化
        this.deleteChannel(channel);
      } else {
        // 非编辑状态
        // >> 1、切换
        // >> 2、关弹层
        this.$emit("changeActive", index, false);
      }
    },
    async addChannel(channel) {
      // 子组件不允许修改父组件的数据
      this.userChannels.push(channel);
      //  持久化
      //  本地存储 >> 未登录
      //  线上服务器 >> 已登录
      //  判断是否登录 >> token >> vuex里面取值
      if (this.user) {
        try {
          //  已经登录了 >> 请求接口添加频道
          await fetchAddChannel({
            id: channel.id,
            seq: this.userChannels.length,
          });
          // >> 如果添加成功进行成功的提示
          this.$toast("添加频道成功");
        } catch (e) {
          this.$toast("添加失败");
        }
      } else {
        //  未登录
        // 修改之后的个人频道数据存储到本地存储
        setLocal(USERCHANNELKEY, this.userChannels);
      }
    },
    async getAllChannels() {
      const res = await fetchAllChannels();
      this.allChannels = res.data.data.channels;
    },
  },
};
</script>

<style scoped lang="less">
.channel-edit {
  .edit-btn {
    width: 100px;
  }

  .channel-item .text {
    font-size: 24px;
    color: #222;
    margin-top: 0;

    &.active {
      color: red;
    }
  }

  /deep/ .channel-item .van-grid-item__content {
    background-color: #f4f5f6;
  }

  /deep/ .recommend-channel {
    .van-icon-plus {
      color: #222;
      font-size: 30px;
      margin-right: 5px;
    }
  }

  .my-channel {
    /deep/ .van-icon-clear {
      position: absolute;
      font-size: 20px;
      right: -10px;
      top: -10px;
      color: #cacaca;
    }

    .channel-item {
      /deep/ .van-grid-item__icon-wrapper {
        position: unset;
      }
    }
  }
}
</style>
