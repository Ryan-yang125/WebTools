let count = 0;
const appDiv = document.getElementById("app");

function getUserAction(e) {
  this.innerHTML = count++;
  console.log(this);
  console.log(e);
}

appDiv.onmousemove = throttle(getUserAction, 1000);
//v1 leading
function throttle(func, wait) {
  let prev = 0;

  return function () {
    let now = +new Date();
    if (now - prev > wait) {
      func.apply(this, arguments);
      prev = now;
    }
  };
}

//v2 trailing
function throttle(func, wait) {
  let timeout = null;

  return function () {
    if (!timeout) {
      timeout = setTimeout(() => {
        timeout = null;
        func.apply(this, arguments);
      }, wait);
    }
  };
}

//v3 options
function throttle(func, wait, options) {}
