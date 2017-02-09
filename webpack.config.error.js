const webpack = require('webpack')
const path = require('path')
// noinspection JSUnresolvedFunction
module.exports = {
    entry: [
        './app'
    ],
    context: path.resolve(__dirname, 'resources/assets/js'),
    output: {
        path: path.resolve(__dirname, 'public/js'),
        filename: 'app.js',
        publicPath: '/js/'
    },
    devtool: 'eval-source-map',
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'style'
                    },
                    {
                        loader: 'css',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass',
                        options: {
                            sourceMap: true,
                            includePaths: [
                                path.resolve(__dirname, 'node_modules/foundation-sites/scss'),
                                path.resolve(__dirname, 'node_modules/motion-ui/src'),
                                path.resolve(__dirname, 'resources/assets/sass')
                                ]
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.webpack.js', '.web.js', '.js']
    },
    resolveLoader: {
        moduleExtensions: ['-loader']
    },
}