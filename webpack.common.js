var webpack = require("webpack");
var path = require("path");
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        main: path.join(__dirname, './src/app.js'),
        commons: [ 'react', 'react-dom', 'babel-polyfill']
    },
    devtool: '#source-map',
    output: {
        //很重要 发布的时候静态文件的前缀
        publicPath: "/",
        path: path.join(__dirname, "./dist"),
        filename: "js/[name].[hash].js",
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }]
        }, {
            test: /\.js[x]?$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['react', 'env'],//babel-preset-env 是一个新的 preset，可以根据配置的目标运行环境（environment）自动启用需要的 babel 插件。使用此preset可以删掉所有的es2015，es2016,甚至是latest
                    plugins: [
                        ["import", {
                            "libraryName": "antd",
                            "style": true
                        }],
                        "transform-class-properties",
                        "transform-object-rest-spread"
                    ]
                }
            }
        }, {
            test: /\.(png|jpg|gif|PNG|JPG|GIF)$/,
            use: [{
                loader: "url-loader",
                options: {
                    limit: 8192,
                    name: "image/[name].[ext]" //前面不能加斜杠 否则404
                }
            }]
        }, {
            test: /\.(svg|ttf|eot|woff|woff2)$/,
            use: [{
                loader: "file-loader",
                options: {
                    name: "fonts/[name].[ext]" //前面不能加斜杠 否则404
                }
            }]
        },],
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: "commons",
            filename: "js/commons.js",
            minChunks: Infinity
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, "index.html"),
            chunks: ['commons', 'main']
        }),
        new webpack.ProvidePlugin({
            "React": "react",
            "ReactDOM": "react-dom",
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
    }
};
