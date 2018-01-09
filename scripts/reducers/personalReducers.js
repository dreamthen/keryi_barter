/**
 * author yinwk
 * createTime 2017/8/16 17:56
 * description clown laugh at you~
 */
import api from "../configs/api";
//app页面action类型
import appActionsType from "../actions/appActionsType";
//redux reducer更换state状态对象
import insteadState from "../configs/insteadState";
//对个人页资源详情资源交换图片(第一张)以及标题内容列表进行整理,获取到整理后的图片列表
import {getImageOrContentItemListConfig} from "../configs/getImageOrContentItemListConfig";
//用于处理多个用户请求头像
import {optimizeGetPersonalAvatar} from "../configs/optimizeGetPersonalAvatar";
import {
    //校验字段undefined和null,进行处理
    checkField
} from "../configs/checkField";

export const paginationPlus = "paginationPlus";
export const paginationMinus = "paginationMinus";

let userLoginInformation = localStorage && localStorage.getItem("userLoginInformation") !== "undefined" && JSON.parse(localStorage.getItem("userLoginInformation"));

const defaultState = {
    //用户登录的id
    userId: checkField(userLoginInformation, "id"),
    //确认进行资源交换的匹配资源的用户id
    matchedUserId: 0,
    //确认进行资源交换的匹配资源id
    matchedId: 0,
    //用户登录的用户名
    username: checkField(userLoginInformation, "username"),
    //用户登录的手机号
    phone: checkField(userLoginInformation, "phone"),
    //用户登录的邮箱
    email: checkField(userLoginInformation, "email"),
    //用户登录的头像
    avatar: checkField(userLoginInformation, "avatar"),
    //用户是否可以对自己的头像和背景进行编辑的标识位
    editAppearance: false,
    //用户登录的个性签名
    motto: checkField(userLoginInformation, "motto"),
    //判断个人信息是否可编辑
    personalInformationDisabled: false,
    //获取个人页资源数据列表
    list: [],
    //个人页资源详情资源交换列表页码
    itemCurrent: 1,
    //个人页资源详情资源交换列表是否可关闭标志位
    itemClose: false,
    //个人页资源详情匹配到的资源列表边栏是否显示
    asideAble: false,
    //个人页资源数据列表页码
    current: 1,
    //分页防并发变量
    currentAsync: true,
    //滚动条初始距离顶部高度
    beforeOsTop: 0,
    //评论详情
    comment: "",
    //匹配资源评论详情
    commentMatched: "",
    //评论列表
    commentList: [],
    //匹配资源评论列表
    commentMatchedList: [],
    //评论列表页码
    commentCurrent: 1,
    //匹配资源评论列表页码
    commentMatchedCurrent: 1,
    //评论列表评论条数
    commentTotal: 0,
    //匹配资源评论列表评论条数
    commentMatchedTotal: 0,
    //个人信息部分距离父级元素顶部的高度
    top: 0,
    //个人页资源详情对话框是否显示footer底部区域
    viewDetailFooter: false,
    //个人页资源详情对象
    viewDetailKeryiCard: {},
    //资源ID
    viewDetailId: 0,
    //个人页资源详情用户头像
    viewDetailHeadPortrait: "",
    //个人页资源详情用户名
    viewDetailUserName: "",
    //个人页资源详情上传图片数组
    viewDetailImageList: "[]",
    //个人页资源详情标题
    viewDetailTitle: "",
    //个人页资源详情资源介绍
    viewDetailIntroduce: "",
    //个人页资源详情被需要数目
    viewDetailNeedParty: 0,
    //个人页资源详情资源估值
    viewDetailPriceWorth: 0,
    //个人页资源详情喜欢数目
    viewDetailLike: 0,
    //个人页资源详情资源标签
    viewDetailTagList: [],
    //个人页资源详情目标资源标签
    viewDetailTargetTagList: [],
    //个人页资源详情匹配到的所有的资源列表
    viewDetailMatchedResources: [],
    //个人页资源详情资源交换上传图片(第一张)以及标题内容列表
    viewDetailItemImageOrContentList: [],
    //个人页资源详情资源交换列表是否显示描述浮层
    viewDetailItemHover: false,
    //个人页资源详情资源交换列表
    viewDetailItemExchange: {},
    //个人页资源详情匹配资源交换列表
    viewDetailMatchedItemExchange: {}
};

/**
 * 导出personalView页面的reducer结构
 * @param state
 * @param actions
 * @returns {*}
 */
export function personalReducers(state = defaultState, actions) {
    let type = actions.type,
        newState = actions.payload,
        matched = actions.matched,
        exchangeStatus = actions.exchangeStatus;
    switch (type) {
        //保存个人页资源详情
        case appActionsType["REMEMBER_PERSONAL_RESOURCE_LIST_VIEW_DETAIL"]:
            return insteadState.insteadObjState(state, {
                viewDetailKeryiCard: newState
            });
        //获取个人页资源详情用户头像
        case appActionsType["GET_PERSONAL_USER_HEAD_PORTRAIT_VIEW_DETAIL"]:
            return insteadState.insteadObjState(state, {
                viewDetailHeadPortrait: api.GET_PERSONAL_AVATAR + "/" + newState["user"]["id"] + "/avatar"
            });
        //获取个人页资源详情
        case appActionsType["GET_PERSONAL_RESOURCE_LIST_VIEW_DETAIL"]:
            //用于处理多个用户请求头像
            optimizeGetPersonalAvatar(newState["matchedResources"]);
            let viewDetail = {
                viewDetailId: newState["id"],
                viewDetailUserName: newState["user"]["username"],
                viewDetailImageList: newState["imgUrls"],
                viewDetailTitle: newState["title"],
                viewDetailIntroduce: newState["intro"],
                viewDetailPriceWorth: newState["priceWorth"],
                viewDetailLike: newState["likeCount"],
                viewDetailTagList: newState["tags"],
                viewDetailTargetTagList: newState["targetTags"],
                viewDetailMatchedResources: (newState["matchedResources"] && newState["matchedResources"].length > 0) && newState["matchedResources"]
            };
            return insteadState.insteadObjState(state, viewDetail);
        //获取个人页匹配列表资源详情
        case appActionsType["GET_PERSONAL_RESOURCE_MATCHED_LIST_VIEW_DETAIL"]:
            let matchedViewDetail = {
                viewDetailUserName: newState["user"]["username"],
                viewDetailImageList: newState["imgUrls"],
                viewDetailTitle: newState["title"],
                viewDetailIntroduce: newState["intro"],
                viewDetailPriceWorth: newState["priceWorth"],
                viewDetailLike: newState["likeCount"],
                viewDetailTagList: newState["tags"],
                viewDetailTargetTagList: newState["targetTags"],
                matchedUserId: newState["userId"],
                matchedId: newState["id"]
            };
            return insteadState.insteadObjState(state, matchedViewDetail);
        //保存个人页资源详情资源交换列表
        case appActionsType["REMEMBER_PERSONAL_RESOURCE_LIST_VIEW_DETAIL_ITEM_LIST"]:
            return insteadState.insteadObjState(state, {
                viewDetailItemExchange: newState
            });
        //保存个人页匹配列表资源交换列表
        case appActionsType["REMEMBER_PERSONAL_RESOURCE_LIST_VIEW_DETAIL_MATCHED_ITEM_LIST"]:
            return insteadState.insteadObjState(state, {
                viewDetailMatchedItemExchange: newState
            });
        //获取个人页资源详情资源交换列表
        case appActionsType["GET_PERSONAL_RESOURCE_LIST_VIEW_DETAIL_ITEM_LIST"]:
            let FirstImgOrContentUrlsList = getImageOrContentItemListConfig(newState["list"], matched, exchangeStatus);
            let viewDetailItemListConfig = {
                viewDetailItemImageOrContentList: FirstImgOrContentUrlsList
            };
            return insteadState.insteadObjState(state, viewDetailItemListConfig);
        //获取个人页资源列表
        case appActionsType["GET_PERSONAL_RESOURCE_LIST_ACTION"]:
            return insteadState.insteadObjState(state, {
                list: [...state["list"], ...newState],
                currentAsync: true
            });
        //改变个人信息编辑状态,使得其可编辑
        case appActionsType["CHANGE_PERSONAL_INFORMATION"]:
            return insteadState.insteadObjState(state, {
                personalInformationDisabled: true
            });
        //更新并保存个人信息
        case appActionsType["SAVE_CHANGE_PERSONAL_INFORMATION"]:
            return insteadState.insteadObjState(state, newState);
        //改变个人信息编辑状态,使得其不可编辑
        case appActionsType["CLOSE_CHANGE_PERSONAL_INFORMATION"]:
            return insteadState.insteadObjState(state, {
                personalInformationDisabled: false
            });
        //改变个人信息部分距离父级元素顶部的高度,使个人信息页面主体信息随着窗口滚动而滚动
        case appActionsType["CHANGE_PERSONAL_INFORMATION_SCROLL_TOP"]:
            return insteadState.insteadObjState(state, {
                top: newState
            });
        //显示个人页资源详情对话框footer底部区域
        case appActionsType["OPEN_PERSONAL_VIEW_DETAIL_FOOTER"]:
            return insteadState.insteadObjState(state, {
                viewDetailFooter: true
            });
        //隐藏个人页资源详情对话框footer底部区域
        case appActionsType["CLOSE_PERSONAL_VIEW_DETAIL_FOOTER"]:
            return insteadState.insteadObjState(state, {
                viewDetailFooter: false
            });
        //个人页资源详情资源交换列表显示可关闭标志位
        case appActionsType["OPEN_PERSONAL_VIEW_DETAIL_ITEM_CLOSE"]:
            return insteadState.insteadObjState(state, {
                itemClose: true
            });
        //个人页资源详情资源交换列表隐藏可关闭标志位
        case appActionsType["CLOSE_PERSONAL_VIEW_DETAIL_ITEM_CLOSE"]:
            return insteadState.insteadObjState(state, {
                itemClose: false
            });
        //个人页资源详情匹配到的资源列表边栏显示
        case appActionsType["OPEN_PERSONAL_VIEW_DETAIL_ASIDE"]:
            return insteadState.insteadObjState(state, {
                asideAble: true
            });
        //个人页资源详情匹配到的资源列表边栏隐藏
        case appActionsType["CLOSE_PERSONAL_VIEW_DETAIL_ASIDE"]:
            return insteadState.insteadObjState(state, {
                asideAble: false
            });
        //个人页资源详情资源交换列表显示描述浮层
        case appActionsType["OPEN_PERSONAL_VIEW_DETAIL_ITEM_HOVER"]:
            return insteadState.insteadObjState(state, {
                viewDetailItemHover: true
            });
        //个人页资源详情资源交换列表隐藏使描述浮层消失
        case appActionsType["CLOSE_PERSONAL_VIEW_DETAIL_ITEM_HOVER"]:
            return insteadState.insteadObjState(state, {
                viewDetailItemHover: false
            });
        //使客户的头像和背景不可编辑
        case appActionsType["CHANGE_PERSONAL_EDIT_APPEARANCE"]:
            return insteadState.insteadObjState(state, {
                editAppearance: true
            });
        //使客户的头像和背景可编辑
        case appActionsType["CLOSE_PERSONAL_EDIT_APPEARANCE"]:
            return insteadState.insteadObjState(state, {
                editAppearance: false
            });
        //重置个人页资源页面
        case appActionsType["RESET_PERSONAL_RESOURCE_LIST_VIEW_DETAIL"]:
            return defaultState;
        //重置个人页资源详情
        case appActionsType["RESET_PERSONAL_RESOURCE_LIST_VIEW_DETAIL_CONTENT"]:
            return insteadState.insteadObjState(state, {
                viewDetailKeryiCard: {},
                viewDetailHeadPortrait: "",
                viewDetailUserName: "",
                viewDetailImageList: "[]",
                viewDetailTitle: "",
                viewDetailIntroduce: "",
                viewDetailNeedParty: 0,
                viewDetailPriceWorth: 0,
                viewDetailLike: 0,
                viewDetailTagList: [],
                viewDetailTargetTagList: [],
                viewDetailMatchedResources: [],
                viewDetailItemImageOrContentList: [],
                viewDetailItemExchange: {}
            });
        //修改个人页头像成功
        case appActionsType["UPLOAD_PERSONAL_AVATAR_ACTION"]:
            return insteadState.insteadObjState(state, {
                avatar: newState
            });
        //改变"评论"富文本编辑器编辑框内容
        case appActionsType["CHANGE_PERSONAL_RESOURCES_LIST_VIEW_DETAILS_COMMENT"]:
            return insteadState.insteadObjState(state, {
                comment: newState
            });
        //改变匹配资源"评论"富文本编辑器编辑框内容
        case appActionsType["CHANGE_PERSONAL_MATCHED_RESOURCES_LIST_VIEW_DETAILS_COMMENT"]:
            return insteadState.insteadObjState(state, {
                commentMatched: newState
            });
        //获取个人资源详情评论列表
        case appActionsType["GET_PERSONAL_RESOURCES_LIST_VIEW_DETAILS_COMMENT_LIST"]:
            return insteadState.insteadObjState(state, newState);
        //获取个人资源列表滚动条初始距离顶部高度
        case appActionsType["GET_PERSONAL_RESOURCES_LIST_PAGINATION_BEFORE_OS_TOP"]:
            return insteadState.insteadObjState(state, {
                beforeOsTop: newState
            });
        case appActionsType["CHANGE_PERSONAL_RESOURCES_LIST_PAGINATION_CURRENT"]:
            return newState === paginationPlus ? insteadState.insteadObjState(state, {
                current: state.current + 1,
                currentAsync: false
            }) : insteadState.insteadObjState(state, {
                current: state.current - 1,
                currentAsync: true
            });
    }
    return state;
}