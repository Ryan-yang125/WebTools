//obj = new Func(2,3)
//obj = myNew(Func,2,3)
function myNew(func, ...args) {
  var obj = {};
  obj.__proto__ = func.prototype;
  var res = func.apply(obj, args);
  return typeof res === "object" ? res : obj;
}

//test
function foo(a) {
  this.a = a;
}
//
console.log(new foo(1));
console.log(myNew(foo, 1));
