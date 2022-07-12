<template>
  <div>
    <van-cell
      @click="hancleClick(item)"
      :key="index"
      v-for="(item, index) in list"
      icon="search"
    >
      <template #title>
        <div v-html="highLight(item)"></div>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestion } from "@/api/search";
import { debounce } from "lodash";

export default {
  props: {
    searchText: String,
  },
  data() {
    return {
      list: [],
    };
  },
  watch: {
    // 监听搜索内容的变化 >> 发送请求获取搜索建议列表数据
    searchText: {
      handler: debounce(function (value) {
        this.getSuggestion(value);
      }, 500),
      immediate: true, // 首次也需要监听
    },
  },
  name: "SearchSuggestion",
  methods: {
    highLight(item) {
      const reg = new RegExp(this.searchText, "gi");
      return item.replace(
        reg,
        (target) => `<span style="color: red">${target}</span>`
      );
      // return item.replace(
      //   reg,
      //   `<span style="color: red">${this.searchText}</span>`
      // );
    },
    hancleClick(value) {
      console.log(value);
      this.$emit("onSearch", value);
    },
    async getSuggestion(q) {
      const res = await getSearchSuggestion(q);
      this.list = res.data.data.options;
    },
  },
};

// arr.forEach((item) => {
//   console.log(item);
// });
//
// Arrary.prototype.forEach = function (fn) {
//   for (let i = 0; i < this.length; i++) {
//     fn(this[i], i, this);
//   }
// };

// Array.prototype.myMap = function (fn) {
//   const arr = [];
//   this.forEach((item, index) => {
//     arr.push(fn(item, index, this));
//   });
//   return arr;
// };

// Array.prototype.myFilter = function (fn) {
//   const arr = [];
//   this.forEach((item, index) => {
//     const flag = fn(item, index, this);
//     if (flag) arr.push(item);
//   });
//   return arr;
// };
// const arr = [2, 3];

// arr.myFilter(function (item, index) {
//   console.log(item);
//   console.log(index);
//   return true;
// });

// arr.filter()
</script>
