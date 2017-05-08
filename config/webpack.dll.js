/**
 * Created by yinwk on 2017/5/8.
 */
const path = require("path");
const webpack = require("webpack");
//配置dll文件的路径
//路径巡航
//相当于:cd __dirname
//接着:  cd ../dll
const DLL_DIR = path.resolve(__dirname, "../dll");
//配置根目录的路径
const ROOT_DIR = path.resolve(__dirname, "../..");

const keryi_dll_config = {
    //配置入口文件
    entry: {
        vendor: ["react", "react-dom", "react-router", "babel-polyfill"]
    },
    //配置输出文件格式(文件输出路径、文件名字)
    output: {
        publicPath: "/",
        path: DLL_DIR,
        filename: "[name].dll.js",
        library:"[name]_[chunkhash]"
    },
    plugins: [
        //这个插件可以直接跳过错误,完成打包,防止在打包过程中出现错误,造成源文件损坏
        new webpack.NoErrorsPlugin(),
        //Dll插件,为了避免重复打包外部依赖,如react,react-router等外部依赖,Dll插件会形成一个manifest.dll.json的打包文件api,可以加快打包速度
        new webpack.DllPlugin({
            //输出外部依赖包、生成manifest.dll.json文件的路径
            path: path.join(DLL_DIR, "[name]_manifest.dll.json"),
            //生成的dll对象名字,与library相对应
            name: "[name]_[chunkhash]",
            //上下文对象,一般为根目录
            context: ROOT_DIR
        }),
        //每一次打包都会给每个外部依赖的依赖包分配一个id,id越短的说明越不经常使用,越会靠后打包,可以实现按需加载
        new webpack.optimize.OccurrenceOrderPlugin(),
        //压缩代码插件
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                //没有用的代码进行压缩
                unused: true,
                //死代码,比如死循环的代码也进行压缩
                dead_code: true,
                //报错或者警告的代码不进行压缩
                warnings: false
            },
            comments: false
        }),
        //此插件会在打包外部依赖包的时候,删除重复的或者内容相似的插件
        new webpack.optimize.DedupePlugin()
    ]
};

module.exports = keryi_dll_config;