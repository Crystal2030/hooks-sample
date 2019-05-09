var webpack = require("webpack");
var path = require("path");
const merge = require('webpack-merge');
const common = require('./webpack.common.js');



module.exports = merge(common, {
    devtool: 'inline-source-map',
    module: {
        rules: [{
            test: /\.less$/,
            include: [
                path.resolve(__dirname, './src'),
                path.resolve(__dirname, './node_modules/'), //解决webpack 配置 antd 样式出错
            ],
            use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }, {
                loader: "postcss-loader", //注意 ： postcss-loader必须在less-loader前面否则 解析less会报错
                options: {
                    sourceMap: true
                } //sourceMap isn't supported by postcss.config.js, you need to add it to webpack.config.js instead.
            }, {
                loader: `less-loader?{"sourceMap":true}`
            }]
        }],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify("development")
            },
            __DEV__: true,
        }),
    ],
    devServer: {
        //防止刷新404的问题
        historyApiFallback: true,
        contentBase: './',
        inline: true,
        hot: true,
        port: 3010,
    }
})
