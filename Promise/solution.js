/*
 * @Author: your name
 * @Date: 2020-12-27 21:39:23
 * @LastEditTime: 2020-12-27 22:29:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /jsPrac/solution.js
 */
let solution = (s) => {
  if (typeof s !== "string") return null;
  if (!s.length) return s;
  let ans = [s[0]];
  for (let i = 1; i < s.length; i++) {
    if (s[i] !== s[i - 1]) ans.push(s[i]);
  }
  return ans.join("");
};

let urlSolution = (s) => {
  let ans = {
    origin: null,
    protocol: null,
    host: null,
    port: "",
    pathname: null,
    query: null,
    hash: "",
  };
  let protocolIndex = s.indexOf("//");
  ans.protocol = s.splice(0, protocolIndex);
  let originIndex = s.indexOf("/", protocolIndex + 2);
  ans.origin = s.splice(0, originIndex);
  ans.host = s.splice(protocolIndex + 2, originIndex);
  let queryIndex = s.indexOf("?");
  ans.pathname = s.splice(originIndex, queryIndex);
  let hashIndex = s.indexOf("#");
  ans.hash = s.splice(hashIndex, s.length);
  //TODO
  let query = s.splice(queryIndex + 1, hashIndex);
  let andIndx = query.indexOf("&");
  ans.query = query.splice(queryIndex + 1, andIndx);
  return ans;
};
