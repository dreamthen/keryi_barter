/**
 * Created by yinwk on 2017/6/15.
 */
import loginActionsType from "../actions/loginActionsType";
import insteadState from "../configs/insteadState";

const defaultState = {
    //login页面副级容器距离页面最上方的长度
    top: 0,
    //login页面副级容器距离页面最左方的长度
    left: 0,
    //login页面副级容器登录模块距离页面最上方的长度
    loginTop: 0,
    //login页面副级容器登录模块距离页面最左方的长度
    loginLeft: 0,
    //login页面副级容器注册模块距离页面最上方的长度
    registerTop: "-100%",
    //login页面副级容器注册模块距离页面最左方的长度
    registerLeft: "100%",
};

/**
 * login页面reducers集成导出函数
 * @param state
 * @param actions
 * @returns {*}
 */
export function loginReducers(state = defaultState, actions) {
    let type = actions.type,
        newState = actions.payload;
    switch (type) {
        case loginActionsType["DESCRIPTION_TO_LOGIN"]:
            return insteadState.insteadObjState(state, newState);
        case loginActionsType["LOGIN_CHANGE_REGISTER"]:
            return insteadState.insteadObjState(state, newState);
        default:
            return state;
    }
}