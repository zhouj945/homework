export default {
  // 预编译 不能用 template
  render(h) {
    // 当前匹配到的路由对象
    const route = this.$route

    // 嵌套路由   /music/pop
    const depth = 0
    // 记录当前组件为 routerView
    this.routerView = true

    let parent = this.$parent
    while (parent) {
      if (parent.routerView) {
        depth++
      }
      parent = parent.$parent
    }

    const record = route.matched[0]
    if (!record) {
      return h()
    }
    const component = record.component
    return h(component)
  },
}
