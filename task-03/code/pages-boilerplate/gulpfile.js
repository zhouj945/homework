// 实现这个项目的构建任务
const { src, dest, series, parallel } = require("gulp");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const del = require("delete");
/**
 * series : 按序执行
 * parallel: 并行
 * 
 * 
 *
  "clean": "gulp clean",
  "lint": "gulp lint",
  "serve": "gulp serve",
  "build": "gulp build",
  "start": "gulp start",
  "deploy": "gulp deploy --production"
 */
const clean = function (cb) {
  del(["./dist"], cb);
};
const lint = function (cb) {
  cb(new Error("boom"));
};
const serve = function (cb) {
  cb(new Error("boom"));
};
const build = function (cb) {
  return src("src/**/*.js").pipe(babel()).pipe(dest("dist/"));
  cb(new Error("boom"));
};
const start = function (cb) {
  cb(new Error("boom"));
};
const deploy = function (cb) {
  if (process.env.NODE_ENV === "production") {
    cb(new Error("boom"));
  } else {
    cb(new Error("boom"));
  }
};

exports.clean = clean;
exports.lint = lint;
exports.serve = serve;
exports.build = build;
exports.start = start;
exports.deploy = deploy;
exports.default = series(clean, build);
