const { reject, curry } = require('lodash')
const { resolve } = require('../../task-04/code/vue-app-base/webpack.common')

const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
  constructor(executor) {
    try {
      executor(this.resolve, this.reject)
    } catch (e) {
      this.reject(e)
    }
  }
  // promise 状态
  status = PENDING
  // 成功后的值
  value = undefined
  // 失败的原因
  reason = undefined
  // 成功的回调
  sucessCallback = []
  // 失败的回调
  failCallback = []
  // 用 箭头函数  使 this 始终指向Promise对象
  resolve = value => {
    // 如果状态不是等待， 组织程序向下执行
    if (this.status !== PENDING) return
    // 将状态改正成功
    this.status = FULFILLED
    // 保存成功之后的值
    this.value = value
    // 判断成功回调是否存在， 存在则调用
    // if (this.sucessCallback) this.sucessCallback(this.value)
    while (this.sucessCallback.length) this.sucessCallback.shift()()
  }

  reject = reason => {
    // 如果状态不是等待， 组织程序向下执行
    if (this.status !== PENDING) return
    // 将状态改成失败
    this.status = REJECTED
    // 保存失败之后的原因
    this.reason = reason
    // 判断失败回调是否存在， 存在则调用
    // if (this.failCallback) this.failCallback(this.reason)
    while (this.failCallback.length) this.failCallback.shift()()
  }

  then(sucessCallback, failCallback) {
    sucessCallback = sucessCallback ? sucessCallback : value => value
    failCallback = failCallback
      ? failCallback
      : reason => {
          throw reason
        }
    let promise2 = new MyPromise((resolve, reject) => {
      // 判断状态
      if (this.status === FULFILLED) {
        setTimeout(() => {
          try {
            let x = sucessCallback(this.value)
            // 判断 x 的值是普通值， 还是promise对象
            // 如果是 普通值 直接调用 resolve
            // 如果是 promise 对象 查看 promise 对象返回的结果
            // 再根据结果 决定调用 resolve 还是 reject
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0)
      } else if ((this.st, tus === REJECTED)) {
        setTimeout(() => {
          try {
            let x = failCallback(this.reason)
            // 判断 x 的值是普通值， 还是promise对象
            // 如果是 普通值 直接调用 resolve
            // 如果是 promise 对象 查看 promise 对象返回的结果
            // 再根据结果 决定调用 resolve 还是 reject
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0)
      } else {
        // 等待
        // 将成功回到和失败回到储存起来
        this.sucessCallback.push(() => {
          setTimeout(() => {
            try {
              let x = sucessCallback(this.value)
              // 判断 x 的值是普通值， 还是promise对象
              // 如果是 普通值 直接调用 resolve
              // 如果是 promise 对象 查看 promise 对象返回的结果
              // 再根据结果 决定调用 resolve 还是 reject
              resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          }, 0)
        })
        this.failCallback.push(() => {
          setTimeout(() => {
            try {
              let x = sucessCallback(this.value)
              // 判断 x 的值是普通值， 还是promise对象
              // 如果是 普通值 直接调用 resolve
              // 如果是 promise 对象 查看 promise 对象返回的结果
              // 再根据结果 决定调用 resolve 还是 reject
              resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          }, 0)
        })
      }
    })

    return promise2
  }

  finally = callback => {
    // then 方法可以拿到当前对象实例的状态
    return this.then(
      value => {
        // 需要等待异步执行
        return MyPromise.resolve(callback()).then(() => value)
      },
      reason => {
        return MyPromise.resolve(callback()).then(() => {
          throw reason
        })
      }
    )
  }

  catch = failCallback => {
    return this.then(undefined, failCallback)
  }

  static all = array => {
    let result = []
    let index = 0

    return new MyPromise((resolve, reject) => {
      function addData(key, value) {
        result[key] = value
        index++
        if (index === array.length) {
          resolve(result)
        }
      }
      for (let i = 0; i < array.length; i++) {
        const current = array[i]
        if (current instanceof MyPromise) {
          current.then(
            value => addData(i, value),
            reason => reject(reason)
          )
        } else {
          addData(i, current)
        }
      }
    })
  }

  static resolve = value => {
    if (value instanceof MyPromise) return value
    return new MyPromise(resolve => resolve(value))
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) reject(new TypeError('循环错误'))
  if (x instanceof MyPromise) {
    // promise 对象
    // x.then(value=> resolve(value), reason => reject(reason))
    x.then(resolve, reject)
  } else {
    // 普通值
    resolve(x)
  }
}

module.exports = MyPromise
