const commonConfig = require('./webpack.common')
const { merge } = require('webpack-merge')
const { DefinePlugin } = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = merge(commonConfig, {
  mode: 'production',
  output: {
    filename: '[name].[contenthash: 8].bundle.js',
    publicPath: 'http://cdn.cn/', // 生产模式  cdn资源路径
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 0,
    },
    minimizer: [new OptimizeCssAssetsWebpackPlugin(), new TerserWebpackPlugin()],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new DefinePlugin({
      BASE_URL: JSON.stringify('http://www.baidu.com/'),
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: __dirname + '/public', to: __dirname + '/dist/public', toType: 'dir' },
        { from: __dirname + '/src/assets', to: __dirname + '/dist/assets' },
      ],
    }),
    new BundleAnalyzerPlugin(),
  ],
})
