#### 为什么有jsx 的文件要引入 React 模块 即使没用到
1. 因为 babel 会把 jsx 转换成 React.ceateElement()
2. jsx => createElement 方法是吧  jsx 转换成 => 渲染函数 返回 => VirtualDom 对象 => 真实Dom
3. 通过  Babel 转译的
4. jsx => React.createElement(tag: string，props: object, children: any)
5. React.createElement() => VirtualDom

#### VirtualDom
- 用对象 描述 真实Dom
- react 第一次创建 DOM 对象后，会为每个dom 对象创建其对应的 virtual dom 对象， 再dom 对象发生更新之前， 会先更新 virtual DOM 对象，然后 会将 更新前的 和 更新后的 virtural dom 进行比较，从而找出发生变化的部分，react会将发生变化的部分更新到真实的 Dom 对象中，react 仅更新必要的部分。
- virtual dom 对象的更新和比较发生在内存中

#### 修改 babel jsx -> React.createElememt()

- pragma:
  - string, defaults to React.createElement.

    Replace the function used when compiling JSX expressions.
```json
{
  "presets": [
    "@babel/preset-env",
    [
      "@babel/preset-react",
      {
        "pragma": "TinyReact.createElement"
      }
    ]
  ]
}
```

可以将 babel 编译后的 代码 React.createElement() 换成 TinyReact.createElement（）


- render 方法
  - 是框架向外开放的
  ```js
    render(virtualDom, container, oldDom)
  ```
- 创建dom节点 和 组件
- 给dom 添加属性我
- 组件的 virtualDom 的 type 的类型为 函数  （不论类组件还是函数组件）
- 判断组件是类组件还是函数组件（看该组件的原型方法是否有render方法）
- 组件渲染为dom时 直接执行 virtualDom.type
- props 就直接传入执行的函数丽 virtualDom.type(virtualDom.props || {})
- 类组件继承component对象 调用 new virtualDOM.type() 创建组件实例， 调用 实例的 render() 返回 virtualDOM 再判断是组件还是dom
- 类组件的属性， 通过调用构造函数传递 new virtualDOM.type(virtualDOM.props||{}) , 调用 react.Component的构造函数，绑定this.props= props 父类有了 子类也就有了 this.props.xxx
- 更新dom元素
  - 在virtualDOM 渲染为dom节点时 添加个一个属性 _virtualDOM 保存对应节点的 virtualDOM
  - 对比前后两次virtualDOM  diff 接收的 oldDOM 为 container.firstChild._virtualDOM
  - 之后对比virtualDOM 和 oldVirtualDOM 的差异 更新 dom
  - 属性的对比注意
    - 事件 addEventListener的 添加是不能覆盖的 要调用removeEventListener 去掉上一次的事件绑定
    - 没有的props 也要去掉 （判断新的props 是否在 oldProps里有值）
  - **diff是同级比较 深度优先的**
  - 不同类型的 virtualDOM 不需要对比， 直接生成新的dom 替换旧的 要调用父级的 replaceChild(newElement, oldDOm)
  - 删除节点
    - 发上在节点更新完之后
    - 同一个父级下的子节点个数不同需要删除
    - 采用倒叙循环 满足条件
    ```js
    for (
            let i = oldChildNodes.length - 1;
            i > virtualDOM.children.length - 1;
            i--
          ) {
            unmountNode(oldChildNodes[i])
          }
    ```

- setState:
  - 创建在 React.Component的类里
  - 合并 state 可以用 Object.assign()
  - 新旧 VirtualDOM的对比
  - 会调用 render()

- 组件需要判断是不是同一个

// setState 到 删除节点 需要再看一遍