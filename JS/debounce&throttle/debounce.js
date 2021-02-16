let count = 0;
const appDiv = document.getElementById("app");

function getUserAction(e) {
  this.innerHTML = count++;
  console.log(this);
  console.log(e);
}

appDiv.onmousemove = debounce(getUserAction, 500, true);
// appDiv.onmousemove = getUserAction;

function debounce(func, wait, immediate) {
  let timeout, result;

  function debounced() {
    if (timeout) clearTimeout(timeout);

    if (immediate) {
      let callNow = !timeout;
      timeout = setTimeout(() => {
        timeout = null;
      }, wait);
      if (callNow) result = func.apply(this, arguments);
    } else {
      timeout = setTimeout(func.bind(this, ...arguments), wait);
    }
    return result;
  }

  debounced.cancel = () => {
    clearTimeout(timeout);
    timeout = null;
  };
  return debounced;
}
