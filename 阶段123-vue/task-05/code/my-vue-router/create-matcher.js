import createRouteMap from './create-route-map'
import createRoute from './util/route'

export default function createMatcher(routes) {
  // 把路由规则 解析到路由表
  // pathList ['/', '/music' ...]
  // pathMap  { path: { component. ...}}
  const { pathList, pathMap } = createRouteMap(routes)

  function match(path) {
    const record = pathMap[path]
    if (record) {
      return createRoute(record, path)
    }
    return createRoute(null, path)
  }
  function addRoutes(routes) {
    createRouteMap(routes, pathList, pathMap)
  }

  return {
    match,
    addRoutes,
  }
}
