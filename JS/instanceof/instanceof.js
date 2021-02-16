const myInstanceOf = (obj, constructor) => {
  if (!((obj !== null && typeof obj === "object") || typeof obj === "function"))
    return false;
  let proto = Object.getPrototypeOf(obj);
  while (proto) {
    if (proto === constructor.prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
  return false;
};
