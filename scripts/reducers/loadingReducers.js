/**
 * author yinwk
 * createTime 2017/9/26 19:16
 * description clown laugh at you~
 */
import loginActionsType from "../actions/loginActionsType";
import insteadState from "../configs/insteadState";

const defaultState = {
    //请求加载Loading模块是否显示标识位
    loadingVisible: false
};

/**
 * 导出loading模块的reducer结构
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