/*
 * @Author: your name
 * @Date: 2020-10-07 23:19:18
 * @LastEditTime: 2020-12-27 22:35:13
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /jsPrac/index.js
 */
console.log("hahahehheheh");
//excutor立即执行,reject和resolve只是同步的（当然我们通常处理完成异步函数后调用它）
//但这里promise通过.then 和 .catch 把里面的回调处理函数 放到microqueue里面，(一定是这个时候注册的！)
//然后立刻返回一个新的promise对象，且之后基于上一个里的回调函数处理结果
//当然也可以主动返回进行多个异步的按顺序嵌套)
//等待调用栈空了
//根据state处理then and catch这两个普通的callback
//可是它怎么知道前面处理完了？空了就进去，pending就出来，resolved就处理是吗
//想不通我需要source code！
let p = new Promise((res, rej) => {
  res(1);
});
Promise.all([]);
p.then((m) => {
  console.log(m.toLowerCase());
});
//success, faild
// demo.then(
//   () => {},
//   () => {}
// );
// //success
// demo.then(() => {});
// //faild
// demo.then(null, () => {});
// //faild
// demo.catch(() => {});
/**
 * I'm first
 * Macro0
 * Micro0s
 * Micro2
 * I'm Macro
 * failed
 */
export default class abc {}
