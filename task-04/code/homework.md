1. webpack 的构建流程有哪些环节，尽可能描述 webpack 的整个打包流程？
   答；

   - 打包读取配置文件
   - 执行入口文件，开始根据模块导入关系建立依赖树
   - 利用 loader 处理模块文件
   - 利用 plugin 实现其他辅助功能
   - 将编译的文件按要求引入或分包模块文件

2. loader 和 plugin 有哪些不同？ 请描述一下开发 loader 和 plugin 的思路

   1.

   - loader 是将文件内容 转译成新的 文件内容，并且每个 loader 为链式操作一步一步把模块文件转译成你想要的样子。 loader 编写只做一中转译工作， 事后将内容结果返回。
   - 相对于 loader 而言，plugin 就灵活许多

   2.

   - plugin 通过钩子机制实现
     webpack 编译 分为几个阶段（好比生命周期） 可以执行钩子函数
     plugin 必须是一个函数 或者是 包含 apply 方法的 一个对象
     plugin 接收一个 compiler 对象 是 webpack 工作的核心对象， 对象中包含了 此次 构建的所有配置信息， 也是通过这个 对象 去注册钩子函数
     通过往 webpack 生命周期的 钩子中 挂在 钩子函数实现 插件功能
