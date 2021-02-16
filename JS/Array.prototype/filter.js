//func(item, index, array)
function myFilter(func) {
  if (!(typeof func === "function" && this)) throw new TypeError();
  let len = this.length,
    res = [],
    array = this;
  for (let i = 0; i < len; i++) {
    console.log(i);
    if (func(array[i], i, array)) res.push(array[i]);
  }
  return res;
}
const testCase = [12, 4, 5, 6, 2];
console.log(myFilter.call(testCase, (item, key) => item > key));
console.log(testCase.filter((item, key) => item > key));
