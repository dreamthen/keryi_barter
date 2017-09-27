/**
 * Created by yinwk on 2017/6/15.
 */
//login页面action类型
const loginActionsType = {
    //将login页面副级容器距离页面最上方的长度设置为100% Action名称
    DESCRIPTION_TO_LOGIN: "DESCRIPTION_TO_LOGIN",
    //将login登录模块的内容距离屏幕最左边设置为-100%;login注册模块的内容距离屏幕最左边设置为0 Action名称
    LOGIN_CHANGE_REGISTER: "LOGIN_CHANGE_REGISTER",
    //控制login页面请求加载Loading模块显示
    OPEN_LOADING: "OPEN_LOADING",
    //控制login页面请求加载Loading模块消失
    CLOSE_LOADING: "CLOSE_LOADING"
};

//导出login页面action类型
export default loginActionsType;