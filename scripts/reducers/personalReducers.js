/**
 * author yinwk
 * createTime 2017/8/16 17:56
 * description clown laugh at you~
 */
import appActionsType from "../actions/appActionsType";
import insteadState from "../configs/insteadState";

let userLoginInformation = localStorage && JSON.parse(localStorage.getItem("userLoginInformation"));

const defaultState = {
    //用户登录的id
    userId: userLoginInformation["id"],
    //用户登录的用户名
    username: userLoginInformation["username"],
    //用户登录的手机号
    phone: userLoginInformation["phone"],
    //用户登录的邮箱
    email: userLoginInformation["email"],
    //用户登录的头像
    avatar: userLoginInformation["avatar"],
    //判断个人信息是否可编辑
    personalInformationDisabled: false,
    //获取个人页资源数据列表
    list: [],
    //个人页资源数据列表页码
    current: 1
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
        //获取个人页资源列表
        case appActionsType["GET_PERSONAL_RESOURCE_LIST_ACTION"]:
            return insteadState.insteadObjState(state, {
                list: newState
            });
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