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
    //对话框选择目标资源类型
    targetSourceTag: "",
    //对话框资源估值
    priceWorth: "",
    //选择资源类型下拉框距离添加选择资源类型输入框左边的最初始位置
    initWillLeft: 0,
    //选择资源类型初始距离添加选择资源类型输入框左边的位置
    initLeft: 0,
    //选择资源类型下拉框距离添加选择资源类型输入框左边的位置
    left: 0,
    //选择目标资源类型下拉框距离添加选择资源类型输入框左边的位置
    targetLeft: 0,
    //资源描述输入框上传图片组
    imageList: [],
    //选择资源类型输入框模糊查询标签组
    pullList: [],
    //选择目标资源类型输入框模糊查询标签组
    pullListTarget: [],
    //选择资源类型输入框上方标签组
    tagList: [],
    //选择目标资源类型输入框上方标签组
    tagTargetList: [],
    //选择资源类型id标签组
    tagIdList: [],
    //选择目标资源类型id标签组
    tagTargetIdList: []
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
        //重置对话框状态
        case appActionsType["RESET_MODAL_STATUS"]:
            return defaultState;
        //设置选择资源类型下拉框距离添加选择资源类型输入框左边的最初始位置
        case appActionsType["CHANGE_WILL_MOUNT_INIT_DISTANCE"]:
            newState["left"] = newState["willInitLeft"];
            newState["targetLeft"] = newState["willInitLeft"];
            return insteadState.insteadObjState(state, newState);
        //设置选择资源类型下拉框距离添加选择资源类型输入框左边的位置
        case appActionsType["CHANGE_INIT_DISTANCE"]:
            return insteadState.insteadObjState(state, newState);
        case appActionsType["CHANGE_DISTANCE"]:
            newState["left"] = newState["rectLeft"];
            return insteadState.insteadObjState(state, newState);
        //设置选择目标资源类型下拉框距离添加选择目标资源类型输入框左边的位置
        case appActionsType["CHANGE_TARGET_DISTANCE"]:
            newState["targetLeft"] = newState["rectLeft"];
            return insteadState.insteadObjState(state, newState);
        //设置选择资源类型下拉框重置距离添加选择资源类型输入框左边的位置
        case appActionsType["RESET_DISTANCE"]:
            let resetNewState = {left: state["willInitLeft"]};
            return insteadState.insteadObjState(state, resetNewState);
        //设置选择目标资源类型下拉框重置距离添加选择目标资源类型输入框左边的位置
        case appActionsType["RESET_TARGET_DISTANCE"]:
            let resetNewTargetState = {targetLeft: state["willInitLeft"]};
            return insteadState.insteadObjState(state, resetNewTargetState);
        //改变资源描述输入框上传图片组
        case appActionsType["CHANGE_IMAGE_LIST"]:
            let imageType = newState["type"];
            switch (imageType) {
                case "add":
                    return insteadState.insteadArrayAddState(state, newState, "imageList", {src: newState["src"]});
                case "delete":
                    return insteadState.insteadArrayObjectRemoveState(state, newState, "imageList", function filter(item, index) {
                        return item["src"] !== newState["src"];
                    });
                default:
                    return state;
            }
        //改变选择资源类型输入框模糊搜索标签组
        case appActionsType["CHANGE_TAG_LIST"]:
            return insteadState.insteadObjState(state, newState);
        //改变选择资源类型输入框上方的标签组,添加或者删除Tag标签数组元素
        case appActionsType["SET_TAG_CONFIG"]:
            let tagType = newState["type"];
            switch (tagType) {
                case "add":
                    return insteadState.insteadArrayAddState(state, newState, "tagList", {
                        id: newState["id"],
                        tag: newState["tag"]
                    });
                case "delete":
                    return insteadState.insteadArrayObjectRemoveState(state, newState, "tagList", function filter(item, index) {
                        return item["id"] !== newState["id"];
                    });
                default:
                    return state;
            }
        //改变选择目标资源类型输入框上方的标签组,添加或者删除Tag标签数组元素
        case appActionsType["SET_TARGET_TAG_CONFIG"]:
            let targetTagType = newState["type"];
            switch (targetTagType) {
                case "add":
                    return insteadState.insteadArrayAddState(state, newState, "tagTargetList", {
                        id: newState["id"],
                        tag: newState["tag"]
                    });
                case "delete":
                    return insteadState.insteadArrayObjectRemoveState(state, newState, "tagTargetList", function filter(item, index) {
                        return item["id"] !== newState["id"];
                    });
                default:
                    return state;
            }
        //改变选择资源类型输入框上方的标签组,添加或者删除Tag标签数组元素
        case appActionsType["SET_TAG_ID_CONFIG"]:
            let tagIDType = newState["type"];
            switch (tagIDType) {
                case "add":
                    return insteadState.insteadArrayAddState(state, newState, "tagIdList", {
                        id: newState["id"]
                    });
                case "delete":
                    return insteadState.insteadArrayObjectRemoveState(state, newState, "tagIdList", function filter(item, index) {
                        return item["id"] !== newState["id"];
                    });
                default:
                    return state;
            }
        //改变选择目标资源类型输入框上方的标签组,添加或者删除Tag标签数组元素
        case appActionsType["SET_TARGET_TAG_ID_CONFIG"]:
            let targetTagIDType = newState["type"];
            switch (targetTagIDType) {
                case "add":
                    return insteadState.insteadArrayAddState(state, newState, "tagTargetIdList", {
                        id: newState["id"]
                    });
                case "delete":
                    return insteadState.insteadArrayObjectRemoveState(state, newState, "tagTargetIdList", function filter(item, index) {
                        return item["id"] !== newState["id"];
                    });
                default:
                    return state;
            }
        case appActionsType["ADD_BARTER_RESOURCE"]:
            return state;
    }
    return state;
}