/**
 * author yinwk
 * createTime 2017/8/16 14:41
 * description clown laugh at you~
 */
import appActionsType from "./appActionsType";
import api from "../configs/api";
import keryiAxiosConfig from "../configs/axiosConfig";
import Success from "../prompt/successPrompt";

//获取个人页资源列表的每页页码数量
const PAGE_SIZE = 10;
//获取个人页资源详情资源交换列表的每页页码数量
const ITEM_PAGE_SIZE = 4;

/**
 * 获取个人页资源列表
 * @param pageNum
 * @param userId
 * @returns {function(this:getResourcesList)}
 */
export function getPersonalResourcesList(pageNum, userId) {
    return function dispatcher(dispatch) {
        keryiAxiosConfig.axiosRequest(
            api.GET_RESOURCE_LIST,
            "get",
            {
                pageNum,
                pageSize: PAGE_SIZE,
                userId
            },
            function done(response) {
                //服务器响应数据
                let data = response.data,
                    //服务器响应head头部对象
                    head = data.head,
                    //服务器响应body主题对象
                    body = data.body,
                    //服务器响应code状态码
                    code = head.code,
                    //服务器对响应结果描述
                    msg = head.message;
                if (code === Success.GET_PERSONAL_RESOURCE_LIST_SUCCESS_CODE) {
                    dispatch(getPersonalResourcesListAction(body));
                }
            }.bind(this)
        );
    }.bind(this)
}

/**
 * 获取个人页资源详情
 * @param resourceId
 */
export function getPersonalResourceListViewDetails(resourceId) {
    return function dispatcher(dispatch) {
        keryiAxiosConfig.axiosRequest(
            api.GET_RESOURCE_LIST_VIEW_DETAIL + "/" + resourceId,
            "get",
            {},
            function done(response) {
                //服务器响应数据
                let data = response.data,
                    //服务器响应head头部对象
                    head = data.head,
                    //服务器响应body主题对象
                    body = data.body,
                    //服务器响应code状态码
                    code = head.code,
                    //服务器对响应结果描述
                    msg = head.message;
                if (code === Success.GET_RESOURCE_LIST_VIEW_DETAIL_SUCCESS_CODE) {
                    dispatch(rememberPersonalResourceListViewDetails(body));
                    dispatch(getPersonalUserHeadPortraitViewDetail(body));
                    dispatch(getPersonalResourcesListViewDetailsAction(body));
                }
            }.bind(this)
        );
    }.bind(this)
}

/**
 * 获取个人页资源详情资源交换列表
 * @param userId
 * @param resourceId
 * @param itemCurrent
 * @returns {function(this:getPersonalResourceListViewDetailsItemList)}
 */
export function getPersonalResourceListViewDetailsItemList(itemCurrent, userId, resourceId) {
    return function dispatcher(dispatch) {
        keryiAxiosConfig.axiosRequest(
            api.GET_EXCHANGE_LIST,
            "GET",
            {
                pageNum: itemCurrent,
                pageSize: ITEM_PAGE_SIZE,
                initiativeUserId: userId,
                initiativeResourceId: resourceId
            },
            function done(response) {
                //服务器响应数据
                let data = response.data,
                    //服务器响应head头部对象
                    head = data.head,
                    //服务器响应body主题对象
                    body = data.body,
                    //服务器响应code状态码
                    code = head.code,
                    //服务器对响应结果描述
                    msg = head.message;
                if (code === Success.GET_RESOURCE_LIST_VIEW_DETAIL_ITEM_LIST_SUCCESS_CODE) {
                    dispatch(getPersonalResourceListViewDetailsItemListAction.bind(this)(body));
                }
            }.bind(this)
        )
    }.bind(this)
}

/**
 * 获取个人信息
 * @param userId
 */
export function getPersonalInformation(userId) {
    return function dispatcher(dispatch) {
        keryiAxiosConfig.axiosRequest(
            api.GET_PERSONAL_INFORMATION + "/" + userId,
            "get",
            {},
            function done(response) {
                //服务器响应数据
                let data = response.data,
                    //服务器响应head头部对象
                    head = data.head,
                    //服务器响应body主题对象
                    body = data.body,
                    //服务器响应code状态码
                    code = head.code,
                    //服务器对响应结果描述
                    msg = head.message;
                if (code === Success.GET_PERSONAL_INFORMATION_SUCCESS_CODE) {
                    //更新并保存个人信息
                    dispatch(saveChangePersonalInformation({
                        username: body["username"],
                        email: body["email"],
                        phone: body["phone"],
                        motto: body["motto"]
                    }));
                }
            }
        );
    }.bind(this)
}

/**
 * 更新、保存个人信息,并改变个人信息编辑状态,使得其不可编辑
 * @param userId
 * @param username
 * @param email
 * @param phone
 * @param motto
 * @param current
 * @returns {function(this:getResourcesList)}
 */
export function saveUpdatePersonalInformation(userId, username, email, phone, motto, current) {
    return function dispatcher(dispatch) {
        keryiAxiosConfig.axiosRequest(
            api.UPDATE_PERSONAL_INFORMATION + "/" + userId,
            "put",
            {
                id: userId,
                username,
                email,
                phone,
                motto
            },
            function done(response) {
                //服务器响应数据
                let data = response.data,
                    //服务器响应head头部对象
                    head = data.head,
                    //服务器响应body主题对象
                    body = data.body,
                    //服务器响应code状态码
                    code = head.code,
                    //服务器对响应结果描述
                    msg = head.message;
                if (code === Success.SAVE_CHANGE_PERSONAL_INFORMATION_SUCCESS_CODE) {
                    //控制Modal组件对话框隐藏并消失
                    this.setState({
                        viewPersonalBarterVisible: false
                    });
                    //更新并保存个人信息
                    dispatch(saveChangePersonalInformation({
                        username,
                        email,
                        phone,
                        motto
                    }));
                    //改变个人信息编辑状态,使得其不可编辑
                    dispatch(closeChangePersonalInformation());
                    //获取个人页资源列表
                    dispatch(getPersonalResourcesList.bind(this)(current, userId));
                }
            }.bind(this)
        )
    }.bind(this)
}

/**
 * 保存个人页资源详情Action
 * @param payload
 * @returns {{type: *, payload: *}}
 */
export function rememberPersonalResourceListViewDetails(payload) {
    return {
        type: appActionsType["REMEMBER_PERSONAL_RESOURCE_LIST_VIEW_DETAIL"],
        payload
    }
}

/**
 * 获取个人页资源列表Action
 * @param payload
 * @returns {{type: *, payload: *}}
 */
export function getPersonalResourcesListAction(payload) {
    return {
        type: appActionsType["GET_PERSONAL_RESOURCE_LIST_ACTION"],
        payload
    }
}

/**
 * 获取个人页资源详情Action
 * @param payload
 * @returns {{type: *, payload: *}}
 */
export function getPersonalResourcesListViewDetailsAction(payload) {
    return {
        type: appActionsType["GET_PERSONAL_RESOURCE_LIST_VIEW_DETAIL"],
        payload
    }
}

/**
 * 获取个人页资源详情资源交换列表Action
 * @param payload
 * @returns {{type: *, payload: *}}
 */
export function getPersonalResourceListViewDetailsItemListAction(payload) {
    return {
        type: appActionsType["GET_PERSONAL_RESOURCE_LIST_VIEW_DETAIL_ITEM_LIST"],
        payload
    }
}

/**
 * 重置个人页资源详情Action
 * @returns {{type: *}}
 */
export function resetPersonalResourcesListViewDetailsAction() {
    return {
        type: appActionsType["RESET_PERSONAL_RESOURCE_LIST_VIEW_DETAIL"]
    }
}

/**
 * 获取个人页资源详情用户头像Action
 * @param payload
 * @returns {{type: *, payload: *}}
 */
export function getPersonalUserHeadPortraitViewDetail(payload) {
    return {
        type: appActionsType["GET_PERSONAL_USER_HEAD_PORTRAIT_VIEW_DETAIL"],
        payload
    }
}

/**
 * 改变个人信息编辑状态,使得其可编辑Action
 * @returns {{type: *}}
 */
export function changePersonalInformation() {
    return {
        type: appActionsType["CHANGE_PERSONAL_INFORMATION"]
    }
}

/**
 * 更新并保存个人信息Action
 * @param payload
 * @returns {{type: *, payload: *}}
 */
export function saveChangePersonalInformation(payload) {
    return {
        type: appActionsType["SAVE_CHANGE_PERSONAL_INFORMATION"],
        payload
    }
}

/**
 * 改变个人信息编辑状态,使得其不可编辑Action
 * @returns {{type: *}}
 */
export function closeChangePersonalInformation() {
    return {
        type: appActionsType["CLOSE_CHANGE_PERSONAL_INFORMATION"]
    }
}

/**
 * 改变个人信息部分距离父级元素顶部的高度,使个人信息页面主体信息随着窗口滚动而滚动Action
 * @param payload
 * @returns {{type: *, payload: *}}
 */
export function changePersonalInformationScrollTop(payload) {
    return {
        type: appActionsType["CHANGE_PERSONAL_INFORMATION_SCROLL_TOP"],
        payload
    }
}

/**
 * 显示个人页资源详情对话框footer底部区域Action
 * @returns {{type: *}}
 */
export function openPersonalViewDetailFooter() {
    return {
        type: appActionsType["OPEN_PERSONAL_VIEW_DETAIL_FOOTER"]
    }
}

/**
 * 隐藏个人页资源详情对话框footer底部区域Action
 * @returns {{type: *}}
 */
export function closePersonalViewDetailFooter() {
    return {
        type: appActionsType["CLOSE_PERSONAL_VIEW_DETAIL_FOOTER"]
    }
}

/**
 * 个人页资源详情资源交换列表显示可关闭标志位Action
 * @returns {{type: *}}
 */
export function openPersonalItemClose() {
    return {
        type: appActionsType["OPEN_PERSONAL_ITEM_CLOSE"]
    }
}

/**
 * 个人页资源详情资源交换列表隐藏可关闭标志位Action
 * @returns {{type: *}}
 */
export function closePersonalItemClose() {
    return {
        type: appActionsType["CLOSE_PERSONAL_ITEM_CLOSE"]
    }
}