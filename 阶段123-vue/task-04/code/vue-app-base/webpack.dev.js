const path = require('path')
const webpack = require('webpack')
const commonConfig = require('./webpack.common')
const { merge } = require('webpack-merge')
const { DefinePlugin, HotModuleReplacementPlugin } = require('webpack')

module.exports = merge(commonConfig, {
  mode: 'development',
  devServer: {
    hot: true,
    // hotOnly: true,
    publicPath: '/',
    contentBase: [path.join(__dirname, '/dist'), './public', './assets'],
    historyApiFallback: true,
    compress: true,
    progress: true,
    inline: true,
    quiet: true,
    port: 9000,
  },
  devtool: 'cheap-module-eval-souce-map',
  plugins: [
    // new DefinePlugin({
    //   BASE_URL: JSON.stringify('https://api.example.com'),
    // }),
    new HotModuleReplacementPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
  ],
})
