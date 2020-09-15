const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: path.join(__dirname, '/src/main.js'),
  output: {
    filename: '[name].[hash].bundle.js',
    path: path.join(__dirname, 'dist'),
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
        test: /\.(png|jpg|gif|ico)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
      {
        test: /\.(woff2)$/i,
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
        BASE_URL: './favicon.ico',
      },
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: __dirname + '/public', to: __dirname + '/dist', toType: 'dir' },
        { from: __dirname + '/src/assets', to: __dirname + '/dist/assets' },
      ],
    }),
  ],
}
