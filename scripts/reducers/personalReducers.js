/**
 * author yinwk
 * createTime 2017/8/16 17:56
 * description clown laugh at you~
 */
//app页面action类型
import appActionsType from "../actions/appActionsType";
//redux reducer更换state状态对象
import insteadState from "../configs/insteadState";
//对个人页资源详情资源交换图片(第一张)以及标题内容列表进行整理,获取到整理后的图片列表
import {getImageOrContentItemListConfig} from "../configs/getImageItemListConfig";
import {
    //校验字段undefined和null,进行处理
    checkField
} from "../configs/checkField";

let userLoginInformation = localStorage && JSON.parse(localStorage.getItem("userLoginInformation"));

const defaultState = {
    //用户登录的id
    userId: checkField(userLoginInformation["id"]),
    //确认进行资源交换的匹配资源的用户id
    matchedUserId: 0,
    //确认进行资源交换的匹配资源id
    matchedId: 0,
    //用户登录的用户名
    username: checkField(userLoginInformation["username"]),
    //用户登录的手机号
    phone: checkField(userLoginInformation["phone"]),
    //用户登录的邮箱
    email: checkField(userLoginInformation["email"]),
    //用户登录的头像
    avatar: checkField(userLoginInformation["avatar"]),
    //用户登录的个性签名
    motto: checkField(userLoginInformation["motto"]),
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
    //个人信息部分距离父级元素顶部的高度
    top: 0,
    //个人页资源详情对话框是否显示footer底部区域
    viewDetailFooter: false,
    //个人页资源详情对象
    viewDetailKeryiCard: {},
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
    viewDetailItemExchange: {}
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
        //保存个人页资源详情
        case appActionsType["REMEMBER_PERSONAL_RESOURCE_LIST_VIEW_DETAIL"]:
            return insteadState.insteadObjState(state, {
                viewDetailKeryiCard: newState
            });
        //获取个人页资源详情用户头像
        case appActionsType["GET_PERSONAL_USER_HEAD_PORTRAIT_VIEW_DETAIL"]:
            return insteadState.insteadObjState(state, {
                viewDetailHeadPortrait: newState["user"]["avatar"]
            });
        //获取个人页资源详情
        case appActionsType["GET_PERSONAL_RESOURCE_LIST_VIEW_DETAIL"]:
            let viewDetail = {
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
        //获取个人页资源详情资源交换列表
        case appActionsType["GET_PERSONAL_RESOURCE_LIST_VIEW_DETAIL_ITEM_LIST"]:
            let FirstImgOrContentUrlsList = getImageOrContentItemListConfig(newState["list"]);
            let viewDetailItemListConfig = {
                viewDetailItemImageOrContentList: FirstImgOrContentUrlsList
            };
            return insteadState.insteadObjState(state, viewDetailItemListConfig);
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
        //重置个人页资源详情
        case appActionsType["RESET_PERSONAL_RESOURCE_LIST_VIEW_DETAIL"]:
            return defaultState;
    }
    return state;
}