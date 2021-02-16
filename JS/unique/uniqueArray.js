//1. the basis
const uniqueArray1 = (arr) => {
  //error case
  //...
  let res = [],
    i = (j = 0);
  for (; i < arr.length; i++) {
    for (j = 0; j < res.length; j++) {
      if (arr[i] === res[j]) break;
    }
    if (j === res.length) res.push(arr[i]);
  }
  return res;
};
//2. indefOf / map记录 / 思路都是一样的，即每次遍历确认当前数字是否是新的
const uniqueArray2 = (arr) => {
  const res = [];
  for (let i = 0; i < arr.length; i++) {
    if (res.indexOf(arr[i]) === -1) res.push(arr[i]);
  }
  return res;
};
//3. sort
const uniqueArray3 = (arr) =>
  arr
    .concat()
    .sort()
    .filter((item, index, arr) => !index || item !== arr[index - 1]);
//2.set
const uniqueArray = (arr) => [...new Set(arr)];
console.log(uniqueArray3([1, 2, 1, 1, "1"]));
// console.log(uniqueArray1());
