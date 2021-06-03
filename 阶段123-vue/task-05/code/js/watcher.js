class Watcher {
  constructor(vm, key, cb) {
    this.vm = vm
    this.key = key // data 中的属性名称
    this.cb = cb // 回调函数更新视图

    // 把watcher对象记录到  Dep 类的静态属性 target
    Dep.target = this
    // 触发 get 方法， 在get方法中会调用 addSub 方法
    this.oldValue = this.vm[key]
    Dep.target = null
  }
  // 当数据发生变化的时候更新视图
  update() {
    let newValue = this.vm[this.key]
    if (this.oldValue === newValue) {
      return
    }
    this.cb(newValue)
  }
}
