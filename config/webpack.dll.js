/**
 * Created by yinwk on 2017/5/10.
 */
//引入webpack打包处理工具外部依赖包
let webpack = require("webpack");
//引入path处理路径工具外部依赖包
let path = require("path");
//路径巡航,resolve
//相当于cd __dirname,进入keryi_barter/config路径
//最后cd ../dir,进入keryi_barter/dll路径,如果不存在,会自动创建一个路径
let DLL_DIR = path.resolve(__dirname, "../dll");
let ROOT_DIR = path.resolve(__dirname, "../..");

const webpackDll = {
    //Dll集成管理外部依赖包入口配置
    entry: {
        vendor: ["react", "react-dom", "react-router", "whatwg-fetch", "babel-polyfill"]
    },
    //打包输出后,输出的目录路径、文件名、根目录路径和用于创建Dll集成管理外部依赖包的对象
    output: {
        localePath: "/",
        path: DLL_DIR,
        filename: "[name].dll.js",
        libraryName: "[name]_[chunkhash]"
    },
    //打包插件,包括错误处理插件、压缩插件、Dll集成外部管理依赖包插件、删除相同或者相似的文件插件
    plugins: [
        //错误处理插件,在打包过程中,为了防止出现错误,而停止打包,导致源文件损坏的插件
        new webpack.NoErrorsPlugin(),
        //Dll集成管理外部依赖包插件
        new webpack.DllPlugin({
            //生成的集成外部依赖包manifest.dll.json输出目录路径
            path: path.join(DLL_DIR, "[name]_manifest.dll.json"),
            //Dll集成管理外部依赖包对象,和output里面的libraryName相对应
            name: "[name]_[chunkhash]",
            //上下文对象
            context: ROOT_DIR
        }),
        //给每个打包的外部依赖包分配一个id,根据id的长短进行打包,id越长,说明越经常使用,越靠前被打包,id越短,说明越不常使用,越靠后打包
        new webpack.optimize.OccurrenceOrderPlugin(),
        //压缩插件
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                //没有用到的代码进行压缩
                unused: true,
                //注释代码或者伪代码进行压缩
                dead_code: true,
                //报出错误或者异常的代码不进行压缩
                warnings: false
            },
            comments: false
        }),
        //打包时,如果两个文件中含有相同或者相似的内容,会相应进行删除文件内容或者文件
        new webpack.optimize.DedupePlugin()
    ]
};

module.exports = webpackDll;