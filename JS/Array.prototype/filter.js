if (!Array.prototype.filter) {
  //func(item, index, array)
  Array.prototype.filter = function (func) {
    if (!(typeof func === "function" && this)) throw new TypeError();
    var len = this.length,
      res = [],
      array = this,
      index = 0;
    for (; index < len; index++) {
      if (func(array[index], index, array)) res.push(array[index]);
    }
    return this;
  };
}
