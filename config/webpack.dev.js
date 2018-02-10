const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require('./webpack.common');
const { devServerPort, localIp, paths } = require('./configs');

// https://github.com/facebookincubator/create-react-app/blob/master/packages/react-dev-utils/ignoredFiles.js
const ignoredFiles = new RegExp(
  `^(?!${path
    .normalize(`${paths.appSrc}/`)
    .replace(/[\\]+/g, '/')}).+/node_modules/`,
  'g'
);

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: ['react-hot-loader/patch', `${paths.appSrc}/index.js`],
  resolve: common.resolve,
  output: {
    filename: 'bundle.js',
    chunkFilename: 'js/[name].chunk.js',
    // Necessary for HMR to know where to load the hot update chunks
    publicPath: '/',
    // Add /* filename */ comments to generated require()s in the output.
    pathinfo: true,
    devtoolModuleFilenameTemplate: ({ absoluteResourcePath }) =>
      path.resolve(absoluteResourcePath),
  },
  module: {
    strictExportPresence: true,
    rules: [
      ...common.rules,
      {
        test: /\.js$/,
        include: paths.appSrc,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: `${paths.appSrc}/assets/index.html`,
      favicon: `${paths.appSrc}/assets/favicon.ico`,
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  node: common.node,
  performance: {
    hints: false,
  },
  devServer: {
    compress: true,
    historyApiFallback: {
      disableDotRule: true,
    },
    hot: true,
    publicPath: '/',
    stats: 'errors-only',
    watchOptions: {
      ignored: ignoredFiles,
    },
    https: process.env.HTTPS === 'true',
    host: localIp,
    port: devServerPort,
  },
};
