const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
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
<<<<<<< HEAD
        exclude: /node_modules/,
=======
        exclude: /node_modules/
>>>>>>> be60277167217e623ed79a655a225babb1adafe7
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
<<<<<<< HEAD
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        enforce: 'pre',
      },
      {
        test: /\.(sa|sc|c|le)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: true,
              publicPath: './',
              limit: 1,
            },
          },
          'css-loader',
          'less-loader',
        ],
        exclude: /node_modules/,
=======
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
        exclude: /node_modules/
>>>>>>> be60277167217e623ed79a655a225babb1adafe7
      },
      // {
      //   test: /\.less$/,
      //   use: ['style-loader', 'css-loader', 'less-loader'],
      //   exclude: '/node_modules/',
      // },
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
      filename: 'index[hash].html',
      template: './public/index.html',
      templateParameters: {
        BASE_URL: './favicon.ico',
      },
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/[id].css',
    }),
  ],
}
