// 3
var arr = [12, 34, 32, 89, 4];
let min = arr[0];
for (let item of arr) {
  if (item < min) min = item;
}
console.log(min);

// 9
Promise.resolve((a = "hello"))
  .then((res) => {
    return res + "lagou";
  })
  .then((res) => {
    console.log(res + "i * you");
  });
