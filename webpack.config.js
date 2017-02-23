const webpack = require('webpack')
const path = require('path')
// noinspection JSUnresolvedFunction
module.exports = {
    entry: [
        'babel-polyfill',
        'webpack/hot/dev-server',
        // ?reload=true enables full page reload on hmr failure
        'webpack-hot-middleware/client?reload=true',
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
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015'],
                    plugins: ['lodash']
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        scss: 'vue-style-loader!css-loader!sass-loader', // <style lang="scss">
                        sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax' // <style lang="sass">
                    }
                }
            },
            {
                test: /\.scss$/,
                use: [
                    {loader: 'style-loader'},
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                            includePaths: [
                                path.resolve(__dirname, 'node_modules/foundation-sites/scss'),
                            ]
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        alias: {
            'inputmask.dependencyLib': path.resolve(__dirname, 'node_modules/jquery.inputmask/extra/dependencyLibs/inputmask.dependencyLib/'),
            'inputmask': path.resolve(__dirname, 'node_modules/jquery.inputmask/dist/inputmask/inputmask/')
        },
        extensions: ['.webpack.js', '.web.js', '.tsx', '.ts', '.js']
    },
    // watchOptions: {
    //     poll: 1000 // <-- it's worth setting a timeout to prevent high CPU load
    // },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        // new webpack.LoaderOptionsPlugin({
        //     options: {
        //         context: '/', // <- putting this line right under "options" did the trick
        //         sassLoader: {
        //             includePaths: [
        //                 path.resolve(__dirname, 'vendor/zurb/foundation/scss'),
        //                 path.resolve(__dirname, 'node_modules/motion-ui/src'),
        //                 path.resolve(__dirname, 'resources/assets/sass')
        //             ]
        //         }
        //     }
        // })
    ]
}
