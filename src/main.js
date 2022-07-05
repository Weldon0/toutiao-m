import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/styles/index.less";
// vant注册
// 引入vant样式
import Vant from "vant";
import "vant/lib/index.less";

// 引入flexbie插件
import "amfe-flexible";

// 测试一下接口是否可用
import request from "@/utils/request";
request.get("/v1_0/channels").then((res) => {
  console.log(res.data.data.channels);
});

// request.post("url");
// request({
//   method: "GET",
//   params: {},
// });

// request({
//   method: "POST",
//   data: {},
// });

Vue.use(Vant);
// Vue.prototype.$toast = Toast;

// 引入组件
import ToutiaoIcon from "@/components/ToutiaoIcon";

// 注册全局组件
Vue.component("ToutiaoIcon", ToutiaoIcon);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

// rem适配？
// 1、根标签的font-size根据屏幕宽度动态设置
// 2、样式里面单位 px全部换成rem
// 3、rem >> 根标签的font-size
