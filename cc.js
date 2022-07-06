// const a = {}; // 容器
//
// // a.c = "1";
// // a.d = "2";
// //
// // console.log(a.c);
//
// const c = {}; // [Object, object]
// const d = {
//   name: "黑马",
// };
//
// // 对象的key不能是对象
// // const obj = {
// //   // {}: {}
// // };
// // a.c = "2";
// a[c] = "1"; // { [Object, object]: 2}
// a[d] = "2";
//
// console.log(a);
//
// console.log(a[c]); // ?打印什么？为什么 1?

// const a = {};
// const b = [2, 3];
// const d = [2, 3];
//
// console.log(b.toString());
// console.log(d.toString());
//
// a[b] = "1";
// a[d] = "2";
//
// console.log(a[b]); // 1 2

// 判断数据类型
// instansof
// typeof
// Array.isArray
// Object.prototype.toString();
//
// const b = {};
// b.toString(); // [object, Array]

const a = {};
// Object.prototype.toString()
a.toString(); // [object, object] this >> a

// Array.prototye.toString
const bb = [];
bb.toString();
