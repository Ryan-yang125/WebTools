/*
 * @Author: YangRui
 * @Date: 2021-01-02 12:04:43
 * @LastEditTime: 2021-01-02 12:29:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /jsprac/ConcurrencyControl/cc.js
 */
export default function TaskPool(size) {
  this.size = size;
  this.queue = [];
  const DelayedTask = function (resolve, fn, args) {
    this.resolve = resolve;
    this.fn = fn;
    this.args = args;
  };
  this.addTask = (fn) => (...args) =>
    new Promise((resolve) => {
      this.queue.push(new DelayedTask(resolve, fn, args));
      if (this.size !== 0) {
        this.size--;
        const { resolve, fn, args } = this.queue.shift();
        resolve(this.runTask(fn, args));
      }
    });
  this.pullTask = () => {
    if (this.queue.length === 0) return;
    if (this.size === 0) return;
    this.size++;
    const { resolve, fn, args } = this.queue.shift();
    resolve(this.runTask(fn, args));
  };
  this.runTask = (fn, args) => {
    const result = Promise.resolve(fn(...args));
    //TODO
    result
      .then(() => {
        this.size--;
        this.pullTask();
      })
      .catch(() => {
        this.size--;
        this.pullTask();
      });
    return result;
  };
}
