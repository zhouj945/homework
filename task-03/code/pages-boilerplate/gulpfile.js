// 实现这个项目的构建任务
const { src, dest, series, parallel } = require("gulp");
const loadPlugins = require('gulp-load-plugins')
const plugins = loadPlugins()
const del = require("delete");

// const babel = require("gulp-babel");
// const uglify = require("gulp-uglify");
// const plgCleanCss = require('gulp-clean-css')
// const plgSass = require('gulp-sass')
// const plgRaname = require('gulp-rename')
// const plgSwig = require('gulp-swig')
// const plgImageMin = require('gulp-imagemin')
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
const jsTranspile = () => {
  return src('src/**/*.js', { base: 'src'}).pipe(plugins.babel({ presets: ['@babel/preset-env']})).pipe(dest('dist'))
}

const cssTranspile = () => {
  return src('src/**/*.scss', { base: 'src'}).pipe(plugins.sass({ outputStyle: 'expanded'})).pipe(plugins.cleanCss()).pipe(dest('dist'))
}

const pageTranspile = () => {
  return src('src/**/*.html', { base: 'src' }).pipe(plugins.swig()).pipe(dest('dist'))
}

const imgTranspile = () => {
  return src('src/assets/images/**', { base: 'src'}).pipe(plugins.imagemin()).pipe(dest('dist'))
}

const fontTranspile = () => {
  return src('src/assets/fonts/**', { base: 'src'}).pipe(plugins.imagemin()).pipe(dest('dist'))
}

const extraFile = () => {
  return src('public/**', { base: 'public'}).pipe(dest('dist'))
}

const clean = (cb) => {
  del(["./dist"], cb);
};
const lint = function (cb) {
  cb(new Error("boom"));
};
const serve = function (cb) {
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

const compile = parallel(jsTranspile, cssTranspile, pageTranspile, imgTranspile, fontTranspile)
const build = series(clean, parallel(compile, extraFile))
module.exports = {
  clean,
  lint,
  serve,
  build,
  start,
  deploy,
  imgTranspile
}
