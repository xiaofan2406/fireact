const { paths } = require('./configs');

module.exports = {
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      assets: `${paths.srcDir}/assets`,
      components: `${paths.srcDir}/components`,
      hocs: `${paths.srcDir}/hocs`,
      router: `${paths.srcDir}/router`,
      styles: `${paths.srcDir}/styles`,
      utils: `${paths.srcDir}/utils`,
      widgets: `${paths.srcDir}/widgets`
    }
  },
  rules: [
    {
      test: /\.js$/,
      enforce: 'pre',
      include: paths.srcDir,
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
