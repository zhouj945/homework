#### 1、Vue 3.0 性能提升主要是通过哪几方面体现的？

答：
1.  响应式系统的升级， 用proxy 代替 defineProperty  用更高级的方式代替了 属性的遍历。
    1.  可以监听动态新增的属性
    2.  可以监听删除的属性
    3.  可以监听数组的数组的索引和length属性
2.  编译的优化， diff算法的优化， 采用了 静态节点提升，diff的时候只需要对比动态节点
    1.  Fragments
    2.  静态提升
    3.  Patch flag
    4.  缓存事件处理函数
3.  源码体积的优化，并做了tree-shaking
    1.  移除了一些不常用的api： inline-template， filter 等
    2.  更好的tree-shaking， 除了基础代码之外，如各种api都是按需加载的


#### 2、Vue 3.0 所采用的 Composition Api 与 Vue 2.x使用的Options Api 有什么区别？
答：
1.  没有this
2.  代码逻辑的查分和复用上， options Api逻辑分散。 Composition Api代码逻辑集中方便复用
3.  使用方式，options 更像是面向对象的， Composition 是函数式的

#### 3、Proxy 相对于 Object.defineProperty 有哪些优点？
答：
1.  不需要遍历属性
2.  proxy 可以监听新添加的属性
3.  可以监听属性的删除
4.  可以监听数组的下标和length属性
5.  可以为属性添加13种劫持操作

#### 4、Vue 3.0 在编译方面有哪些优化？

答：
1.  Fragments
2.  静态提升
3.  Patch flag
4.  缓存事件处理函数
之前template需要顶级标签，现在不需要了，  现在diff 会标记静态节点， 在数据发生改变 只会比较 动态节点的变化， 缓存事件处理函数， 会减少重复渲染次数

#### 5、Vue.js 3.0 响应式系统的实现原理？
利用 proxy 监听数据， 劫持 get set  方法里 track 函数 收集依赖 effect函数，  利用 weakMap -> Map -> set   收集依赖   在 trigger 内执行 依赖函数