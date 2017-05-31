const { paths } = require('./configs');

module.exports = {
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      assets: `${paths.srcPath}/assets`,
      components: `${paths.srcPath}/components`,
      hocs: `${paths.srcPath}/hocs`,
      router: `${paths.srcPath}/router`,
      styles: `${paths.srcPath}/styles`,
      utils: `${paths.srcPath}/utils`,
      widgets: `${paths.srcPath}/widgets`
    }
  },
  rules: [
    {
      test: /\.js$/,
      enforce: 'pre',
      include: paths.srcPath,
      loader: require.resolve('eslint-loader')
    },
    {
      test: /\.(eot|otf|ttf|woff|woff2)(\?.*)?$/,
      loader: require.resolve('file-loader'),
      options: {
        name: 'fonts/[name].[hash:8].[ext]'
      }
    },
    {
      test: /\.(jpg|jpeg|png|gif|svg|ico|webp)(\?.*)?$/,
      loader: require.resolve('file-loader'),
      options: {
        name: 'media/[name].[hash:8].[ext]'
      }
    },
    {
      test: /\.(mp4|webm|wav|mp3|m4a|aac|oga)(\?.*)?$/,
      loader: require.resolve('url-loader'),
      options: {
        limit: 10000,
        name: 'media/[name].[hash:8].[ext]'
      }
    }
  ],
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};
