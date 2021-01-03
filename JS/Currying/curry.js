/*
 * @Author: Yang Rui
 * @Date: 2021-01-02 17:08:34
 * @LastEditTime: 2021-01-02 21:48:12
 * @LastEditors: Please set LastEditors
 * @Description: Currying function
 * @FilePath: /jsprac/Currying/curry.js
 */
// 初始化版
// const _curry = (fn) => (...args) => fn.bind(null, ...args);
//进阶版
function curry(fn) {
  if (arguments.length - 1 < fn.length) {
    return curry.bind(null, ...arguments); //partial function
  } else {
    return fn.apply(null, Array.prototype.slice.call(arguments, 1));
  }
}
//完整版 可以使用 '_'占位符号
const sum = (a, b, c) => a + b + c;
const curriedSum = curry(sum);
console.log(sum(1, 2, 3));
console.log(curriedSum(1, 2, 3));
console.log(curriedSum(1, 2)(3));
console.log(curriedSum(1)(2)(3));
