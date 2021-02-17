const cartesian = (...sets) =>
  sets.reduce((acc, set) => acc.flatMap((x) => set.map((y) => [...x, y])), [
    [],
  ]);

// Example
cartesian([1, 2], [3, 4]); // [ [1, 3], [1, 4], [2, 3], [2, 4] ]
//acc: [[]] => [[1,2]] => [1,2] set: [1,2]
//set: [3,4], acc: [[[1,3],[1,4]],[[2,3],[2,4]]] => [ [1, 3], [1, 4], [2, 3], [2, 4] ]
console.log(cartesian([1, 2], [3, 4], [5, 6]));
/*
       3       4
   ---------------
1 | [1, 3]  [1, 4]
  |
2 | [2, 3]  [2, 4]
*/

//
const cartesion = (...sets) =>
  sets.reduce((acc, cur) => acc.flatMap((x) => cur.map((y) => [...x, y])), [
    [],
  ]);
//
function cartesion(...sets) {}
