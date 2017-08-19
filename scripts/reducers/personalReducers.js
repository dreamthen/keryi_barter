/**
 * author yinwk
 * createTime 2017/8/16 17:56
 * description clown laugh at you~
 */
import appActionsType from "../actions/appActionsType";
import insteadState from "../configs/insteadState";

const defaultState = {
    //判断个人信息是否可编辑
    personalInformationDisabled: false
};

/**
 * 导出personalView页面的reducer结构
 * @param state
 * @param actions
 * @returns {*}
 */
export function personalReducers(state = defaultState, actions) {
    let type = actions.type,
        newState = actions.payload;
    switch (type) {
        //改变个人信息编辑状态,使得其可编辑
        case appActionsType["CHANGE_PERSONAL_INFORMATION"]:
            return insteadState.insteadObjState(state, {
                personalInformationDisabled: true
            });
        //改变个人信息编辑状态,使得其不可编辑
        case appActionsType["CLOSE_CHANGE_PERSONAL_INFORMATION"]:
            return insteadState.insteadObjState(state, {
                personalInformationDisabled: false
            });
    }
    return state;
}