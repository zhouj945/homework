Vue.js 源码剖析-响应式原理、虚拟 DOM、模板编译和组件化

一、简答题

1、请简述 Vue 首次渲染的过程。



答：![avator](https://img-blog.csdnimg.cn/20200728204035482.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MDU5OTEwOQ==,size_16,color_FFFFFF,t_70)

1. 首先进行 Vue 的初始化， 初始化实例成员 以及 静态成员
2. 当初始化结束后，开始调用构造函数， 调用 this._init() 方法， 这个方法相当于我们整个Vue的入口。
3. 在 _init() 中调用 this.$mount(), 共有两个 this.$mount(),
   > 第一个 this.$mount() 是 entry-runtime-with-compiler.js入口文件， 这个$mount()的核心作用是 帮我们把模版编译程 render 函数， 但它会线判断一下 当前是否传入了 render 选项， 如果没有传入的话， 它会去获取我们的template选项， 如果没有传入， 它会把 el 中的内容 作为 模版， 然后把它编译程render函数， 它是通过compileToFuncitons()函数， 帮我们把模版编译成render 函数， 当把render 函数编译好，它会把render 函数存在我们的options.render 中
   - src\platforms\web\entry-runtime-with-compiler.js
   - 如果没有传递render，把模版编译成render函数
   - compileToFunction()生成render()渲染函数
   - options.render=render
    > 第二个this.$mount() 是 runtime/index.js中的this.$mount()方法， 这个方法首先会重新获取 el，因为如果是运行时版本的话，是不会走entry-runtime-with-compiler.js 这个入口中后去el， 所以如果是运行时版本的话，我们会在runtime/index.js的$mount()中重新获取el。
   - src\platforms\web\runtime\index.js
   - mountComponent()
  4. 接下来调用mountComponent(),mountComponent()是在src/core/instance/lifecycle.js中定义的，在mountComponent()中，首先会判断render选项，如果没有render，但是传入了模板，并且当前是开发环境的话会发送警告，警告运行时版本不支持编译器。接下来会触发beforeMount这个生命周期中的钩子函数，也就是开始挂载之前。
  5. 然后定义了updateComponent()，在这个方法中，定义了_render和_update，_render的作用是生成虚拟DOM，_update的作用是将虚拟DOM转换成真实DOM，并且挂载到页面上来。
  6. 再接下来就是创建Watcher对象，在创建Watcher时，传递了updateComponent这个函数，这个函数最终是在Watcher内部调用的。在Watcher创建完之后还调用了get方法，在get方法中，会调用updateComponent()。
  7. 然后触发了生命周期的钩子函数mounted,挂载结束，最终返回Vue实例。