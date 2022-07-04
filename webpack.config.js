const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpackBaseConfig = require("./webpack.common");
var CopyWebpackPlugin = require('copy-webpack-plugin');
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = function(env, argv){
   
    // webpackBaseConfig.mode = env && env.production ? 'production' : 'development';
    
    if (env && env.production) {
        //生产环境下构建，要先清理目录文件
        webpackBaseConfig.plugins.push(new CleanWebpackPlugin(path.resolve('dist/*')));
    }
    webpackBaseConfig.plugins.push(new MiniCssExtractPlugin({
        filename: "css/[name].css",//将css文件单独放入css文件夹中
        chunkFilename: "css/main.css" //公共样式提取到main.css
    }));
    webpackBaseConfig.plugins.push(new HtmlWebpackPlugin({
        template: './html/index.html',
        inject:true
    }))
     //copy
    //  webpackBaseConfig.plugins.push(new CopyWebpackPlugin([
    //     {
    //         from: __dirname + '/src/assets/images',
    //         to: 'assets/images'
    //     }
    // ]));
    // webpackBaseConfig.plugins.push(new CopyWebpackPlugin([
    //     {
    //         from: __dirname + '/src/assets/iconfont',
    //         to: 'assets/iconfont'
    //     }
    // ]));
    return webpackBaseConfig;

}
