class Observer {
  constructor(data) {
    this.walk(data)
  }
  walk(data) {
    if (!data || typeof data !== `object`) return
    Object.keys(data).forEach(key => {
      this.defineReactive(data, key, data[key])
    })
  }
  defineReactive(obj, key, val) {
    let that = this //observe
    // 负责收集依赖， 并发送通知   （每一个属性都会创建一个dep）
    let dep = new Dep()
    this.walk(val) // 如果 val是对象， 也会转换成响应式数据
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get() {
        // 收集依赖
        Dep.target && dep.addSub(Dep.target)
        return val // 传递val 是为了避免 死循环   并且 val 形成了闭包不会被释放
      },
      set(newValue) {
        if (newValue === val) return
        val = newValue
        that.walk(newValue) // 如果使用 this 会指向 obj
        // 发送通知
        dep.notify()
      },
    })
  }
}
