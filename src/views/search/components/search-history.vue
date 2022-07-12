<template>
  <div>
    <van-cell title="搜索历史">
      <template #default>
        <template v-if="isDeleteStatus">
          <van-tag class="btn" type="danger" @click="deleteAll"
            >全部删除</van-tag
          >
          <van-tag class="btn" type="success" @click="isDeleteStatus = false"
            >完成</van-tag
          >
        </template>
        <van-icon
          v-else
          name="delete"
          @click="isDeleteStatus = true"
        ></van-icon>
      </template>
    </van-cell>

    <van-cell
      :title="item"
      v-for="(item, index) in searchHistories"
      :key="index"
      @click="clickHistoryItem(item, index)"
    >
      <template #default v-if="isDeleteStatus">
        <van-icon name="clear"></van-icon
      ></template>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: "SearchHistory",
  props: {
    searchHistories: Array,
  },
  data() {
    return {
      isDeleteStatus: false,
    };
  },
  methods: {
    deleteAll() {
      // this.searchHistories = []; // ?
      //  通过自定义事件、让父组件进行删除的操作
      this.$emit("deleteAll");
    },
    clickHistoryItem(item, index) {
      //  点击了历史项的时候，需要添加判断
      //  如果处于删除状态，点击就是删除当前项
      //  如果不处于删除状态，点击去搜索
      if (this.isDeleteStatus) {
        //  删除
        this.searchHistories.splice(index, 1);
      } else {
        //  去搜索
        this.$emit("onSearch", item);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.btn {
  margin-right: 10px;
}
</style>
