//func.bind(this,12,3)(4)
//
var slice = Array.prototype.slice;
Function.prototype.myBind = function (context, ...partialArgs) {
  let func = this;
  let bounded = function (...args) {
    return func.apply(this instanceof bounded ? this : context || Window, [
      ...partialArgs,
      ...args,
    ]);
  };
  bounded.prototype = Object.create(func.prototype);
  return bounded;
};
var obj = {};
function foo(a, b, c) {
  this.sum = a + b + c;
}
let bounded = foo.bind(obj, 1);
let bObj = new bounded(2, 3);
console.log(bObj instanceof bounded);
console.log(bObj instanceof foo);
console.log(bObj.__proto__.__proto__ === foo.prototype);
console.log(bObj.__proto__ === bounded.prototype);
console.log(obj);
console.log(bObj);
