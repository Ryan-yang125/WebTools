/*
 * @Author: Yang Rui
 * @Date: 2021-01-02 11:17:06
 * @LastEditTime: 2021-01-02 11:23:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /jsPrac/concurrencyControl/cc.js
 */
//模拟异步执行代码，比如网络请求
const task = (timeout) =>
  new Promise((res) => {
    setTimeout(() => {
      res(timeout);
    }, timeout);
  });

const taskList = [1000, 3000, 200, 1300, 800, 2000];

(async () => {
  console.time("TimeStart");
  await Promise.all(taskList.map((item) => task(item)));
  console.timeEnd("TimeStart");
})();
