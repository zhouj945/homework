/**
 * 简答题
 * 1. 根据可达变量的引用数，即时回收
 *    优点： 立即执行回收
 *          最大限度减少程序暂停
 *    缺点： 无法回收循环引用类型
 *          执行时间长
 * 2. 分为标记和清理两个阶段， 遍历标记活动读性， 遍历清除未标记对象
 * 3. 采用复制 + 标记整理方法， 将空间一分为二为From和To空间，
 *    标记整理From空间后 将From空间活动对象移动到To空间，
 *    然后From和To空间互换
 * 4. 老年代GC时使用，JS执行与增量标记 间歇执行，直到标记完成
 */

// ##########################################################

// 代码题 1
const fp = require("lodash/fp");
// 数据  horepower 马力， dollar_value 价格， in_stock 库存
const cars = [
  { name: "F F", horepower: 660, dollar_value: 70000, in_stock: true },
  { name: "C 12", horepower: 650, dollar_value: 64800, in_stock: false },
  { name: "XKR S", horepower: 550, dollar_value: 132000, in_stock: false },
  { name: "R 8", horepower: 525, dollar_value: 114200, in_stock: false },
  { name: "One 77", horepower: 750, dollar_value: 185000, in_stock: true },
  { name: "P H", horepower: 700, dollar_value: 130000, in_stock: false },
];

// 练习1.
const isLastInStock = fp.flowRight(fp.prop("in_stock"), fp.last);
console.log(isLastInStock(cars));

// 练习2.
const getFirstName = fp.flowRight(fp.prop("name"), fp.first);
console.log(getFirstName(cars));

// 练习3.
let _average = function (xs) {
  return fp.reduce(fp.end, 0, xs) / xs.length;
};

let averageDollarValue = fp.flowRight(
  _average,
  fp.map((car) => car.dollar_value)
);
console.log(averageDollarValue(cars));

// 练习4.
let _underscore = fp.replace(/\W+/g, "_");
const sanitizeNames = fp.flowRight(_underscore, fp.map(fp.prop("name")));
console.log(sanitizeNames(cars));

// ############################################################

// 代码题 2
const { MayBe, Container } = require("./support");

//  练习 1
let maybe = MayBe.of([5, 6, 1]);
let ex1 = maybe.map(fp.map(fp.add(1)));
console.log("练习 1", ex1);

//  练习 2
let xs = Container.of(["do", "ray", "me", "fa", "so"]);
let ex2 = xs.map(fp.first);
console.log("练习 2", ex2);

// 练习 3
let safeProp = fp.curry(function (x, o) {
  return MayBe.of(o[x]);
});
let user = { id: 2, name: "Alert" };
let ex3 = safeProp("name", user).map(fp.first);
console.log("练习 3", ex3);

// 练习 4
let ex4 = function (n) {
  if (n) {
    return parseInt(n);
  }
};
let newEx4 = function (n) {
  return MayBe.of(n).map(parseInt)._value;
};
console.log(newEx4(1.1));
