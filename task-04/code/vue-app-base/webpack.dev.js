const path = require('path')
const commonConfig = require('./webpack.common')
const { merge } = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { DefinePlugin, HotModuleReplacementPlugin } = require('webpack')

module.exports = merge(commonConfig, {
  mode: 'development',
  devServer: {
    hot: true,
    hotOnly: true,
    contentBase: path.join(__dirname, '/dist'),
    compress: true,
    port: 9000,
  },
  plugins: [
    new CleanWebpackPlugin(),
    // new DefinePlugin({
    //   BASE_URL: JSON.stringify('https://api.example.com'),
    // }),
    new HotModuleReplacementPlugin(),
  ],
})
