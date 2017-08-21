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
    current: 1,
    //个人信息部分距离父级元素顶部的高度
    top: 0,
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
    viewDetailTargetTagList: []
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
        //获取个人页资源详情用户头像
        case appActionsType["GET_PERSONAL_USER_HEAD_PORTRAIT_VIEW_DETAIL"]:
            return insteadState.insteadObjState(state, {
                viewDetailHeadPortrait: newState["user"]["avatar"]
            });
        //获取个人页资源详情
        case appActionsType["GET_PERSONAL_RESOURCE_LIST_VIEW_DETAIL"]:
            newState["viewDetailUserName"] = newState["user"]["username"];
            newState["viewDetailImageList"] = newState["imgUrls"];
            newState["viewDetailTitle"] = newState["title"];
            newState["viewDetailIntroduce"] = newState["intro"];
            newState["viewDetailPriceWorth"] = newState["priceWorth"];
            newState["viewDetailLike"] = newState["likeCount"];
            newState["viewDetailTagList"] = newState["tags"];
            newState["viewDetailTargetTagList"] = newState["targetTags"];
            return insteadState.insteadObjState(state, newState);
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