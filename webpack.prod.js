var webpack = require("webpack");
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var path = require("path");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    module: {
        rules: [{
            test: /\.less$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader?{"minimize": true}', 'postcss-loader', `less-loader`]
            })
        }]
    },
    plugins: [
        new CleanWebpackPlugin(['dist_brand', 'dev_brand'], {
            //根目录
            root: path.join(__dirname, "..", ".."),
            //开启在控制台输出信息
            verbose: true,
            //启用删除文件
            dry: false
        }),
        new UglifyJsPlugin({
            sourceMap: true,
            uglifyOptions: {
                ie8: true,
                compress: {
                    warnings: false,
                    drop_console: true
                }
            }
        }),
        new ExtractTextPlugin("css/[name].css"),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify("production")
            },
            __DEV__: false,
        }),
    ]
})
