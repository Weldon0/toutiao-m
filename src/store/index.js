import Vue from "vue";
import Vuex from "vuex";
import { getLocal, setLocal } from "@/utils/storage";

Vue.use(Vuex);
const tokenKey = "toutiao_token";

export default new Vuex.Store({
  // 用于存储全局状态数据
  state: {
    user: getLocal(tokenKey),
  },
  getters: {},
  // 修改状态的唯一入口
  // 只允许有同步状态
  mutations: {
    // 修改state里面的user数据的方法
    setUser(state, user) {
      // 存储vuex中
      state.user = user;
      // 存储本地存储
      // localStorage.setItem(tokenKey, JSON.stringify(user));
      setLocal(tokenKey, user);
    },
  },
  // 异步状态修改
  actions: {},
  modules: {},
});

// vuex全局状态管理工具
// 解决跨组件传值混乱问题
// state定义仓库的状态
// 第一种获取数据的方法：$store可以直接获取仓库状态
// 第二种获取数据方法：mapState([...'key']) 仓库状态 >> 组件中
// 修改数据：>> $store.commit('')触发mutations修改state
