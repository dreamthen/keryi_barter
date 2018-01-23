/**
 * Created by yinwk on 2017/7/11.
 */
//导入app页面action类型
import appActionsType from "../actions/appActionsType";
import insteadState from "../configs/insteadState";
import PropTypes from "prop-types";

//改变资源列表分页页码:分页+1
export const paginationPlus = "plus";
//改变资源列表分页页码:分页-1
export const paginationMinus = "minus";

const defaultState = {
    //获取资源数据列表
    list: [],
    //获取个人匹配资源列表
    matchedList: [],
    //资源数据列表页码
    current: 1,
    //个人匹配资源列表页码
    matchedCurrent: 1,
    //个人匹配资源列表资源条数
    matchedTotal:0,
    //资源数据列表下拉分页防并发变量
    currentAsync: true,
    //评论详情
    comment: "",
    //评论列表
    commentList: [],
    //评论列表页码
    commentCurrent: 1,
    //评论列表评论条数
    commentTotal: 0,
    //滚动条初始距离顶部高度
    beforeOsTop: 0,
    //资源ID
    viewDetailId: 0,
    //资源发起人ID
    viewDetailUserId: 0,
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
        //获取个人匹配资源列表
        case appActionsType["GET_PERSONAL_MATCHED_RESOURCE_LIST"]:
            return insteadState.insteadObjState(state, newState);
        //改变资源列表分页页码
        case appActionsType["GET_RESOURCE_LIST_BY_PAGINATION"]:
            return insteadState.insteadObjState(state, {
                list: [...state["list"], ...newState],
                currentAsync: true
            });
        //获取资源列表滚动条初始距离顶部高度
        case appActionsType["GET_RESOURCES_LIST_PAGINATION_BEFORE_OS_TOP"]:
            return insteadState.insteadObjState(state, {
                beforeOsTop: newState
            });
        //改变资源列表分页页码
        case appActionsType["CHANGE_RESOURCES_LIST_PAGINATION_CURRENT"]:
            return newState === paginationPlus ?
                insteadState.insteadObjState(state, {
                    current: state["current"] + 1,
                    currentAsync: false
                }) : insteadState.insteadObjState(state, {
                    current: state["current"] - 1,
                    currentAsync: true
                });
        //获取资源详情
        case appActionsType["GET_RESOURCE_LIST_VIEW_DETAIL"]:
            newState["viewDetailId"] = newState["id"];
            newState["viewDetailUserId"] = newState["userId"];
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
        //改变"评论"富文本编辑器编辑框内容
        case appActionsType["CHANGE_RESOURCES_LIST_VIEW_DETAILS_COMMENT"]:
            return insteadState.insteadObjState(state, {
                comment: newState
            });
        //获取资源详情评论列表
        case appActionsType["GET_RESOURCES_LIST_VIEW_DETAILS_COMMENT_LIST"]:
            return insteadState.insteadObjState(state, newState);
    }
    return state;
}