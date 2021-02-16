//func.call(thisArg,arg1,arg2)
Function.prototype.myCall = function (context = Window, ...args) {
  let fn = Symbol("fn");
  context[fn] = this;
  const res = context[fn](...args);
  delete context[fn];
  return res;
};
//func.apply(thisArg,[])
Function.prototype.myApply = function (context = Window, args) {
  let fn = Symbol("fn");
  context[fn] = this;
  const res = context[fn](...args);
  delete context[fn];
  return res;
};

//test
const obj = { a: 1 };
function foo(num) {
  console.log(this);
}
console.log(foo.myCall(obj, 2));
console.log(obj);
