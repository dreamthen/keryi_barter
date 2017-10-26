/**
 * author yinwk
 * createTime 2017/8/27 15:52
 * description clown laugh at you~
 */
//获取匹配到的资源数据列表出现异常时,前端呈现默认约定数据
const keryiModalDefaultConfig = [
    {
        title: "today",
        intro: "react react-redux react-router-redux",
        imgUrls: '[{src: "/images/keryiBarter_description_bg.png"},' +
        '{src: "/images/keryiBarter_login_bg.png"},' +
        '{src: "/images/keryiBarter_register_bg.png"},' +
        '{src: "/images/keryiBarter_login_bg.png"}]',
        priceWorth: 77,
        user: {
            username: "1000yardStyle",
            avatar: "/images/keryiBarter_login_bg.png"
        },
        tags: [{
            id: 1,
            tag: "react"
        }, {
            id: 2,
            tag: "react-redux"
        }, {
            id: 3,
            tag: "react-router-redux"
        }],
        targetTags: [{
            id: 1,
            tag: "react"
        }, {
            id: 2,
            tag: "redux-thunk"
        }, {
            id: 3,
            tag: "redux-logger"
        }],
        likeCount: 15
    }
];

//导出获取资源数据列表出现异常时,前端呈现默认约定数据配置
export default keryiModalDefaultConfig;