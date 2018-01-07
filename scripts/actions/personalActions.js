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
//获取评论列表的每页页码数量
const COMMENT_PAGE_SIZE = 10;

/**
 * 获取个人页资源列表
 * @param pageNum
 * @param userId
 * @returns {function(this:getPersonalResourcesList)}
 */
export function getPersonalResourcesList(pageNum, userId) {
    return function dispatcher(dispatch) {
        return new Promise(function promise(resolve, reject) {
            keryiAxiosConfig.axiosRequest(
                api.GET_RESOURCE_LIST,
                "get",
                {
                    pageNum,
                    pageSize: PAGE_SIZE,
                    userId
                },
                function done(response) {
                    //服务器响应body主体对象
                    let body = response;
                    body ? resolve(body) : reject();
                }.bind(this),
                function error(response) {

                }.bind(this)
            );
        });
    }.bind(this)
}

/**
 * 获取个人页资源详情
 * @param resourceId
 */
export function getPersonalResourcesListViewDetails(resourceId) {
    return function dispatcher(dispatch) {
        return new Promise(function promise(resolve, reject) {
            keryiAxiosConfig.axiosRequest(
                api.GET_RESOURCE_LIST_VIEW_DETAIL + "/" + resourceId,
                "get",
                {},
                function done(response) {
                    //服务器响应body主体对象
                    let body = response;
                    resolve(body);
                }.bind(this),
                function error(response) {

                }.bind(this)
            );
        });
    }.bind(this)
}

/**
 * 获取个人页资源详情资源交换列表
 * @param userId
 * @param resourceId
 * @param itemCurrent
 * @returns {function(this:getPersonalResourcesListViewDetailsItemList)}
 */
export function getPersonalResourcesListViewDetailsItemList(itemCurrent, userId, resourceId) {
    return function dispatcher(dispatch) {
        return new Promise(function promise(resolve, reject) {
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
                    //服务器响应body主体对象
                    let body = response;
                    resolve(body);
                }.bind(this),
                function error(response) {

                }.bind(this)
            )
        });
    }.bind(this)
}

/**
 * 个人信息页面发起资源交换
 * @param initiativeResourceId
 * @param passiveResourceId
 * @param initiativeUserId
 * @param passiveUserId
 * @param viewDetailKeryiCard
 * @param itemCurrent
 * @returns {function(this:havePersonalResourcesExchange)}
 */
export function havePersonalResourcesExchange({initiativeResourceId, passiveResourceId, initiativeUserId, passiveUserId, itemCurrent}) {
    return function dispatcher(dispatch) {
        return new Promise(function promise(resolve, reject) {
            keryiAxiosConfig.axiosRequest(
                api.HAVE_EXCHANGE,
                "post",
                {
                    initiativeResourceId,
                    passiveResourceId,
                    initiativeUserId,
                    passiveUserId
                },
                function done(response) {
                    //服务器响应body主体对象
                    let body = response;
                    resolve();
                }.bind(this),
                function error(response) {

                }.bind(this)
            );
        });
    }.bind(this)
}

/**
 * 个人信息页面删除资源交换列表
 * @param exchangeId
 * @param userId
 * @param id
 * @param itemCurrent
 * @returns {function(this:deletePersonalResourcesExchange)}
 */
export function deletePersonalResourcesExchange(exchangeId, userId, id, itemCurrent) {
    return function dispatcher(dispatch) {
        return new Promise(function promise(resolve, reject){
            keryiAxiosConfig.axiosRequest(
                api.DELETE_EXCHANGE_LIST + "/" + exchangeId,
                "delete",
                {},
                function done(response) {
                    //服务器响应body主体对象
                    let body = response;
                    resolve();
                }.bind(this),
                function error(response) {

                }.bind(this)
            );
        });
    }.bind(this)
}

/**
 * 个人信息页面资源交换列表更换交换关系状态
 * @param exchangeId
 * @param exchangeToStatus
 * @param userId
 * @param id
 * @param itemCurrent
 * @returns {function(this:selectPersonalResourceExchange)}
 */
export function selectPersonalResourceExchange(exchangeId, exchangeToStatus, userId, id, itemCurrent) {
    return function dispatcher(dispatch) {
        return new Promise(function promise(resolve, reject){
            keryiAxiosConfig.axiosRequest(
                api.CHANGE_EXCHANGE_LIST_STATUS + "/" + exchangeId + "/status",
                "put",
                {
                    id: exchangeId,
                    status: exchangeToStatus
                },
                function done(response) {
                    //服务器响应body主体对象
                    let body = response;
                    resolve();
                }.bind(this),
                function error(response) {

                }.bind(this)
            );
        });
    }.bind(this);
}

/**
 * 获取个人信息
 * @param userId
 * @returns {function(this:getPersonalInformation)}
 */
export function getPersonalInformation(userId) {
    return function dispatcher(dispatch) {
        return new Promise(function promise(resolve, reject){
            keryiAxiosConfig.axiosRequest(
                api.GET_PERSONAL_INFORMATION + "/" + userId,
                "get",
                {},
                function done(response) {
                    //服务器响应body主体对象
                    let body = response;
                    resolve(body);
                }.bind(this),
                function error(response) {

                }.bind(this)
            );
        });
    }.bind(this)
}

/**
 * 更新、保存个人信息,并改变个人信息编辑状态,使得其不可编辑
 * @param userId
 * @param username
 * @param email
 * @param phone
 * @param motto
 * @returns {function(this:saveUpdatePersonalInformation)}
 */
export function saveUpdatePersonalInformation(userId, username, email, phone, motto) {
    return function dispatcher(dispatch) {
        return new Promise(function promise(resolve, reject){
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
                    //服务器响应body主体对象
                    let body = response;
                    resolve();
                }.bind(this),
                function error(response) {

                }.bind(this)
            )
        });
    }.bind(this)
}

/**
 * 获取个人页资源详情评论列表
 * @param resourceId
 * @param commentFrom
 * @param commentTo
 * @param pageNum
 */
export function getPersonalResourcesListViewDetailsCommentList(resourceId, commentFrom, commentTo, pageNum) {
    return function dispatcher(dispatch) {
        return new Promise(function promise(resolve, reject) {
            keryiAxiosConfig.axiosRequest(
                api.GET_RESOURCE_LIST_VIEW_DETAIL_COMMENT_LIST,
                "get",
                {
                    resourceId,
                    commentFrom,
                    commentTo,
                    pageNum,
                    pageSize: COMMENT_PAGE_SIZE
                },
                function done(response) {
                    //服务器响应body主体对象
                    let body = response,
                        list = body.list,
                        commentTotal = body.total;
                    resolve({list, commentTotal});
                }.bind(this),
                function error() {

                }.bind(this)
            );
        });
    }.bind(this)
}

/**
 * 插入个人资源详情评论
 * @param resourceId
 * @param commentFrom
 * @param commentTo
 * @param comment
 */
export function doPersonalResourcesListViewDetailsComment(resourceId, commentFrom, commentTo, comment) {
    return function dispatcher(dispatch) {
        return new Promise(function promise(resolve, reject) {
            keryiAxiosConfig.axiosRequest(
                api.DO_RESOURCE_LIST_VIEW_DETAIL_COMMENT,
                "post",
                {
                    resourceId,
                    commentFrom,
                    commentTo,
                    comment
                },
                function done(response) {
                    //服务器响应body主体对象
                    let body = response;
                    resolve();
                }.bind(this),
                function error(response) {

                }.bind(this)
            );
        });
    }.bind(this);
}

/**
 * 保存个人页资源详情Action
 * @param payload
 * @returns {{type: *, payload: *}}
 */
export function rememberPersonalResourcesListViewDetails(payload) {
    return {
        type: appActionsType["REMEMBER_PERSONAL_RESOURCE_LIST_VIEW_DETAIL"],
        payload
    }
}

/**
 * 保存个人页资源详情资源交换列表Action
 * @param payload
 * @returns {{type: *, payload: *}}
 */
export function rememberPersonalResourcesListViewDetailsItemListAction(payload) {
    return {
        type: appActionsType["REMEMBER_PERSONAL_RESOURCE_LIST_VIEW_DETAIL_ITEM_LIST"],
        payload
    }
}

/**
 * 保存个人页资源详情匹配资源交换列表Action
 * @param payload
 * @returns {{type: *, payload: *}}
 */
export function rememberPersonalResourcesListViewDetailsMatchedItemListAction(payload) {
    return {
        type: appActionsType["REMEMBER_PERSONAL_RESOURCE_LIST_VIEW_DETAIL_MATCHED_ITEM_LIST"],
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
 * 获取个人页匹配列表资源详情Action
 * @param payload
 * @returns {{type: *, payload: *}}
 */
export function getPersonalResourcesMatchedListViewDetailsAction(payload) {
    return {
        type: appActionsType["GET_PERSONAL_RESOURCE_MATCHED_LIST_VIEW_DETAIL"],
        payload
    }
}

/**
 * 获取个人页资源详情资源交换列表Action
 * @param payload
 * @param matched
 * @param exchangeStatus
 * @returns {{type: *, payload: {payload: *, matched: *}}}
 */
export function getPersonalResourcesListViewDetailsItemListAction(payload, matched, exchangeStatus) {
    return {
        type: appActionsType["GET_PERSONAL_RESOURCE_LIST_VIEW_DETAIL_ITEM_LIST"],
        payload,
        matched,
        exchangeStatus
    }
}

/**
 * 重置个人页资源页面Action
 * @returns {{type: *}}
 */
export function resetPersonalResourcesListViewDetailsAction() {
    return {
        type: appActionsType["RESET_PERSONAL_RESOURCE_LIST_VIEW_DETAIL"]
    }
}

/**
 * 重置个人页资源详情Action
 * @returns {{type: *}}
 */
export function resetPersonalResourcesListViewDetailsContentAction() {
    return {
        type: appActionsType["RESET_PERSONAL_RESOURCE_LIST_VIEW_DETAIL_CONTENT"]
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
export function openPersonalViewDetailsFooter() {
    return {
        type: appActionsType["OPEN_PERSONAL_VIEW_DETAIL_FOOTER"]
    }
}

/**
 * 使客户的头像和背景可编辑Action
 * @returns {{type: *}}
 */
export function changePersonalEditAppearanceAction() {
    return {
        type: appActionsType["CHANGE_PERSONAL_EDIT_APPEARANCE"]
    }
}

/**
 * 使客户的头像和背景不可编辑Action
 * @returns {{type: *}}
 */
export function closePersonalEditAppearanceAction() {
    return {
        type: appActionsType["CLOSE_PERSONAL_EDIT_APPEARANCE"]
    }
}

/**
 * 隐藏个人页资源详情对话框footer底部区域Action
 * @returns {{type: *}}
 */
export function closePersonalViewDetailsFooter() {
    return {
        type: appActionsType["CLOSE_PERSONAL_VIEW_DETAIL_FOOTER"]
    }
}

/**
 * 个人页资源详情资源交换列表显示可关闭标志位Action
 * @returns {{type: *}}
 */
export function openPersonalViewDetailsItemClose() {
    return {
        type: appActionsType["OPEN_PERSONAL_VIEW_DETAIL_ITEM_CLOSE"]
    }
}

/**
 * 个人页资源详情资源交换列表隐藏可关闭标志位Action
 * @returns {{type: *}}
 */
export function closePersonalViewDetailsItemClose() {
    return {
        type: appActionsType["CLOSE_PERSONAL_VIEW_DETAIL_ITEM_CLOSE"]
    }
}

/**
 * 个人页资源详情匹配到的资源列表边栏显示Action
 * @returns {{type: *}}
 */
export function openPersonalViewDetailsAside() {
    return {
        type: appActionsType["OPEN_PERSONAL_VIEW_DETAIL_ASIDE"]
    }
}

/**
 * 个人页资源详情匹配到的资源列表边栏隐藏Action
 * @returns {{type: *}}
 */
export function closePersonalViewDetailsAside() {
    return {
        type: appActionsType["CLOSE_PERSONAL_VIEW_DETAIL_ASIDE"]
    }
}

/**
 * 个人页资源详情资源交换列表显示描述浮层Action
 * @returns {{type: *}}
 */
export function openPersonalViewDetailsItemHover() {
    return {
        type: appActionsType["OPEN_PERSONAL_VIEW_DETAIL_ITEM_HOVER"]
    }
}

/**
 * 个人页资源详情资源交换列表隐藏使描述浮层消失Action
 * @returns {{type: *}}
 */
export function closePersonalViewDetailsItemHover() {
    return {
        type: appActionsType["CLOSE_PERSONAL_VIEW_DETAIL_ITEM_HOVER"]
    }
}

/**
 * 修改个人页头像成功Action
 * @param payload
 * @returns {{type: *, payload: *}}
 */
export function uploadPersonalAvatarAction(payload) {
    return {
        type: appActionsType["UPLOAD_PERSONAL_AVATAR_ACTION"],
        payload
    }
}

/**
 * 改变"评论"富文本编辑器编辑框内容Action
 * @param payload
 * @returns {{type: *, payload: *}}
 */
export function changePersonalResourcesListViewDetailsCommentAction(payload) {
    return {
        type: appActionsType["CHANGE_PERSONAL_RESOURCES_LIST_VIEW_DETAILS_COMMENT"],
        payload
    }
}

/**
 * 获取个人资源详情评论列表Action
 * @param payload
 * @returns {{type: *, payload: *}}
 */
export function getPersonalResourcesListViewDetailsCommentListAction(payload) {
    return {
        type: appActionsType["GET_PERSONAL_RESOURCES_LIST_VIEW_DETAILS_COMMENT_LIST"],
        payload
    }
}

/**
 * 获取个人资源列表滚动条初始距离顶部高度Action
 * @param payload
 * @returns {{type: *, payload: *}}
 */
export function getPersonalResourcesListPaginationBeforeOsTopAction(payload) {
    return {
        type: appActionsType["GET_PERSONAL_RESOURCES_LIST_PAGINATION_BEFORE_OS_TOP"],
        payload
    }
}

/**
 * 改变个人资源分页页码Action
 * @param payload
 * @returns {{type: *, payload: *}}
 */
export function changePersonalResourcesListPaginationCurrentAction(payload) {
    return {
        type: appActionsType["CHANGE_PERSONAL_RESOURCES_LIST_PAGINATION_CURRENT"],
        payload
    }
}