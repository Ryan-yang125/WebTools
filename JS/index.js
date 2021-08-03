let a = 1
function foo(x) {
  return x*2
}

console.log(foo(a+5))

//
function thunk() {
  return a + 5
}

function bar(thunk) {
  thunk()*2
}