/**
 * Created by yinwk on 2017/10/24.
 */
//导入webpack-打包管理工具
const webpack = require("webpack");
//导入fs-文件处理工具
const fs = require("fs-extra");
//导入path-路径处理工具
const path = require("path");
//导入ExtractTextWebpackPlugin--对css等文件进行提取
const ExtractTextPlugin = require("extract-text-webpack-plugin");
//导入HtmlWebpackPlugin--对html文件以及其相对应的按需加载文件进行打包
const HtmlWebpackPlugin = require("html-webpack-plugin");

//路径巡航
//相当于cd __dirname之后,cd ..
//首先进入webpack配置文件所在的目录,然后再从此目录返回上一级目录
const ROOT_DIR = path.resolve(__dirname, "..");
//相当于cd __dirname之后,cd ../dll
//首先进入webpack配置文件所在的目录,然后再从此目录返回上一级目录,最后进入dll目录,如果不存在dll目录则创建一级dll目录
const DLL_DIR = path.resolve(__dirname, "../dll");
//相当于cd __dirname之后,cd ../scripts
//首先进入webpack配置文件所在的目录,然后再从此目录返回上一级目录,最后进入scripts目录,如果不存在scripts目录则创建一级scripts目录
const APP_DIR = path.resolve(__dirname, "../scripts");
//相当于cd __dirname之后,cd ../build
//首先进入webpack配置文件所在的目录,然后再从此目录返回上一级目录,最后进入build目录,如果不存在build目录则创建一级build目录
const BUILD_DIR = path.resolve(__dirname, "../build");
//相当于cd __dirname之后,cd ../stylesheets
//首先进入webpack配置文件所在的目录,然后再从此目录返回上一级目录,最后进入stylesheets目录,如果不存在stylesheets目录则创建一级stylesheets目录
const STYLESHEET_DIR = path.resolve(__dirname, "../stylesheets");
//相当于cd __dirname之后,cd ../images
//首先进入webpack配置文件所在的目录,然后再从此目录返回上一级目录,最后进入images目录,如果不存在images目录则创建一级images目录
const IMAGE_DIR = path.resolve(__dirname, "../images");
//集成的外部依赖包vendor_manifest.dll.json文件位置目录,并导入集成的外部依赖包
const MANIFEST_DIR = require(path.resolve(__dirname, DLL_DIR + "/vendor_manifest.dll.json"));

//fs文件处理工具将dll目录下的内容复制到build目录下的dll目录
fs.copySync(DLL_DIR, BUILD_DIR + "/dll", {
    dereference: true
});

//fs文件处理工具将stylesheets目录下的内容复制到build目录下的css目录
fs.copySync(STYLESHEET_DIR, BUILD_DIR + "/css", {
    dereference: true
});

//fs文件处理工具将images目录下的内容复制到build目录下的images目录
fs.copySync(IMAGE_DIR, BUILD_DIR + "/images", {
    dereference: true
});

//webpack web生产环境打包管理配置
const keryi_prod_config = {
    //webpack七种打包管理方式之一:source-map
    //每一个module入口文件会以map.js的形式进行打包
    devtool: "source-map",
    //webpack web生产环境打包管理配置入口
    //这里有两个入口,分别对应两个html文件--login.html和index.html
    entry: {
        login: APP_DIR + "/login.js",
        index: APP_DIR + "/index.js"
    },
    //webpack web生产环境打包管理配置出口
    //包括根路径,文件输出路径和文件名
    output: {
        publicPath: "/",
        path: BUILD_DIR,
        filename: "js/[name].[chunkhash].js"
    },
    //标明不需要webpack进行打包管理的外部依赖包--jQuery
    externals: {
        jquery: "jQuery"
    },
    //文件后缀添加的目录为:JS主目录和node_modules外部依赖包
    resolve: {
        modules: [
            "node_modules",
            APP_DIR
        ]
    },
    //webpack web生产环境打包管理配置--模块配置
    module: {
        //模块加载工具
        rules: [
            //利用babel-loader,将集成的外部依赖包Api js文件,业务逻辑react,es2015 js文件,css文件进行打包管理
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
                    STYLESHEET_DIR
                ],
                //babel解析react,stage-0和es2015的模块加载工具
                use: ["babel-loader"]
            },
            {
                //利用正则表达式匹配所有后缀名为.css的文件
                test: /\.css$/,
                //利用ExtractTextWebpackPlugin插件处理css等文件插件进行提取
                //打包顺序为:"style-loader" -> "css-loader" -> "postcss-loader"
                //首先利用style-loader模块加载工具将所有的css集成在<style>...</style>标签中
                //随后利用css-loader模块加载工具将所有在<style>...</style>标签中的css打包管理到.js文件中
                //最后利用postcss-loader模块加载工具将兼容浏览器的css扩展头部添加上
                //解析顺序为:"postcss-loaer" -> "css-loader" -> "style-loader",与打包顺序相反
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [{
                        loader: "css-loader", options: {importLoaders: 1}
                    }, {
                        loader: "postcss-loader"
                    }],
                    publicPath: STYLESHEET_DIR
                })
            },
            {
                //利用正则表达式匹配所有后缀名为.less的文件
                test: /\.less$/,
                //利用ExtractTextWebpackPlugin插件处理css等文件插件进行提取
                //打包顺序为:"style-loader" -> "css-loader" -> "postcss-loader" -> "less-loader"
                //首先利用style-loader模块加载工具将所有的css集成在<style>...</style>标签中
                //随后利用css-loader模块加载工具将所有在<style>...</style>标签中的css打包管理到.js文件中
                //接着利用postcss-loader模块加载工具将兼容浏览器的css扩展头部添加上
                //最后利用less-loader模块加载工具将处理less语法结构
                //解析顺序为:"less-loader" - > "postcss-loaer" -> "css-loader" -> "style-loader",与打包顺序相反
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [{
                        loader: "css-loader", options: {importLoaders: 1}
                    }, {
                        loader: "postcss-loader"
                    }, {
                        loader: "less-loader"
                    }],
                    publicPath: STYLESHEET_DIR
                })
            },
            {
                //利用正则表达式匹配所有后缀名为.jpg,.jpeg,.png,.gif和.bmp的文件
                test: /\.(jpg|jpeg|png|bmp|gif)$/,
                //利用url-loader模块加载工具对图片进行打包管理,限制大小为10000byte
                //如果图片大小小于10000byte,就不会独立打包形成.后缀名文件,而是以data:base64的形式存在
                //如果图片大小超过10000byte,就会独立打包形成.后缀名文件
                //利用image-webpack-loader模块图片压缩工具对大图片进行压缩,转化为base64文件
                //如果图片大小小于10000byte,就不会独立打包形成.后缀名文件,而是以data:base64的形式存在
                //如果图片大小超过10000byte,就会独立打包形成.后缀名文件
                use: [{
                    loader: "url-loader", options: {limit: 10000, name: "css/[name].[hash:8].[ext]"}
                }, {
                    loader: "image-webpack-loader"
                }]
            }
        ]
    },
    //webpack web生产环境打包管理配置--插件配置
    plugins: [
        //错误处理配置,打包过程中出现错误时,会跳过它,完成打包,避免打包时出现错误,阻断打包流程,损毁源文件
        new webpack.NoEmitOnErrorsPlugin(),
        //读取集成的外部依赖包vendor_manifest.dll.json文件并现成web生产环境外部依赖包Api插件
        new webpack.DllReferencePlugin({
            manifest: MANIFEST_DIR,
            context: ROOT_DIR
        }),
        //添加"开发环境"或者"生产环境"魔法变量
        new webpack.EnvironmentPlugin({
            NODE_ENV: "production"
        }),
        //添加一个功能标识,来区分"开发环境"或者"生产环境"该添加或者删除的代码
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
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
        //利用ExtractTextWebpackPlugin插件处理css等文件插件进行提取
        new ExtractTextPlugin("css/[name].[chunkhash].css"),
        //对login.html文件进行打包管理配置插件,与按需加载的login.js文件相对应
        new HtmlWebpackPlugin({
            //根路径
            publicPath: "/",
            //进行打包管理的文件名
            filename: "login.html",
            //要进行打包管理的login.html文件所执行的模板位置目录
            template: ROOT_DIR + "/login.html",
            //与login.html相对应的按需加载的login.js模块
            chunks: ["login"],
            //对打包管理的login.html文件进行清除注释和删除换行空格
            minify: {
                removeComments: true,
                collapseWhiteSpace: true
            }
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
            chunks: ["index"],
            //对打包管理的index.html文件进行清除注释和删除换行空格
            minify: {
                removeComments: true,
                collapseWhiteSpace: true
            }
        })
    ]
};

module.exports = keryi_prod_config;
