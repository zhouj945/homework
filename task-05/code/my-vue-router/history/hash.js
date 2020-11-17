import Histroy from './base'
export default class HashHistory extends Histroy {
  constructor(router) {
    super(router)
    // 确保首次访问为#/
    ensureSlash()
  }
  // 获取当前的路由地址
  getCurrentLocation() {
    return window.location.hash.slice(1)
  }

  // 静听 hashChange 监听路由地址的变化
  setUpListener() {
    window.addEventListener('hashchange', () => {
      this.transitionTo(this.getCurrentLocation())
    })
  }
}

function ensureSlash() {
  // 判断当前是否有hash
  if (window.location.hash) {
    return
  }
  window.location.hash = '/'
}
