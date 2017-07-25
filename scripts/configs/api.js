/**
 * Created by yinwk on 2017/6/10.
 */

//使用添加假路径方式进行跨院
const keryi_cover = "/keryi_barter/";
//请求后台接口,统一root路径manager
const keryi_root = "manager/";
//是否使用mock方式,true为使用mock数据模式,false为使用调用服务器接口模式
const isMock = false;
//接口API对象
let api = {};

if (!isMock) {
    api = {
        //登录
        KERYI_LOGIN: keryi_cover + keryi_root + "sessions",
        //注册
        KERYI_REGISTER: keryi_cover + keryi_root + "sessions",
        //获取资源列表
        GET_RESOURCE_LIST: keryi_cover + keryi_root + "resources",
        //上传资源图片
        UPLOAD_RESOURCE_IMAGE: keryi_cover + keryi_root + "resources/images",
        //获取资源图片
        GET_RESOURCE_IMAGE: keryi_cover + keryi_root + "resources/images",
        //搜索资源tag
        GET_RESOURCE_TAG_LIST: keryi_cover + keryi_root + "tags"
    }
} else {

}

//导出接口API对象
export default api;