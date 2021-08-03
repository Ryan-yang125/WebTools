// 感觉和curry一样啊，都是多参数函数，通过将每个参数分割，保存前面的状态
// 而且还很弱
// 不过感觉thunk的重点在重复执行，所以thunk其实是curry的一个子集
function readFile(a, callback) {
  console.log(a)
  setTimeout(callback,1000)
}
function thunk(fn) {
  return function() {
    let ctx = this
    const args = Array.prototype.slice.call(arguments)
    return function(cb) {
      args.push(cb)
      return fn.apply(ctx, args)
    }
  }
}

const readThunk = thunk(readFile)
const callback = () => console.log('yes!')
