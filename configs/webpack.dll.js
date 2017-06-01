/**
 * Created by yinwk on 2017/5/10.
 */
//导入webpack--打包工具
const webpack = require("webpack");
//导入path--路径处理工具
const path = require("path");
//路径巡航
//相当于cd __dirname之后,cd ../dll
//先进入webpack配置文件目录,再进入此目录的上一级目录的dll目录,如果不存在dll目录,则创建一个dll目录
const DLL_DIR = path.resolve(__dirname, "../dll");
//根目录,先进入webpack配置文件目录,再进入此目录的上二级目录
const ROOT_DIR = path.resolve(__dirname, "../..");

//webpack配置
const keryi_dll_config = {
    //webpack打包管理外部依赖包配置入口文件
    entry: {
        vendor: ["react", "react-dom", "react-router", "redux", "react-redux", "babel-polyfill", "whatwg-fetch"]
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
        new webpack.NoErrorsPlugin(),
        //集成外部依赖包manifest.dll.json文件插件
        new webpack.DllPlugin({
            //集成外部依赖包manifest.dll.json文件输出路径
            path: path.join(DLL_DIR, "[name]_manifest.dll.json"),
            //集成外部依赖包对象,与output里面的library属性相对应
            name: "[name]_[chunkhash]",
            //上下文对象,与DllReferencePlugin里面的context属性相对应
            context: ROOT_DIR
        }),
        //按需打包外部依赖包插件,会给每一个外部依赖包分配一个id,根据id长度来打包,id越长说明经常被打包,则先被打包,id越短说明不经常被打包,则后被打包
        new webpack.optimize.OccurrenceOrderPlugin(),
        //压缩处理插件
        new webpack.optimize.UglifyJsPlugin({
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
        //删除内容相同或者相似的文件
        new webpack.optimize.DedupePlugin()
    ]
};

//导出webpack打包集成外部依赖包配置
module.exports = keryi_dll_config;
