/**
 * Created by yinwk on 2017/6/10.
 */

//使用添加假路径方式进行跨院
const keryi_cover = "/keryi_barter/";
//是否使用mock方式,true为使用mock数据模式,false为使用调用服务器接口模式
const isMock = false;
//接口API对象
let api = {};

if (!isMock) {
    api = {
        //登录
        KERYI_LOGIN: keryi_cover + "session/login",
        //注册
        KERYI_REGISTER: keryi_cover + "session/signup"
    }
} else {

}

//导出接口API对象
export default api;