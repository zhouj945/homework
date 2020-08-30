const path = require('path')
const webpack = require('webpack')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

class MyPlugin {
  apply (compiler) {
    // console.log(compiler)
    compiler.hooks.emit.tap('MyPlugin', compilation => {
      // compilation => 可以理解为此次打包的 上下文
      for ( const fileName in compilation.assets) {
        // console.log( compilation.assets[fileName].source())
        if (fileName.endsWith('.js')) {
          const contents =  compilation.assets[fileName].source()
          const withoutComments = contents.replace(/\/\*+\*\//g, '')
          compilation.assets[fileName] = {
            source: ()=> withoutComments,
            size: ()=> withoutComments.length
          }
        }
      }
    })
  }
}


module.exports = {
  mode: 'none',
  entry: "./src/index.js",
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist'),
    //publicPath: 'dist/'   // _webpack.require_.p
  },
  devServer: {
    // 热更新 配置
    hot: true,
    // 静态资源路径   ‘’ or []
    contentBase: './pulic',
    proxy: {
      '/api': {
        // http://localhost:8080/api/users => https://api.github.com/api/users
        target: 'https://api.github.com',
        // http://localhost:8080/api/users => https://api.github.com/users
        patchRewrite: {   // 路径重写
          '^/api': ''  // 会利用正则匹配
        },
        // 不能使用 localhost:8080 作为请求的 主机名
        changeOrigin: true
      }
    }
  },
  // 定义一些开发过程中的辅助工具
  devtool: 'source-map',
  // 配置一些 webpack的 优化选项
  optimization: {
    useExports: true
  },
  module: {
    // 其他模块的 加载规则设置
    rules: [
      {
        test: /.md$/,
        use: [
          'html-loader',
          './markdown-loader'
        ]
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /.css$/,   // 匹配遇到的模块文件
        use: ['style-loader', 'css-loader'] // 使用 对应的 loader 处理模块文件
      },
      {
        test: /.png$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10 * 1024 // 10KB
          }
        }
      },
      // {
      //   test: /.html$/,
      //   use: {
      //     loader: 'html-loader',
      //     options: {
      //       attrs: ['img:src', 'a:href']
      //     }
      //   }
      // }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'webpack plugin',
      meta: {
        viewport: 'width=device-width'
      },
      template: './src/index.html'
    }),
    // 用于生成 about.html
    new HtmlWebpackPlugin({
      filename: 'about.html'
    }),
    // 开发阶段不需要此插件
    // new CopyWebpackPlugin({
    //   patterns: [
    //   { from: 'public', to: 'public'}
    // ]}),
    new MyPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    // 接受一个对象 ， 每个key 会注入到代码当中 value 是一个js 代码片段
    new webpack.DefinePlugin({
      // API_BASE_URL: '"https://api.example.com"'
      API_BASE_URL: JSON.stringify('https://api.example.com')
    }),

    new MiniCssExtractPlugin()
  ]
}