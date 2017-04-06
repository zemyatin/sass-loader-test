const webpack = require('webpack')
const path = require('path')

const sassOpt = {
    sourceMap: true,
    includePaths: [
        path.resolve(__dirname, 'vendor/zurb/foundation/scss'),
        path.resolve(__dirname, 'resources/assets/libs/animate')
    ]
}
const config = {
    entry: {
        main: [
            'babel-polyfill',
            './app'
        ]
    },
    context: path.resolve(__dirname, 'resources/assets/js'),
    output: {
        path: path.resolve(__dirname, 'public/js'),
        filename: '[name].chunk.js',
        chunkFilename: '[chunkhash].[id].js',
        publicPath: '/js/',
        pathinfo: true
    },
    devtool: 'eval',
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules|vue\/src/,
                options: {
                    appendTsSuffixTo: [/\.vue$/]
                }
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
                    esModule: true,
                    loaders: {
                        scss: 'vue-style-loader!css-loader!sass-loader?' + JSON.stringify(sassOpt)
                    }
                }
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: sassOpt
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js', '.vue'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            options: {
                context: '/'
            }
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ]
}
// console.log(config.module.rules[3].use[2])
module.exports = config
