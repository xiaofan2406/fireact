const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require('./webpack.common');
const { devPort, devIp, paths } = require('./configs');
const babelrc = require('../.babelrc');

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: [
    'react-hot-loader/patch',
    `webpack-dev-server/client?http://${devIp}:${devPort}`,
    'webpack/hot/only-dev-server',
    `${paths.srcDir}/index.js`
  ],
  resolve: common.resolve,
  output: {
    // For dev, `path` and `filename` are not important because of using webpack-dev-server
    path: paths.buildDir,
    filename: 'bundle.js',
    // Necessary for HMR to know where to load the hot update chunks
    publicPath: '/',
    // Add /* filename */ comments to generated require()s in the output.
    pathinfo: true
  },
  module: {
    strictExportPresence: true,
    rules: [
      ...common.rules,
      {
        test: /\.js$/,
        include: paths.srcDir,
        loader: require.resolve('babel-loader'),
        options: {
          babelrc: false,
          presets: babelrc,
          cacheDirectory: true
        }
      },
      {
        test: /\.css$/,
        use: [require.resolve('style-loader'), require.resolve('css-loader')]
      }
    ]
  },
  node: common.node,
  performance: { hints: false },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: `${paths.srcDir}/assets/index.html`,
      favicon: `${paths.srcDir}/assets/favicon.ico`
    }),
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"development"' }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ],
  devServer: {
    compress: true,
    historyApiFallback: { disableDotRule: true },
    hot: true,
    publicPath: '/',
    stats: 'errors-only',
    watchOptions: {
      ignored: /node_modules/
    },
    https: process.env.HTTPS === 'true',
    host: process.env.HOST || devIp,
    port: process.env.PORT || devPort,
    setup(app) {
      app.use((req, res, next) => {
        if (req.url === '/service-worker.js') {
          res.setHeader('Content-Type', 'text/javascript');
          res.send();
        } else {
          next();
        }
      });
    }
  }
};
