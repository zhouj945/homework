const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: path.join(__dirname, '/src/main.js'),
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: './',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(vue)$/,
        loader: 'vue-loader',
        exclude: '/node_modules/',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: '/node_modules/',
      },
      // {
      //   test: /\.(less)$/,
      //   loader: ['vue-style-loader', 'css-loader', 'less-loader'],
      //   exclude: '/node_modules/',
      // },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        exclude: '/node_modules/',
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
        exclude: '/node_modules/',
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      title: 'myVueApp',
      filename: 'index.html',
      template: './public/index.html',
      templateParameters: {
        BASE_URL: JSON.stringify('./'),
      },
    }),
  ],
}
