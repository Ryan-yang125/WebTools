/*
 * @Author: Yang Rui
 * @Date: 2021-01-02 17:57:16
 * @LastEditTime: 2021-01-02 20:44:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /jsprac/Function.prototype.bind/bind.js
 */
//Polyfill
if (!Function.prototype.bind)
  (function () {
    var slice = Array.prototype.slice;
    Function.prototype.bind = function () {
      var thatFunc = this,
        thatArg = arguments[0];
      var args = slice.call(arguments, 1);
      if (typeof this !== "function")
        throw new TypeError(
          "Function.prototype.bind - " +
            "what is trying to be bound is not callable"
        );
      return function () {
        var funcArgs = args.concat(slice.call(arguments));
        return thatFunc.apply(thatArg, funcArgs);
      };
    };
  })();

// function foo(x, y) {
//   return x + y;
// }
// var bar = foo._bind(null, 1);
// console.log(bar(2));
