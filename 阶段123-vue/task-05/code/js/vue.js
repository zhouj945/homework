class Vue {
  constructor(options) {
    // 通过属性保存选项的数据
    this.$options = options || {}
    this.$data = options.data || {}
    this.$el = typeof options.el === 'string' ? document.querySelector(options.el) : options.el
    // 把data中的属性转换成 getter/setter， 注入到vue实例中
    this._proxyData(this.$data)
    // 调用 observer 监听 data 中所有属性的变化
    new Observer(this.$data)
    // 调用 compiler 解析 指令/差值表达式
    new Compiler(this)
  }

  // 让vue代理 data中的这些属性
  _proxyData(data) {
    Object.keys(data).forEach(key => {
      Object.defineProperty(this, key, {
        enumerable: true,
        configurable: true,
        get() {
          return data[key]
        },
        set(newValue) {
          if (newValue === data[key]) return
          data[key] = newValue
        },
      })
    })
  }
}
