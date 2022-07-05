import Vue from "vue";
import VueRouter from "vue-router";

// 路由懒加载

// 1000个界面 (有可能第一次加载文件的时候就会很慢)
// 用户只能同时看一个界面 >> 只把用户当前访问的界面返回给用户

// 第一种 直接引入登录组件 同步加载路由（按需）
// 只要页面已刷新，所有的页面数据全部一次性加载
// import Login from "@/views/Login";

// 第二种 直接import('路径') 路由的懒加载
// 访问到某一个路由的时候再去加载当前路由文件

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    component: () => import("@/views/Login/index.vue"),
    name: "Login",
  },
];

// 登录的组件和路由
const router = new VueRouter({
  routes,
});

export default router;
