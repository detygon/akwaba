const appConfig = require('./src/app.config')
const { GenerateSW } = require('workbox-webpack-plugin')

/** @type import('@vue/cli-service').ProjectOptions */
module.exports = {
  configureWebpack: {
    // We provide the app's title in Webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: appConfig.title,
    // Set up all the aliases we use in our app.
    resolve: {
      alias: require('./aliases.config').webpack,
    },
    performance: {
      // Only enable performance hints for production builds,
      // outside of tests.
      hints:
        process.env.NODE_ENV === 'production' &&
        !process.env.VUE_APP_TEST &&
        'warning',
    },
    plugins: [],
  },
  css: {
    // Enable CSS source maps.
    sourceMap: true,
  },
}

module.exports.configureWebpack.plugins = (
  module.exports.configureWebpack.plugins || []
).concat([new GenerateSW()])
