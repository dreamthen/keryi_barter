/**
 * Created by yinwk on 2017/5/28.
 */
//导入webpack--打包管理工具
const webpack = require("webpack");
//导入path--路径处理工具
const path = require("path");
//导入htmlWebpackPlugin--html文件webpack打包管理插件
const htmlWebpackPlugin = require("html-webpack-plugin");
//导入自动添加css扩展头以兼容浏览器的管理工具
const autoprefixer = require("autoprefixer");
//路径巡航
//相当于cd __dirname之后,cd ../dll
//先进入webpack配置文件目录,再进入此目录的上一级目录的dll目录,如果不存在dll目录,则创建一个dll目录
const DLL_DIR = path.resolve(__dirname, "../dll");
//相当于cd __dirname之后,cd ../scripts
//先进入webpack配置文件目录,再进入此目录的上一级目录的scripts目录,如果不存在scripts目录,则创建一个scripts目录
const APP_DIR = path.resolve(__dirname, "../scripts");
//相当于cd __dirname之后,cd ../build
//先进入webpack配置文件目录,再进入此目录的上一级目录的build目录,如果不存在build目录,则创建一个build目录
const BUILD_DIR = path.resolve(__dirname, "../build");
//相当于cd __dirname之后,cd ..
//先进入webpack配置文件目录,再进入此目录的上一级目录
const ROOT_DIR = path.resolve(__dirname, "..");

//webpack整个keryi_barter web开发环境配置
const keryi_dev_config = {
    //webpack七大打包处理方式,每个module里面的模块会被eval包裹,并会在末尾添加注释
    devtool: "eval",
    //整个keryi_barter web开发环境配置入口(login.html和index.html所对应的login.js和index.js)
    entry: {
        login: APP_DIR + "/login.js",
        index: APP_DIR + "./index.js"
    },
    //整个keryi_barter web开发环境配置出口(包括根路径、出口文件输出路径和输出文件名)
    output: {
        //根路径
        localePath: "/",
        //出口文件输出路径
        path: BUILD_DIR,
        //输出文件名
        filename: "[name].bundle.js"
    },
    //整个keryi_barter web开发环境配置的模块加载工具(包括js模块加载工具、css模块加载工具和图片模块加载工具)
    module: {
        loaders: [
            {
                //利用正则表达式匹配后缀名为.js或者.jsx的文件
                test: /\.js[x]?$/,
                //之后利用react-hot-loader和babel-loader模块加载工具进行处理
                loaders: ["react-hot", "babel"]
            },
            {
                //利用正则表达式匹配后缀名为.css的文件
                test: /\.css$/,
                //之后利用style-loader、css-loader和postcss-loader模块加载工具进行处理,
                //打包顺序为:将css先通过style-loader模块加载工具集成为<style>...</style>,接着通过css-loader模块加载工具转化为.js文件存储,最后通过postcss模块加载工具将扩展头兼容浏览器的部分添加上
                //解析顺序则和打包顺序完全相反:从右至左postcss-loader -> css-loader -> style-loader
                loaders: ["style", "css", "postcss"]
            },
            {
                //利用正则表达式匹配后缀名为.jpg,.jpeg,.png,.gif和.bmp的文件
                test: /\.(jpg)|(jpeg)|(png)|(gif)|(bmp)$/,
                //之后利用url-loader模块加载工具进行处理,限制文件大小为10000bite
                loader: "url?limit=10000"
            }
        ]
    },
    resolve: {
        jquery: "jQuery"
    },
    //插件(包括错误处理插件,利用DllPlugin形成的集成外部依赖包Api来按需打包的插件,压缩处理插件和对html以及其对应的按需加载文件打包管理的插件)
    plugins: [
        //错误处理插件,在打包出现错误时,会继续完成打包,防止在打包过程中,出现错误而阻断打包损毁源文件
        new webpack.NoErrorsPlugin(),
        //利用DllPlugin形成的集成外部依赖包Api来按需打包插件
        new webpack.DllReferencePlugin({
            //按需打包的外部依赖包Api--manifest.dll.json所对应的目录路径
            manifest: path.resolve(__dirname, DLL_DIR + "/vendor_manifest.dll.json"),
            //上下文对象,与DllPlugin里面的context属性相对应
            context: ROOT_DIR
        }),
        //压缩处理插件
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                //无用的代码,会被压缩
                unused: true,
                //伪代码或者注释,会被压缩
                dead_code: true,
                //错误或者异常的代码,不会被压缩
                warnings: false
            },
            comments: false
        }),
        //对login.html以及其对应的按需加载文件login.js打包管理的插件
        new htmlWebpackPlugin({
            //根路径
            localePath: "/",
            //login.html文件名
            filename: "login.html",
            //按需加载的文件login.js作用于的模板
            template: ROOT_DIR + "/login.html",
            //按需加载的文件login.js
            chunks: ['login']
        }),
        //对index.html以及其对应的按需加载文件index.js打包管理的插件
        new htmlWebpackPlugin({
            //根路径
            localePath: "/",
            //index.html文件名
            filename: "index.html",
            //按需加载的文件index.js作用于的模板
            template: ROOT_DIR + "/index.html",
            //按需加载的文件index.js
            chunks: ['index']
        })
    ]
};