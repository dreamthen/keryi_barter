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
    //编辑框标题是否可编辑
    placeholderAbleTitle: true,
    //编辑框资源描述是否可编辑
    placeholderAbleDescription: true,
    //编辑框选择资源类型是否可编辑
    placeholderAbleSourceTag: true
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