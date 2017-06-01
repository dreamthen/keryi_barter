/**
 * Created by yinwk on 2017/5/28.
 */
//导入webpack-打包管理工具
const webpack = require("webpack");
//导入path-路径处理工具
const path = require("path");
//导入autoprefixer--添加css扩展头以兼容浏览器的工具
const autoprefixer = require("autoprefixer");
//导入HtmlWebpackPlugin--对html文件以及其相对应的按需加载文件进行打包
const HtmlWebpackPlugin = require("html-webpack-plugin");

//路径巡航
//相当于cd __dirname之后,cd ..
//首先进入webpack配置文件所在的目录,然后再从此目录返回上一级目录
const ROOT_DIR = path.resolve(__dirname, "..");
//相当于cd __dirname之后,cd ../build
//首先进入webpack配置文件所在的目录,然后再从此目录返回上一级目录,最后进入build目录,如果不存在build目录则创建一级build目录
const BUILD_DIR = path.resolve(__dirname, "../build");
//相当于cd __dirname之后,cd ../dll
//首先进入webpack配置文件所在的目录,然后再从此目录返回上一级目录,最后进入dll目录,如果不存在dll目录则创建一级dll目录
const DLL_DIR = path.resolve(__dirname, "../dll");
//相当于cd __dirname之后,cd ../scripts
//首先进入webpack配置文件所在的目录,然后再从此目录返回上一级目录,最后进入scripts目录,如果不存在scripts目录则创建一级scripts目录
const APP_DIR = path.resolve(__dirname, "../scripts");
//集成的外部依赖包vendor_manifest.dll.json文件位置目录,并导入集成的外部依赖包
const MANIFEST = require(path.resolve(__dirname, DLL_DIR + "/vendor_manifest.dll.json"));
//相当于cd __dirname之后,cd ../scripts/stylesheets
//首先进入webpack配置文件所在的目录,然后再从此目录返回上一级目录,最后进入scripts目录下的stylesheets目录,如果不存在stylesheets目录则创建一级stylesheets目录
const STYLE_DIR = path.resolve(__dirname, "../stylesheets/index.js");

//webpack-dev-server代理服务器在本地运行端口设置
const PORT = "9070";

//autoprefixer添加css扩展头以兼容浏览器的浏览器版本
const AUTO_PREFIXER_BROWSERS = [
    "Android >= 4",
    "iOS >= 7",
    "Chrome >= 35",
    "Firefox >= 31",
    "Explorer >= 9",
    "Opera >= 12",
    "Safari >= 7.1"
];

//webpack web开发环境打包管理配置
const keryi_dev_config = {
    //webpack七种打包管理方式之一:eval
    //每一个module下的模块都会被eval包裹,并在eval包裹后添加注释
    devtool: "eval",
    //webpack web开发环境打包管理配置入口
    //这里有两个入口,分别对应两个html文件--login.html和index.html
    entry: {
        login: APP_DIR + "/login.js",
        index: APP_DIR + "/index.js"
    },
    //webpack web开发环境打包管理配置出口
    //包括根路径,文件输出路径和文件名
    output: {
        //根路径
        publicPath: "/",
        //文件输出路径
        path: BUILD_DIR,
        //文件名
        filename: "[name].bundle.js"
    },
    //webpack web开发环境打包管理配置--模块配置
    module: {
        //模块加载工具
        loaders: [
            //利用react-hot-loader和babel-loader,将集成的外部依赖包Api js文件,业务逻辑react,es2015 js文件,css文件进行热加载打包管理
            {
                //利用正则表达式来匹配所有后缀名为.js或者.jsx的文件
                test: /\.js[x]?$/,
                //要进行热加载打包管理的包含路径
                include: [
                    //业务逻辑react,es2015 js文件所在的路径
                    APP_DIR,
                    //集成的外部依赖包Api js文件所在的路径
                    DLL_DIR,
                    //每一个组件样式css文件所在的路径
                    STYLE_DIR
                ],
                //热加载模块加载工具,以及babel解析react,stage-0和es2015的模块加载工具
                loaders: ["react-hot", "babel"]
            },
            {
                //利用正则表达式匹配所有后缀名为.css的文件
                test: /\.css$/,
                //打包顺序为:"style-loader" -> "css-loader" -> "postcss-loader"
                //首先利用style-loader模块加载工具将所有的css集成在<style>...</style>标签中
                //随后利用css-loader模块加载工具将所有在<style>...</style>标签中的css打包管理到.js文件中
                //最后利用postcss-loader模块加载工具将兼容浏览器的css扩展头部添加上
                //解析顺序为:"postcss-loaer" -> "css-loader" -> "style-loader",与打包顺序相反
                loaders: ["style", "css", "postcss"]
            },
            {
                //利用正则表达式匹配所有后缀名为.jpg,.jpeg,.png,.gif和.bmp的文件
                test: /\.(jpg|jpeg|png|gif|bmp)$/,
                //利用url-loader模块加载工具对图片进行打包管理,限制大小为10000byte
                //如果图片大小小于10000byte,就不会独立打包形成.js文件,而是以data:base64的形式存在
                //如果图片大小超过10000byte,就会独立打包形成.js文件
                loader: "url-loader?limit=10000"
            }
        ]
    },
    //利用autoprefixer打包,再利用postcss-loader模块加载工具添加css扩展头以兼容浏览器
    postcss: [autoprefixer({
        browsers: AUTO_PREFIXER_BROWSERS
    })],
    //文件后缀添加的目录为:根目录
    resolve: {
        root: ROOT_DIR
    },
    //标明不需要webpack进行打包管理的外部依赖包--jQuery
    externals: {
        jquery: "jQuery"
    },
    //webpack web开发环境打包管理配置--插件配置
    plugins: [
        //错误处理配置,打包过程中出现错误时,会跳过它,完成打包,避免打包时出现错误,阻断打包流程,损毁源文件
        new webpack.NoErrorsPlugin(),
        //读取集成的外部依赖包vendor_manifest.dll.json文件并现成web开发环境外部依赖包Api插件
        new webpack.DllReferencePlugin({
            //读取集成的外部依赖包vendor_manifest.dll.json文件位置目录,并导入形成web开发环境外部依赖包Api
            manifest: MANIFEST,
            //上下文对象,与DllPlugin中的context属性相对应
            context: ROOT_DIR
        }),
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
        //对login.html文件进行打包管理配置插件,与按需加载的login.js文件相对应
        new HtmlWebpackPlugin({
            //根路径
            publicPath: "/",
            //进行打包管理的文件名
            filename: "login.html",
            //要进行打包管理的login.html文件所执行的模板位置目录
            template: ROOT_DIR + "/login.html",
            //与login.html相对应的按需加载的login.js模块
            chunks: ["login"]
        }),
        //对index.html文件进行打包管理配置插件,与按需加载的index.js文件相对应
        new HtmlWebpackPlugin({
            //根路径
            publicPath: "/",
            //进行打包管理的文件名
            filename: "index.html",
            //要进行打包管理的index.html文件所执行的模板位置目录
            template: ROOT_DIR + "/index.html",
            //与index.html相对应的按需加载的index.js模块
            chunks: ["index"]
        })
    ],
    //webpack-dev-server代理服务器配置
    devServer: {
        //本地运行web开发环境IP地址
        host: "0.0.0.0",
        //本地运行web开发环境端口
        port: PORT,
        //跨域代理服务器配置
        proxy: {
            "/keryi_barter/": {
                //跨域代理服务器连接IP地址和端口号
                target: "http://",
                secure: false,
                //利用模拟路径/keryi_barter/进行跨域连接,跨域连接完成之后,重写路径将模拟路径/keryi_barter/处理掉
                pathRewrite: {"/keryi_barter/": ""}
            }
        }
    }
};

module.exports = keryi_dev_config;