/**
 * Created by yinwk on 2017/7/11.
 */
//导入app页面action类型
import appActionsType from "../actions/appActionsType";
import insteadState from "../configs/insteadState";

const defaultState = {
    //获取资源数据列表
    list: [],
    //资源数据列表页码
    current: 1
};

/**
 * 导出barterView页面的reducer结构
 * @param state
 * @param actions
 * @returns {*}
 */
export function barterReducers(state = defaultState, actions) {
    let type = actions.type,
        newState = actions.payload;
    switch (type) {
        case appActionsType["GET_RESOURCE_LIST"]:
            return insteadState.insteadObjState(state, newState);
    }
    return state;
}