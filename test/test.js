const _ = require("lodash");

//Promise.resolve(1).then(2).then(Promise.resolve(3)).then(console.log);

// 高阶函数
// function once(fn) {
//   let done = false;
//   return function () {
//     if (!done) {
//       done = true;
//       return fn.apply(this, arguments);
//     }
//   };
// }

// const pay = once(function (price) {
//   console.log(price);
// });

// 有缓存的记忆函数
// function memorize(f) {
//   const cache = {}
//   return function () {
//     const key = JSON.stringify(arguments)
//     cache[key] = cache[key] || f.apply(f, arguments)
//     return cache[key]
//   }
// }

// 柯里化实现
// const curry = (func) => {
//   return function curried(...args) {
//     if (args.length < func.length) {
//       return function () {
//         return curried(...args.concat(Array.from(arguments)));
//       };
//     }
//     return func(...args);
//   };
// };

// 函数柯里化
// const match = (req, str) => str.match(req);
// console.log(match(/d+/g, "aa"));

// const newMatch = _.curry(match);
// const hasd = newMatch(/d+/g);
// console.log(hasd("aa"));
// console.log(hasd("dd"));

// const filter = (func, array) => array.filter(func);
// const newFilter = curry(filter);
// const arrHasd = newFilter(hasd);
// console.log(arrHasd(["aa", "dd"]));

// 函数组合
const compose = (...args) => (value) => args.reverse().reduce((acc, cur) => cur(acc), value);

const reverse = (arr) => arr.reverse();
const first = (arr) => arr[0];
const toUpper = (value) => value.toUpperCase();

const cArr = ["one", "two", "three"];

const fn = compose(toUpper, first, reverse);

console.log(fn(cArr));
