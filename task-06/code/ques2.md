2、请简述 Vue 响应式原理。

答： ![](https://img-blog.csdnimg.cn/20201213142853671.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1MTQ5MjU2,size_16,color_FFFFFF,t_70)

- Vue的响应式是从Vue的实例init()方法中开始的
- 在init()方法中先调用initState()初始化Vue实例的状态，在initState方法中调用了initData()，initData()是把data属性注入到Vue实例上，并且调用observe(data)将data对象转化成响应式的对象
- observe是响应式的入口
  - 在observe(value)中，首先判断传入的参数value是否是对象，如果不是对象直接返回
  - 再判断value对象是否有__ob__这个属性，如果有说明做过了响应式处理，则直接返回
  - 如果没有，创建observer对象
  - 返回observer对象

![](https://img-blog.csdnimg.cn/20201213142313121.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1MTQ5MjU2,size_16,color_FFFFFF,t_70)

- 在创建observer对象时，给当前的value对象定义不可枚举的__ob__属性，记录当前的observer对象，然后再进行数组的响应式处理和对象的响应式处理
  - 数组的响应式处理，就是设置数组的几个特殊的方法，push、pop、sort等，这些方法会改变原数组，所以这些方法被调用的时候需要发送通知
    - 找到数组对象中的__ob__对象中的dep,调用dep的notify()方法
    - 再遍历数组中每一个成员，对每个成员调用observe()，如果这个成员是对象的话，也会转换成响应式对象
  - 对象的响应式处理，就是调用walk方法，walk方法就是遍历对象的每一个属性，对每个属性调用defineReactive方法
- defineReactive会为每一个属性创建对应的dep对象，让dep去收集依赖，如果当前属性的值是对象，会调用observe，defineReactive中最核心的方法是getter 和 setter
  - getter 的作用是收集依赖，收集依赖时，为每一个属性收集依赖，如果这个属性的值是对象，那也要为子对象收集依赖，最后返回属性的值
  - 在setter 中，先保存新值，如果新值是对象，也要调用 observe ，把新设置的对象也转换成响应式的对象，然后派发更新（发送通知），调用dep.notify()

![](https://img-blog.csdnimg.cn/20201213143030628.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1MTQ5MjU2,size_16,color_FFFFFF,t_70)

- 收集依赖时
  - 在watcher对象的get方法中调用pushTarget, 记录Dep.target属性
  - 访问data中的成员的时候收集依赖，defineReactive的getter中收集依赖
  - 把属性对应的 watcher 对象添加到dep的subs数组中，也就是为属性收集依赖
  - 如果属性的值也是对象，给childOb收集依赖，目的是子对象添加和删除成员时发送通知

![](https://img-blog.csdnimg.cn/20201213142730966.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1MTQ5MjU2,size_16,color_FFFFFF,t_70)

- 在数据发生变化的时候
  - 调用dep.notify()发送通知，dep.notify()会调用watcher对象的update()方法
  - update()中的调用queueWatcher()，会去判断watcher是否被处理，如果这个watcher对象没有被处理的话，添加到queue队列中，并调用flushScheduleQueue()
    - 在flushScheduleQueue()中触发beforeUpdate钩子函数
    - 调用watcher.run() : run()-->get() --> getter() --> updateComponent()
    - 然后清空上一次的依赖
    - 触发actived的钩子函数
    - 触发updated钩子函数