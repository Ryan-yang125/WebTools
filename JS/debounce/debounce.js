/*
 * @Author: your name
 * @Date: 2021-02-15 17:43:56
 * @LastEditTime: 2021-02-15 18:19:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /jsprac/JS/debounce/debounce.js
 */
let count = 0;
const appDiv = document.getElementById("app");

function getUserAction() {
  this.innerHTML = count++;
  console.log(this);
}

// appDiv.onmousemove = debounce(getUserAction, 100);
appDiv.onmousemove = getUserAction;

function debounce(func, wait) {
  let timeout;

  return function () {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(func, wait);
  };
}
