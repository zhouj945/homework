export default function createRouteMap(routes, oldPathList, oldPathMap) {
  const pathList = oldPathList || []
  const pathMap = oldPathMap || {}

  // 遍历所有的路由规则 解析到 list map 中
  // 需要递归 因为存在自路由 形式
  routes.forEach(route => {
    addRouteRecord(route, pathList, pathMap)
  })

  return { pathList, pathMap }
}

// 解析 route， 把解析好的 规则 放入 list 和 map 中
function addRouteRecord(route, pathList, pathMap, parentRecord) {
  const path = parentRecord ? `${parentRecord.path}/${route.path}` : route.path
  const component = route.component
  const record = {
    path,
    component,
    parent: parentRecord, // 如果是子路由， 记录自由路对应的父 record
  }

  // 跳过相同的path
  if (!pathMap[path]) {
    pathList.push(path)
    pathMap[path] = record
  }

  // 是否有子路由的存在
  if (route.children) {
    // 递归 自路由 添加路由表
    route.children.forEach(childRoute => {
      addRouteRecord(childRoute, pathList, pathMap, record)
    })
  }
}
