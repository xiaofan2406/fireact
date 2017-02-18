const webpack = require('webpack');
const paths = require('./paths');
const common = require('./webpack.common');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const localIp = require('./localIp');

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: [
    'react-hot-loader/patch',
    `${paths.srcDir}/index.js`
  ],
  resolve: common.resolve,
  output: {
    // For dev, `path` and `filename` are not important because of using webpack-dev-server
    path: paths.buildDir,
    filename: 'bundle.js',
    // In development, we always serve from the root. This makes config easier.
    publicPath: '/',
    // Add /* filename */ comments to generated require()s in the output.
    pathinfo: true
  },
  module: {
    rules: [
      ...common.rules,
      {
        test: /\.js$/,
        include: paths.srcDir,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  node: common.node,
  performance: { hints: false },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: `${paths.srcDir}/index.html`,
      favicon: `${paths.srcDir}/favicon.ico`
    }),
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"development"' }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    compress: true,
    contentBase: paths.buildDir,
    hot: true,
    publicPath: '/',
    stats: 'errors-only',
    watchOptions: {
      ignored: /node_modules/
    },
    host: process.env.HOST || localIp,
    port: process.env.PORT || 8080
  }
};
