<template>
  <div class="search-container">
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isShowResult = false"
      />
    </form>

    <!--搜索结果页面-->
    <SearchResult name="aa" :searchText="searchText" v-if="isShowResult" />
    <!--搜索建议列表组件-->
    <SearchSuggestion
      @onSearch="onSearch"
      :searchText="searchText"
      v-else-if="searchText"
    />
    <!--搜索历史组件-->
    <SearchHistory
      @deleteAll="searchHistories = []"
      @onSearch="onSearch"
      v-else
      :searchHistories="searchHistories"
    />
  </div>
</template>

<script>
import SearchHistory from "@/views/search/components/search-history";
import SearchSuggestion from "@/views/search/components/search-suggestion";
import SearchResult from "@/views/search/components/search-result";
import { getLocal, setLocal } from "@/utils/storage";
import { HISTORYKEY } from "@/constants";
export default {
  name: "SearchPage",
  components: { SearchResult, SearchSuggestion, SearchHistory },
  props: {},
  data() {
    return {
      searchText: "",
      isShowResult: false, // 是否展示搜索结果页面
      searchHistories: getLocal(HISTORYKEY) || [], // 搜索历史列表
    };
  },
  computed: {},
  watch: {
    // 搜索历史持久化
    // 监听了搜索历史记录数据的变化
    // 发生了变化的时候，把最新的数据存到本地存储
    // 注意：获取默认值的时候，从本地存储获取数据
    searchHistories(val) {
      setLocal(HISTORYKEY, val);
    },
  },
  created() {},
  methods: {
    onSearch(value) {
      // 默认 >> 搜索历史
      // 如果输入框有内容 >> 所搜建议
      // 按下回车 >> 搜索结果
      console.log("开始搜索");
      this.searchText = value;
      // 搜索结果页面展示
      this.isShowResult = true;
      // 添加之前，先判断value是否已经在搜索历史列表里面
      const index = this.searchHistories.indexOf(value); // index = -1 不存在
      if (index !== -1) {
        // 找到的这项删除
        this.searchHistories.splice(index, 1);
      }
      this.searchHistories.unshift(value);
    },
    onCancel() {
      console.log("点击了取消");
      this.$router.push("/home");
    },
  },
};
</script>

<style scoped></style>
