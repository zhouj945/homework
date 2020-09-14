const commonConfig = require('./webpack.common')
const { merge } = require('webpack-merge')
const { DefinePlugin } = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = merge(commonConfig, {
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin(),
    new DefinePlugin({
      BASE_URL: JSON.stringify('http://www.baidu.com/'),
    }),
  ],
})
