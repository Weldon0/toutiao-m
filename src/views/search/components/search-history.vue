<template>
  <div>
    <van-cell title="搜索历史">
      <template #default>
        <van-tag class="btn" type="danger">全部删除</van-tag>
        <van-tag class="btn" type="success">完成</van-tag>
        <van-icon name="delete"></van-icon>
      </template>
    </van-cell>

    <van-cell title="我是历史记录">
      <template #default> <van-icon name="clear"></van-icon></template>
    </van-cell>
    <van-cell title="我是历史记录">
      <template #default> <van-icon name="clear"></van-icon></template>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: "SearchHistory",
};
</script>

<style lang="less" scoped>
.btn {
  margin-right: 10px;
}
</style>
