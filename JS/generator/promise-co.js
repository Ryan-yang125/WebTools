// use
// let p = MockReadFile('a.js')
// p.then((content) => {
//   console.log(content)
// })
const MockReadFile = (fileName) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      let content = 'Content:' + fileName
      res(content)
    }, 1000)
  })
}

// use
function *gen() {
  const f1 = yield MockReadFile('a.js')
  console.log(f1)
  const f2 = yield MockReadFile(f1)
  console.log(f2)
}

run(gen)

function run(gen) {
  const g = gen()
  const next = (data) => {
    const res = g.next(data)
    if (res.done) return
    res.value.then((data) => {
      next(data)
    })
  }
  next()
}