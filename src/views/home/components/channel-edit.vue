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

import { fetchAllChannels } from "@/api/channel";
import differenceBy from "lodash/differenceBy";
import { Notify } from "vant";

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
    onMyChannelClick(channel, index) {
      // console.log(channel, index);
      //   1、判断是否处于编辑状态
      if (this.isEdit) {
        // 出于编辑状态
        if (index === 0) return Notify({ type: "danger", message: "不让删除" });
        if (index <= this.active) {
          // 如果index小于选中项 >> 手动让选中项 - 1
          this.$emit("changeActive", this.active - 1, true);
        }
        this.userChannels.splice(index, 1);
      } else {
        // 非编辑状态
        // >> 1、切换
        // >> 2、关弹层
        this.$emit("changeActive", index, false);
      }
    },
    addChannel(channel) {
      // 子组件不允许修改父组件的数据
      this.userChannels.push(channel);
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
