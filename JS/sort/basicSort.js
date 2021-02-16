const insertionSort = (arr) => {
  for (let i = 1; i < arr.length; i++) {
    for (let j = i - 1; j >= 0; j--) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
};
const bubbleSort = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
};
const selectionSort = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    let min = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[min]) {
        min = j;
      }
    }
    [arr[min], arr[i]] = [arr[i], arr[min]];
  }
  return arr;
};

const quickSort = (arr) => {
  const partition = (arr, left, right) => {
    let pivot = arr[~~((left + right) / 2)],
      i = left,
      j = right;

    while (i <= j) {
      while (arr[i] < pivot) {
        i++;
      }
      while (arr[j] > pivot) {
        j--;
      }
      if (i <= j) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
        i++;
        j--;
      }
    }
    return i;
  };
  const helper = (arr, left, right) => {
    if (arr.length > 1) {
      let index = partition(arr, left, right);
      if (left < index - 1) helper(arr, left, index - 1);
      if (right > index) helper(arr, index, right);
    }
    return arr;
  };
  return helper(arr, 0, arr.length - 1);
};
const testArr = [5, 5, 24, 35, 1, 2];
console.log(insertionSort(testArr));
console.log(bubbleSort(testArr));
console.log(selectionSort(testArr));
console.log(quickSort(testArr));
