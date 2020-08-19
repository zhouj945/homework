#### webpack 加载资源的方式
1.   ES Moddule
2.   Commonjs
3.   AMD
4.   html文件标签的 src 属性  等等
5.   样式文件的 @import 和  url  等等
* 不要混合使用
* 项目中 有引用资源的地方都会被webpack找出并将资源用对应配置的loader去处理到输出目录， 从而去实现整个项目的模块化

### webpack 的核心工作原理
* ***loader 机制 是webpack的核心***
* 执行入口文件（通常是js文件），然后根据文件的依赖关系，形成一个 模块依赖树，再根据 配置的 rules 利用相应的 loader 递归处理加载的模块， 最终添加到 输出目录的文件中。