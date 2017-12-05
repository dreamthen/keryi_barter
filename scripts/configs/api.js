/**
 * Created by yinwk on 2017/6/10.
 */

//请求后台接口,统一root路径
const keryi_cover = "/keryiBarter/";
//是否使用mock方式,true为使用mock数据模式,false为使用调用服务器接口模式
const isMock = false;
//接口API对象
let api = {};

if (!isMock) {
    api = {
        //登录
        KERYI_LOGIN: keryi_cover + "sessions",
        //注册
        KERYI_REGISTER: keryi_cover + "sessions",
        //用户退出
        KERYI_LOGOUT: keryi_cover + "sessions",
        //获取资源列表
        GET_RESOURCE_LIST: keryi_cover + "resources",
        //获取资源详情
        GET_RESOURCE_LIST_VIEW_DETAIL: keryi_cover + "resources",
        //上传资源图片
        UPLOAD_RESOURCE_IMAGE: keryi_cover + "resources/images",
        //获取资源图片
        GET_RESOURCE_IMAGE: keryi_cover + "resources/images",
        //搜索资源tag
        GET_RESOURCE_TAG_LIST: keryi_cover + "tags",
        //提交发布资源
        PUBLISH_RESOURCE: keryi_cover + "resources",
        //获取用户信息
        GET_PERSONAL_INFORMATION: keryi_cover + "users",
        //修改用户信息
        UPDATE_PERSONAL_INFORMATION: keryi_cover + "users",
        //修改用户头像
        UPDATE_PERSONAL_AVATAR: keryi_cover + "users",
        //获取用户头像
        GET_PERSONAL_AVATAR: keryi_cover + "users",
        //更新喜欢数
        UPDATE_LIKE_COUNT: keryi_cover + "resources",
        //发起交换
        HAVE_EXCHANGE: keryi_cover + "exchanges",
        //获取用户的资源交换列表
        GET_EXCHANGE_LIST: keryi_cover + "exchanges",
        //删除用户的资源交换列表
        DELETE_EXCHANGE_LIST: keryi_cover + "exchanges",
        //更换用户的资源交换列表交换关系状态
        CHANGE_EXCHANGE_LIST_STATUS: keryi_cover + "exchanges"
    }
} else {

}

//导出接口API对象
export default api;