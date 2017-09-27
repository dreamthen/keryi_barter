/**
 * author yinwk
 * createTime 2017/9/26 19:16
 * description clown laugh at you~
 */
import loginActionsType from "../actions/loginActionsType";
import appActionsType from "../actions/appActionsType";
import insteadState from "../configs/insteadState";

const defaultState = {
    //login页面请求加载Loading模块是否显示标识位
    loadingVisible: false,
};

const defaultAppState = {
    //keryi_barter主页面请求加载Loading模块是否显示标识位
    loadingAppVisible: false
};

/**
 * 导出login页面loading模块的reducer结构
 * @param state
 * @param actions
 * @returns {*}
 */
export function loadingReducers(state = defaultState, actions) {
    let type = actions.type,
        newState = actions.payload;
    switch (type) {
        //控制login页面请求加载Loading模块显示
        case loginActionsType["OPEN_LOADING"]:
            return insteadState.insteadObjState(state, {
                loadingVisible: true
            });
        //控制login页面请求加载Loading模块消失
        case loginActionsType["CLOSE_LOADING"]:
            return insteadState.insteadObjState(state, {
                loadingVisible: false
            });
    }
    return state;
}

/**
 * 导出keryi_barter主页面loading模块的reducer结构
 * @param state
 * @param actions
 * @returns {*}
 */
export function loadingAppReducers(state = defaultAppState, actions) {
    let type = actions.type,
        newState = actions.payload;
    switch (type) {
        //keryi_barter主页面请求加载Loading模块显示
        case appActionsType["OPEN_APP_LOADING"]:
            return insteadState.insteadObjState(state, {
                loadingAppVisible: true
            });
        //keryi_barter主页面请求加载Loading模块消失
        case appActionsType["CLOSE_APP_LOADING"]:
            return insteadState.insteadObjState(state, {
                loadingAppVisible: false
            });
    }
    return state;
}