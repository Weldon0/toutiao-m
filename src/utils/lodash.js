import differenceBy from "lodash/differenceBy";
import debounce from "lodash/debounce";

export { differenceBy, debounce };

// 通过数组索引号修改了数组，界面会不会响应更新？
// 数组/对象 的响应式  vue里面是怎么处理的？
// $set(arr, index, 'newValue') 可以响应式更新
// 不会
// vue监听不到

// 对象 >> Object.defineProperty >>  get set
// 数组 >> 替换了数组方法 >> push unshift pop splice

// data() {arr: []}
// this.arr.push(1) >> 界面可以更新
// >> 劫持数组方法 >> 检测到数据更新 >> 执行更新界面的操作了

// vue重写的数组方法 原有数组方法区别
// vue >> 调用原有的数组方法 >> 修改数据 + 执行界面的更新

// 对象新添加了一项数据，vue是监听不到的
// 为什么监听不到？

// vue >> data初始化的时候,会进行递归Object.defineProperty劫持，才能去监听
// Object.defineProperty(obj, "obj", {
//   get() {},
//   set() {},
// });
// Object.defineProperty(obj, "allChannels", {
//   get() {},
//   set() {},
// });

// 父子组件嵌套 >> 生命周期？

// 挂载阶段 >> 4 >> 8

// >> 父beforeCreate >> 初始化之前
// >> 父created  >> 挂载属性/方法
// >> 父beforeMount >> 开始解析模板

// >> 儿子beforeCreate
// >> 儿子created
// >> 儿子beforeMount
// >> 儿子mounted
// >> 父mounted
// Parent

// 数组方法 >>
