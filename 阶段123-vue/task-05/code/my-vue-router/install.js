import Link from './components/link'
import View from './components/view'

// 避免 Vue 包的使用 减少打包
export let _Vue = null
export default function install(Vue) {
  _Vue = Vue
  _Vue.mixin({
    beforeCreate() {
      // 把 router 属性 挂在到所有实例 以及 this 执行问题 选择 mixin
      if (this.$options.router) {
        this._routerRoot = this // this 为 vue 实例
        this._router = this.$options.router
        this._router.init(this) // 初始化方法
        Vue.util.defineReactive(this, '_route', this._router.history.current)
      } else {
        this._routerRoot = this.$parent && this.$parent._routerRoot // 保证所有实例 _routerRoot 为 Vue 实例 可以拿到 跟实例的 _router 属性
      }
    },
  })
  // 帮到 vue 原型上 让所有 Vue 实例组件可以访问
  // 路由规则
  Object.defineProperty(Vue.prototype, '$route', {
    get() {
      return this._routerRoot._route
    },
  })
  // 路由对象
  Object.defineProperty(Vue.prototype, '$router', {
    get() {
      return this._routerRoot._router
    },
  })

  Vue.compoent(`RouterLink`, Link)
  Vue.compoent(`RouterView`, View)
}
