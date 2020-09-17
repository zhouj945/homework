const commonConfig = require('./webpack.common')
const { merge } = require('webpack-merge')
const { DefinePlugin } = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = merge(commonConfig, {
  mode: 'production',
  output: {
    filename: '[name].[contenthash: 8].bundle.js',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new DefinePlugin({
      BASE_URL: JSON.stringify('http://www.baidu.com/'),
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: __dirname + '/public', to: __dirname + '/dist', toType: 'dir' },
        { from: __dirname + '/src/assets', to: __dirname + '/dist/assets' },
      ],
    }),
  ],
})
