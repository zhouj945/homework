const path = require('path')
module.exports = {
  mode: 'none',
  entry: "./src/index.js",
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist'),
    publicPath: 'dist/'   // _webpack.require_.p
  },
  module: {
    // 其他模块的 加载规则设置
    rules: [
      {
        test: /.js$/,
        use: 'babal-loader'
      },
      {
        test: /.css$/,   // 匹配遇到的模块文件
        use: ['style-loader', 'css-loader'] // 使用 对应的 loader 处理模块文件
      },
      {
        test: /.png$/,
        use: {
          loader: 'url-loader',
          option: {
            limit: 10 * 1024 // 10KB
          }
        }
      }
    ]
  }
}