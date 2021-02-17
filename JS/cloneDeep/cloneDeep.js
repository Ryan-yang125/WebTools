//v1
function clone(source, map = new Map()) {
  if (typeof source === "object") {
    let target = Array.isArray(source) ? [] : {};

    if (map.get(source)) {
      return map.get(source);
    } else map.set(source, target);

    for (const key in source) {
      target[key] = clone(source[key], map);
    }
    return target;
  } else {
    return source;
  }
}
const source = {
  field1: 1,
  field2: undefined,
  field3: "ConardLi",
  field4: {
    child: "child",
    child2: {
      child2: "child2",
    },
  },
  func: function () {},
  arr: [1, 2, 3, 4],
  map: new Map(),
  set: new Set([1, 2, 3, 4, 5]),
};
source.fn = source;
console.log(source);
console.log(clone(source));
//step0: 递归浅拷贝
//step1: 添加数组
//step2: 使用map解决循环引用
//step3: set,map
