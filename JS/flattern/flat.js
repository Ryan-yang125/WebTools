//v0
const flat0 = (arr) => arr.flat();
//v1
const flat1 = (arr) =>
  [].concat(...arr.map((item) => (Array.isArray(item) ? flat1(item) : item)));
//v2
const flat2 = (arr) =>
  arr.reduce(
    (acc, cur) =>
      Array.isArray(cur) ? [...acc, ...flat2(cur)] : [...acc, cur],
    []
  );
//v3 basis
const flat3 = (arr, depth = 1) => {
  const res = [];
  (function helper(arr, depth) {
    for (let i = 0; i < arr.length; i++) {
      if (Array.isArray(arr[i]) && depth > 0) {
        helper(arr[i], depth - 1);
      } else {
        res.push(arr[i]);
      }
    }
  })(arr, depth);
  return res;
};
const testCase0 = [1, 2, [2, 3], [4, 5, [2, [3, 3]]]];
const testCase1 = [1, 2, 3];
console.log(flat1(testCase0));
console.log(flat1(testCase1));
console.log(flat3(testCase0, 2));
console.log(flat3(testCase0, Infinity));
console.log(flat3(testCase1));
