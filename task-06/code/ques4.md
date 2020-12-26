4、请简述 Vue 中模板编译的过程。

答 ：
![](https://img-blog.csdnimg.cn/20201218234256724.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1MTQ5MjU2,size_16,color_FFFFFF,t_70)

- 模版编译入口函数compileToFunctions
  - 内部首先从缓存加载编译好的render函数
  - 如果缓存中没有，调用compile开始编译
- 在 compile 函数中
  - 首先合并选项options
  - 调用 baseCompile 编译模版
- compile的核心是合并选项options， 真正处理是在basCompile中完成的，把模版和合并好的选项传递给baseCompile, 这里面完成了模版编译的核心三件事情
  - parse()
    - 把模版字符串转化为AST 对象，也就是抽象语法树
  - optimize()
    - 对抽象语法树进行优化，标记静态语法树中的所有静态根节点
    - 检测到静态子树，设置为静态，不需要在每次重新渲染的时候重新生成节点
    - patch的过程中会跳过静态根节点
  - generator()
    - 把优化过的AST对象，转化为字符串形式的代码
- 执行完成之后，会回到入口函数complieToFunctions
  - compileToFunction会继续把字符串代码转化为函数
  - 调用createFunction
  - 当 render 和 staticRenderFns初始化完毕，最终会挂在到Vue实例的options对应的属性中