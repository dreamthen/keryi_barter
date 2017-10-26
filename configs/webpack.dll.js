/**
 * Created by yinwk on 2017/5/10.
 */
//导入webpack--打包工具
const webpack = require("webpack");
//导入path--路径处理工具
const path = require("path");
//导入autoprefixer--添加css扩展头以兼容浏览器的工具
const autoprefixer = require("autoprefixer");
//路径巡航
//相当于cd __dirname之后,cd ../dll
//先进入webpack配置文件目录,再进入此目录的上一级目录的dll目录,如果不存在dll目录,则创建一个dll目录
const DLL_DIR = path.resolve(__dirname, "../dll");
//根目录,先进入webpack配置文件目录,再进入此目录的上二级目录
const ROOT_DIR = path.resolve(__dirname, "../..");

//autoprefixer添加css扩展头以兼容浏览器的浏览器版本
const AUTO_PREFIXER_BROWSERS = [
    "Android >= 4",
    "IOS >= 7",
    "Chrome >= 35",
    "Firefox >= 31",
    "Explorer >= 9",
    "Opera >= 12",
    "Safari >= 7.1"
];

//webpack配置
const keryi_dll_config = {
    //webpack打包管理外部依赖包配置入口文件
    entry: {
        vendor: ["react", "react-dom", "react-router", "redux", "react-redux", "axios", "babel-polyfill", "antd"]
    },
    //webpack打包管理外部依赖包配置出口文件(包括根路径,文件输出路径,文件名和集成的外部依赖包对象--与DllPlugin里面的name属性相对应)
    output: {
        //根路径
        publicPath: "/",
        //文件输出路径
        path: DLL_DIR,
        //文件名
        filename: "[name].dll.js",
        //集成的外部依赖包对象,与DllPlugin里面的name属性相对应
        library: "[name]_[chunkhash]"
    },
    //插件(包括错误处理插件,集成外部依赖包manifest.dll.json插件,压缩处理插件,删除内容相同或相似文件插件和按需打包外部依赖包插件)
    plugins: [
        //错误处理插件,在打包出现错误时,会继续完成打包,防止在打包过程中,出现错误而阻断打包损毁源文件
        new webpack.NoEmitOnErrorsPlugin(),
        //集成外部依赖包manifest.dll.json文件插件
        new webpack.DllPlugin({
            //集成外部依赖包manifest.dll.json文件输出路径
            path: path.join(DLL_DIR, "[name]_manifest.dll.json"),
            //集成外部依赖包对象,与output里面的library属性相对应
            name: "[name]_[chunkhash]",
            //上下文对象,与DllReferencePlugin里面的context属性相对应
            context: ROOT_DIR
        }),
        //压缩处理插件
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                //无用的代码,会被压缩
                unused: true,
                //伪代码或者注释,会被压缩
                dead_code: true,
                //错误的或者异常的代码,不会被压缩
                warnings: false
            },
            comments: false
        }),
        //添加选项插件,利用autoprefixer打包,再利用postcss-loader模块加载工具添加css扩展头以兼容浏览器
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: [autoprefixer({browsers: AUTO_PREFIXER_BROWSERS})]
            }
        })
    ]
};

//导出webpack打包集成外部依赖包配置
module.exports = keryi_dll_config;
