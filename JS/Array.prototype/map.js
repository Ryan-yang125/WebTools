//array.map((item,index,array) => item)
function myMap(func, context) {
  let array = this.concat(),
    len = this.length,
    res = [];
  for (let i = 0; i < len; i++) {
    res.push(func.call(context, array[i], i, this));
  }
  return res;
}

//test
const testCase = [12, 4, 5, 6, 2];
console.log(myMap.call(testCase, (item, index) => ++item * index));
console.log(testCase.map((item, index) => ++item * index));
console.log(testCase);
