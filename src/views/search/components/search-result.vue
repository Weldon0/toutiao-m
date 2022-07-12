<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <article-item :article="item" v-for="item in list" :key="item.art_id" />
    </van-list>
  </div>
</template>

<script>
import { getSearch } from "@/api/search";
import ArticleItem from "@/components/article-item";

export default {
  name: "SearchResult",
  components: { ArticleItem },
  props: {
    searchText: {
      type: String,
    },
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      perPage: 10,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    // 父子组件传值
    // 如果props已经显示的声明了，不会出现在$attrs里面了
    // console.log(this.$attrs);
  },
  methods: {
    async onLoad() {
      const res = await getSearch({
        page: this.page, // 页码
        per_page: this.perPage, // 每页大小
        q: this.searchText, // 搜索关键字
      });
      console.log(res);
      // this.list = [...this.list, ...res.data.data.results];
      this.list.push(...res.data.data.results);
      this.loading = false;

      if (res.data.data.results.length) {
        this.page++;
      } else {
        this.finished = true;
      }
    },
  },
};
</script>

<style scoped lang="less"></style>
