/**
 * Created by yinwk on 2017/6/26.
 */
import appActionsType from "../actions/appActionsType";
import insteadState from "../configs/insteadState";

const defaultState = {
    //对话框标题
    title: "",
    //对话框描述
    description: "",
    //对话框选择资源类型
    sourceTag: "",
    //下拉框距离添加对话框上方的位置
    bottom: 0,
    //下拉框距离添加对话框左方的位置
    left: 20
};

export function appReducers(state = defaultState, actions) {
    let type = actions.type,
        newState = actions.payload;
    switch (type) {
        case appActionsType["ADD_BARTER_RESOURCE"]:
            return state;
    }
    return state;
}