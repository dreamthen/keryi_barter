const autoprefixer = require("autoprefixer");

//autoprefixer添加css扩展头以兼容浏览器的浏览器版本
const AUTO_PREFIXER_BROWSERS = [
    "Android >= 4",
    "IOS >= 7",
    "Chrome >= 35",
    "Firefox >= 31",
    "Opera >= 12",
    "Safari >= 7.1"
];

module.exports = {
    //添加postcss.config.js插件,利用autoprefixer打包,再利用postcss-loader模块加载工具添加css扩展头以兼容浏览器
    plugins: [
        autoprefixer({browsers: AUTO_PREFIXER_BROWSERS})
    ]
};
