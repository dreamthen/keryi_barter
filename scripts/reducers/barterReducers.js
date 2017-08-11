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
    current: 1,
    //资源详情用户头像
    viewDetailHeadPortrait: "",
    //资源详情用户名
    viewDetailUserName: "",
    //资源详情上传图片数组
    viewDetailImageList: [],
    //资源详情标题
    viewDetailTitle: "",
    //资源详情资源介绍
    viewDetailIntroduce: "",
    //资源详情被需要数目
    viewDetailNeedParty: 0
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
        //获取资源列表
        case appActionsType["GET_RESOURCE_LIST"]:
            return insteadState.insteadObjState(state, newState);
        //获取资源详情
        case appActionsType["GET_RESOURCE_LIST_VIEW_DETAIL"]:
            newState["viewDetailUserName"] = "1000yardStyle";
            newState["viewDetailImageList"] = newState["imgUrls"];
            newState["viewDetailTitle"] = newState["title"];
            newState["viewDetailIntroduce"] = newState["intro"];
            newState["viewDetailNeedParty"] = newState["price_worth"];
            return insteadState.insteadObjState(state, newState);
        //获取资源详情用户头像
        case appActionsType["GET_USER_HEAD_PORTRAIT_VIEW_DETAIL"]:
            return insteadState.insteadObjState(state, {
                viewDetailHeadPortrait: newState
            });
    }
    return state;
}