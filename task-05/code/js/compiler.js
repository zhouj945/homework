class Compiler {
  constructor(vm) {
    this.el = vm.$el
    this.vm = vm
    this.compile(this.el)
  }

  // 编译模版 处理文本节点和元素节点
  compile(node) {
    let childNodes = node.childNodes
    Array.from(childNodes).forEach(node => {
      if (this.isTextNode(node)) {
        // 文本
        this.compileText(node)
      } else if (this.isElementNode(node)) {
        // 元素
        this.compileElement(node)
      }

      // 判断 node 节点 是否有自节点， 如果有 要递归调用 compile
      if (node.childNodes && node.childNodes.length) {
        this.compile(node)
      }
    })
  }

  // 编译元素节点，处理指令
  compileElement(node) {
    // console.log(node.attributes)
    // 遍历所有的属性节点
    Array.from(node.attributes).forEach(attr => {
      // 判断是否是指令
      let attrName = attr.name
      if (this.isDirective(attrName)) {
        // v-text --> text
        attrName = attrName.substr(2)
        let key = attr.value
        if (attrName.indexOf(':') != -1) {
          handleType = attrName.substring(1)
          this.handleEvent(node, key, attrName, handleType)
        } else {
          // 指令处理方法
          this.update(node, key, attrName)
        }
      }
    })
  }

  // 辅助方法 处理 指令的方法调用
  update(node, key, attrName) {
    let updateFn = this[`${attrName}Updater`]
    // 注意 updateFn 的this 指向问题
    updateFn && updateFn.call(this, node, this.vm[key], key)
  }

  // 处理 v-text 指令
  textUpdater(node, value, key) {
    node.textContent = value
    new Watcher(this.vm, key, newValue => {
      node.textContent = newValue
    })
  }

  // v-html处理指令
  htmlUpdate(node, value, key) {
    node.innerHtml = value
    new Watcher(this.vm, key, newValue => {
      node.innerHtml = newValue
    })
  }

  // v-on
  handleEvent(node, value, key, handleType) {
    node.addEventListener(handleType, () => {
      value.bind(this.vm)
    })
  }

  // 处理 v-modal 指令
  modalUpdater(node, value, key) {
    node.value = value
    new Watcher(this.vm, key, newValue => {
      node.value = newValue
    })

    // 双向绑定
    node.addEventListener(`input`, () => {
      this.vm[key] = node.value
    })
  }

  // 编译文本节点， 处理差值表达式
  compileText(node) {
    // console.dir(node) // dir 以对象的形式打印
    // console.log(node)
    let reg = /\{\{(.+?)\}\}/ // 匹配差值表达式
    let value = node.textContent
    if (reg.test(value)) {
      let key = RegExp.$1.trim() // RegExp.$1 获取第一个分组的值
      node.textContent = value.replace(reg, this.vm[key])

      // 创建 watcher 对象， 当数据改变更新视图
      new Watcher(this.vm, key, newValue => {
        node.textContent = newValue
      })
    }
  }

  // 判断元素是否是指令
  isDirective(attrName) {
    return attrName.startsWith(`v-`)
  }

  // 判断是否是文本节点 compile中调用
  isTextNode(node) {
    return node.nodeType === 3
  }

  // 判断是否是元素节点 compile中调用
  isElementNode(node) {
    return node.nodeType === 1
  }
}
