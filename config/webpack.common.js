const paths = require('./paths');


module.exports = {
  resolve: {
    // This allows you to set a fallback for where Webpack should look for modules.
    // We use `fallback` instead of `root` because we want `node_modules` to "win"
    // if there any conflicts. This matches Node resolution mechanism.
    // https://github.com/facebookincubator/create-react-app/issues/253
    fallback: paths.nodeModulesDir,
    extensions: ['', '.js', '.json'],
    alias: {
      components: `${paths.appDir}/components`,
      hocs: `${paths.appDir}/hocs`,
      styles: `${paths.appDir}/styles`,
      utils: `${paths.appDir}/utils`,
      app: paths.appDir // this allows import 'app/...' without knowing the relative path
    }
  },
  preLoaders: [
    {
      test: /\.js$/,
      include: paths.appDir,
      loader: 'eslint'
    }
  ],
  loaders: [
    {
      test: /\.json$/,
      loader: 'json'
    },
    {
      test: /\.(eot|otf|ttf|woff|woff2)(\?.*)?$/,
      loader: 'file',
      query: {
        name: 'fonts/[name].[hash:8].[ext]'
      }
    },
    {
      test: /\.(jpg|jpeg|png|gif|svg|ico|webp)(\?.*)?$/,
      loader: 'file',
      query: {
        name: 'media/[name].[hash:8].[ext]'
      }
    },
    {
      test: /\.(mp4|webm|wav|mp3|m4a|aac|oga)(\?.*)?$/,
      loader: 'url',
      query: {
        limit: 10000,
        name: 'media/[name].[hash:8].[ext]'
      }
    }
  ],
  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};
