/*
 * @Author: Yang Rui
 * @Date: 2021-01-02 11:17:06
 * @LastEditTime: 2021-01-02 13:34:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /jsPrac/concurrencyControl/cc.js
 */
// import TaskPool from "./cc.js";
function TaskPool(size) {
  this.maxSize = size;
  this.runningSize = 0;
  this.queue = [];
  const DelayedTask = function (resolve, fn, args) {
    this.resolve = resolve;
    this.fn = fn;
    this.args = args;
  };
  this.addTask = (fn) => (...args) =>
    new Promise((resolve) => {
      this.queue.push(new DelayedTask(resolve, fn, args));
      if (this.runningSize < this.maxSize) {
        this.runningSize++;
        const { resolve, fn, args } = this.queue.shift();
        resolve(this.runTask(fn, args));
      }
    });
  this.pullTask = () => {
    if (this.queue.length === 0) return;
    if (this.runningSize < this.maxSize) {
      this.runningSize++;
      const { resolve, fn, args } = this.queue.shift();
      resolve(this.runTask(fn, args));
    }
  };
  this.runTask = (fn, args) => {
    //needed to spread [value,index]
    const result = Promise.resolve(fn(...args));
    //TODO
    result
      .then(() => {
        this.runningSize--;
        this.pullTask();
      })
      .catch(() => {
        this.runningSize--;
        this.pullTask();
      });
    return result;
  };
}
const cc = new TaskPool(2);

//模拟需要异步执行的任务，比如网络请求
const task = (timeout) =>
  new Promise((res) => {
    setTimeout(() => {
      res(timeout);
    }, timeout);
  });

const taskList = [2000, 300, 200, 1300, 800, 1000];

(async () => {
  console.time("Size2");
  await Promise.all(taskList.map(cc.addTask(task)))
    .then((info) => {
      console.log(info);
    })
    .catch((error) => {
      console.log(error);
    });
  console.timeEnd("Size2");
})();
