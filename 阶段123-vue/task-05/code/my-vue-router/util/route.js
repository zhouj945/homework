export default function createRoute(record, path) {
  // 根据 path 匹配都的所有的 record 放到 matched 数组中
  // 如果 path 是子路由的话 record 会有 parent 属性
  // 此时应该把 parent --》 record
  // matched  --> 【parentRecord， childRecord】
  const matched = []
  while (record) {
    matched.unshift(record)
    record = record.parent
  }
  return {
    path,
    matched,
  }
}
