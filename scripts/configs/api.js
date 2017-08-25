/**
 * Created by yinwk on 2017/6/10.
 */

//请求后台接口,统一root路径manager
const keryi_cover = "/manager/";
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
        //获取资源列表
        GET_RESOURCE_LIST: keryi_cover + "resources",
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
        //更新喜欢数
        UPDATE_LIKE_COUNT: keryi_cover + "resources"
    }
} else {

}

//导出接口API对象
export default api;