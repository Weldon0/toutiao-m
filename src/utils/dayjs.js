import dayjs from "dayjs";
// 默认英文
// 注册中文语言包
import "dayjs/locale/zh-cn.js";

// 引入相对时间的包
import relativeTime from "dayjs/plugin/relativeTime";
import Vue from "vue";

// 注册相对时间
dayjs.extend(relativeTime);

// 注册中文语言包
dayjs.locale("zh-cn");

// 当前时间 to 目标时间
// console.log(dayjs().to(dayjs("2021-01-01"))); // 多少年前

// 过滤器
Vue.filter("relativeTime", (value) => {
  return dayjs().to(dayjs(new Date(value)));
});
