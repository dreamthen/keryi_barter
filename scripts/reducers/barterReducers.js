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
    viewDetailImageList: "[]",
    //资源详情标题
    viewDetailTitle: "",
    //资源详情资源介绍
    viewDetailIntroduce: "",
    //资源详情被需要数目
    viewDetailNeedParty: 0,
    //资源详情资源估值
    viewDetailPriceWorth: 0,
    //资源详情喜欢数目
    viewDetailLike: 0,
    //资源详情资源标签
    viewDetailTagList: [],
    //资源详情目标资源标签
    viewDetailTargetTagList: []
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
            return insteadState.insteadObjState(state, {
                list: newState
            });
        //获取资源详情
        case appActionsType["GET_RESOURCE_LIST_VIEW_DETAIL"]:
            newState["viewDetailUserName"] = newState["user"]["username"];
            newState["viewDetailImageList"] = newState["imgUrls"];
            newState["viewDetailTitle"] = newState["title"];
            newState["viewDetailIntroduce"] = newState["intro"];
            newState["viewDetailPriceWorth"] = newState["priceWorth"];
            newState["viewDetailLike"] = newState["likeCount"];
            newState["viewDetailTagList"] = newState["tags"];
            newState["viewDetailTargetTagList"] = newState["targetTags"];
            return insteadState.insteadObjState(state, newState);
        //获取资源详情用户头像
        case appActionsType["GET_USER_HEAD_PORTRAIT_VIEW_DETAIL"]:
            return insteadState.insteadObjState(state, {
                viewDetailHeadPortrait: newState["user"]["avatar"]
            });
        //重置资源详情
        case appActionsType["RESET_RESOURCE_LIST_VIEW_DETAIL"]:
            return insteadState.insteadObjState(
                state, {
                    viewDetailHeadPortrait: "",
                    viewDetailUserName: "",
                    viewDetailImageList: "[]",
                    viewDetailTitle: "",
                    viewDetailIntroduce: "",
                    viewDetailNeedParty: 0,
                    viewDetailPriceWorth: 0,
                    viewDetailLike: 0,
                    viewDetailTagList: [],
                    viewDetailTargetTagList: []
                }
            );
        //重置资源数据列表和资源详情
        case appActionsType["RESET_RESOURCE_LIST_VIEW_LIST_DETAIL"]:
            return defaultState;
    }
    return state;
}