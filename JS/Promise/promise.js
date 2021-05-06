// v1 仅同步+无链式
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";
class Promise {
  constructor(exc) {
    this.state = PENDING;
    this.value = undefined;
    this.err = undefined;

    let resolve = (value) => {
      if (this.state === PENDING) {
        this.state = FULFILLED;
        this.value = value;
      }
    };
    let reject = (err) => {
      if (this.state === PENDING) {
        this.state = FULFILLED;
        this.err = err;
      }
    };

    try {
      exc(resolve, rejected);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    if (this.state === FULFILLED) {
      onFulfilled(this.value);
    }
    if (this.state === REJECTED) {
      onRejected(this.err);
    }
  }
}

// v2 异步
// 如果当调用 then 方法时，当前状态是 pending，我们需要先将成功和失败的回调分别存放起来，
// 在executor()的异步任务被执行时，触发 resolve 或 reject，依次调用成功或失败的回调。
class Promise {
  constructor(exc) {
    this.state = PENDING;
    this.value = undefined;
    this.err = undefined;

    this.onResolvedCallback = [];
    this.onRejectedCallback = [];

    let resolve = (value) => {
      this.state = FULFILLED;
      this.value = value;
      this.onResolvedCallback.forEach((func) => func());
    };
    let reject = (err) => {
      this.state = REJECTED;
      this.err = err;
      this.onRejectedCallback.forEach((func) => func());
    };

    try {
      exc(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }
  then(onFulfilled, onRejected) {
    if (this.state === FULFILLED) {
      onFulfilled(this.value);
    }
    if (this.state === REJECTED) {
      onRejected(this.err);
    }
    if (this.state === PENDING) {
      this.onResolvedCallback.push(onFulfilled.bind(null, this.value));
      this.onRejectedCallback.push(onRejected.bind(null, this.err));
    }
  }
}

// v3 chain call
// 果每次调用 then 的时候，我们都重新创建一个 promise 对象，
// 并把上一个 then 的返回结果传给这个新的 promise 的 then 方法
// 并且在当前 Promise 达到 fulfilled 状态后，即开始进行下一个 Promise
const resolvePromise = (promise2, x, resolve, reject) => {
  if (promise2 === x) {
    return reject(
      new TypeError("Chaining cycle detected for promise #<Promise>")
    );
  }
  let called;
  // 后续的条件要严格判断 保证代码能和别的库一起使用
  if ((typeof x === "object" && x != null) || typeof x === "function") {
    try {
      // 为了判断 resolve 过的就不用再 reject 了（比如 reject 和 resolve 同时调用的时候）  Promise/A+ 2.3.3.1
      let then = x.then;
      if (typeof then === "function") {
        // 不要写成 x.then，直接 then.call 就可以了 因为 x.then 会再次取值，Object.defineProperty  Promise/A+ 2.3.3.3
        then.call(
          x,
          (y) => {
            // 根据 promise 的状态决定是成功还是失败
            if (called) return;
            called = true;
            // 递归解析的过程（因为可能 promise 中还有 promise） Promise/A+ 2.3.3.3.1
            resolvePromise(promise2, y, resolve, reject);
          },
          (r) => {
            // 只要失败就失败 Promise/A+ 2.3.3.3.2
            if (called) return;
            called = true;
            reject(r);
          }
        );
      } else {
        // 如果 x.then 是个普通值就直接返回 resolve 作为结果  Promise/A+ 2.3.3.4
        resolve(x);
      }
    } catch (e) {
      // Promise/A+ 2.3.3.2
      if (called) return;
      called = true;
      reject(e);
    }
  } else {
    // 如果 x 是个普通值就直接返回 resolve 作为结果  Promise/A+ 2.3.4
    resolve(x);
  }
};
class Promise {
  constructor(exc) {
    this.state = PENDING;
    this.value = undefined;
    this.err = undefined;

    this.onResolvedCallback = [];
    this.onRejectedCallback = [];

    let resolve = (value) => {
      this.state = FULFILLED;
      this.value = value;
      this.onResolvedCallback.forEach((func) => func());
    };
    let reject = (err) => {
      this.state = REJECTED;
      this.err = err;
      this.onRejectedCallback.forEach((func) => func());
    };

    try {
      exc(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }
  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === "function" ? onFulfilled : (v) => v;
    //因为错误的值要让后面访问到，所以这里也要跑出个错误，不然会在之后 then 的 resolve 中捕获
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (err) => {
            throw err;
          };
    let promise2 = new Promise((resolve, reject) => {
      if (this.status === FULFILLED) {
        //Promise/A+ 2.2.2
        //Promise/A+ 2.2.4 --- setTimeout
        setTimeout(() => {
          try {
            //Promise/A+ 2.2.7.1
            let x = onFulfilled(this.value);
            // x可能是一个proimise
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            //Promise/A+ 2.2.7.2
            reject(e);
          }
        }, 0);
      }

      if (this.status === REJECTED) {
        //Promise/A+ 2.2.3
        setTimeout(() => {
          try {
            let x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      }

      if (this.status === PENDING) {
        this.onResolvedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });

        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });
      }
    });

    return promise2;
  }
}
