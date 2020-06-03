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

// 代码题
const fp = require("lodash/fp");
// 数据  horepower 马力， dollar_value 价格， in_stock 库存
const cars = [
  { name: "FF", horepower: 660, dollar_value: 70000, in_stock: true },
  { name: "C12", horepower: 650, dollar_value: 64800, in_stock: false },
  { name: "XKR_S", horepower: 550, dollar_value: 132000, in_stock: false },
  { name: "R8", horepower: 525, dollar_value: 114200, in_stock: false },
  { name: "One-77", horepower: 750, dollar_value: 185000, in_stock: true },
  { name: "PH", horepower: 700, dollar_value: 130000, in_stock: false },
];

// 练习1.
const isLastInStock = fp.flowRight(fp.prop("in_stock"), fp.last);
console.log(isLastInStock(cars));

// 练习2.
const getFirstName = fp.flowRight(fp.prop("name"), fp.first);
console.log(getFirstName(cars));
