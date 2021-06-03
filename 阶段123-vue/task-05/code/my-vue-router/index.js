import install from './install'
import createMatcher from './create-matcher'
import HashHistory from './history/hash'
import HTML5Histpry from './history/html5'

export default class VueRouter {
  constructor(options) {
    this._routes = options.routes || []
    // 匹配器 { match 根据路由地址匹配路由规则对象 , addRoutes 动态添加路由}
    this.matcher = createMatcher(this.routes)
    const mode = (this.mode = options.mode || 'hash')
    switch (mode) {
      case 'hash':
        this.history = new HashHistory(this)
        break
      case 'history':
        this.history = new HTML5Histpry(this)
        break
      default:
        break
    }
  }

  // 注册路由变化的事件
  init(app) {
    const history = this.history

    // 问了使this 指向history
    const setUpListener = () => {
      history.setUpListener()
    }
    history.transitionTo(history.getCurrentLocation(), setUpListener)

    history.listen(route => {
      app._route = route
    })
  }
}

VueRouter.install = install
