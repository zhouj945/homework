// loader 需要导出一个函数  就是对加载资源的处理过程
// 返回 一段 js  用户打包编译的模块内容
// JSON.stringify()   会处理掉 html 的银行和换行符的一些问题
// 最终编译js模块内容 需要导出模块内容  就跟js模块一样
const marked = require('marked')
module.exports = source => {
  const html = marked(source)
  // return `module.exports = ${JSON.stringify(html)}`
  // return `export default ${JSON.stringify(html)}`

  /**
   * 第二种方式 返回 html 字符串 交给下个 loader 去处理
   */
  return html
}