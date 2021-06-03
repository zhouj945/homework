import createRouter from '../util/route'
export default class History {
  constructor(router) {
    this.router = router
    // { path: '/', matched: [] }
    this.current = createRouter(null, '/')
    // 回调，在 hashhistory 中赋值 ， 更改 vue 实例上的 _route
    this.cb = null
  }

  listen(cb) {
    this.cb = cb
  }

  // 跳转到其他位置 onComplete回调 监听变化
  transitionTo(path, onComplete) {
    this.current = this.router.matcher.match(path)

    this.cb && this.cb(this.current)

    onComplete && onComplete()
  }
}
