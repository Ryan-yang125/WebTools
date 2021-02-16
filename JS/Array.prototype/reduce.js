//arr.reduce((acc,cur,curIndex,array)=>{},initialValue)
function myReduce(func, initialValue) {
  let array = this.concat(),
    len = this.length,
    acc = initialValue ? initialValue : array[0],
    i = initialValue ? 0 : 1;
  for (; i < len; i++) {
    acc = func(acc, array[i], i, this);
  }
  return acc;
}

//test
const testCase = [12, 4, 5, 6, 2];
const reducer = (acc, cur) => acc + cur;
console.log(testCase.reduce(reducer));
console.log(myReduce.call(testCase, reducer));
