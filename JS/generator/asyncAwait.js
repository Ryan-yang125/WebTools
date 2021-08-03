const MockReadFile = (fileName) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      let content = 'Content:' + fileName
      res(content)
    }, 1000)
  })
}
// use 
// async function foo(...args) {
//   let a = await MockReadFile('a.js')
//   console.log(a)
//   let b = await MockReadFile(a)
//   console.log(b)
//   return b
// }

// let p = foo()
// console.log(p)
// console.log('haha')

// like
function foo(...args) {
  return ASync(
    function* () {
      let a = yield MockReadFile('a.js')
      console.log(a)
      let b = yield MockReadFile(a)
      console.log(b)
      return b
    }
  )
}

function ASync(gen) {
  return new Promise((res, rej) => {
    const g = gen()
    const run = (data) => {
      const next = g.next(data)
      if (next.done) return res(next.value)
      // no need to know if Promise
      Promise.resolve(next.value).then((data) => { run(data) })
    }
    run()
  })
}

foo()