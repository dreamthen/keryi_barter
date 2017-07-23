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
    //选择资源类型初始距离添加对话框左边的位置
    initLeft: 0,
    //选择资源类型下拉框距离添加对话框左边的位置
    left: 0,
    //对话框上传图片组
    imageList: []
};

/**
 * 导出app页面的reducer结构
 * @param state
 * @param actions
 * @returns {*}
 */
export function appReducers(state = defaultState, actions) {
    let type = actions.type,
        newState = actions.payload;
    switch (type) {
        //设置选择资源类型下拉框距离添加对话框顶部和左边的位置
        //改变对话框上传图片组
        case appActionsType["CHANGE_INIT_DISTANCE"]:
            return insteadState.insteadObjState(state, newState);
        case appActionsType["CHANGE_DISTANCE"]:
            newState["left"] = newState["rectLeft"] - newState["initLeft"] + 20;
            return insteadState.insteadObjState(state, newState);
        case appActionsType["CHANGE_IMAGE_LIST"]:
            let imageType = newState.type;
            switch (imageType) {
                case "add":
                    let src = newState["src"];
                    return insteadState.insteadArrayAddState(state, newState, "imageList", src);
                case "delete":
                    return insteadState.insteadArrayRemoveState(state, newState, "imageList", function filter(item, index) {
                        return item["src"] !== newState["src"];
                    });
                default:
                    return state;
            }
        case appActionsType["ADD_BARTER_RESOURCE"]:
            return state;
    }
    return state;
}