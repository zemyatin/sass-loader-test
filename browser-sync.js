/**
 * Require Browsersync along with webpack and middleware for it
 */
var browserSync = require('browser-sync').create()
var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
/**
 * Require ./webpack.config.js and make a bundler from it
 */
var webpackConfig = require('./webpack.config')
var bundler = webpack(webpackConfig)

/**
 * Run Browsersync and use middleware for Hot Module Replacement
 */
browserSync.init({
    proxy: 'http://3oakdb.dev',
    cors: true,
    https: false,
    port: 3000,
    open: false,
    middleware: [
        webpackDevMiddleware(bundler, {
            publicPath: webpackConfig.output.publicPath,
            stats: {chunks: false}
        }),
        webpackHotMiddleware(bundler)
    ],
    files: ['app/', 'database/', 'migrations/', 'config/']
})
