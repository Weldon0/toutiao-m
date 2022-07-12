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
    <SearchResult :searchText="searchText" v-if="isShowResult" />
    <!--搜索建议列表组件-->
    <SearchSuggestion
      @onSearch="onSearch"
      :searchText="searchText"
      v-else-if="searchText"
    />
    <!--搜索历史组件-->
    <SearchHistory v-else />
  </div>
</template>

<script>
import SearchHistory from "@/views/search/components/search-history";
import SearchSuggestion from "@/views/search/components/search-suggestion";
import SearchResult from "@/views/search/components/search-result";
export default {
  name: "SearchPage",
  components: { SearchResult, SearchSuggestion, SearchHistory },
  props: {},
  data() {
    return {
      searchText: "",
      isShowResult: false, // 是否展示搜索结果页面
    };
  },
  computed: {},
  watch: {},
  created() {},
  methods: {
    onSearch(value) {
      // 默认 >> 搜索历史
      // 如果输入框有内容 >> 所搜建议
      // 按下回车 >> 搜索结果
      console.log("开始搜索");
      this.searchText = value;
      this.isShowResult = true;
    },
    onCancel() {
      console.log("点击了取消");
    },
  },
};
</script>

<style scoped></style>
