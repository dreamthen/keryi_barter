/**
 * Created by yinwk on 2017/7/11.
 */
import appActionsType from "./appActionsType";
import api from "../configs/api";
import keryiAxiosConfig from "../configs/axiosConfig";
import Success from "../prompt/successPrompt";

//获取资源列表的每页页码数量
const PAGE_SIZE = 10;
//获取评论列表的每页页码数量
const COMMENT_PAGE_SIZE = 10;

/**
 * 获取资源列表
 * @param pageNum
 * @returns {function(this:getResourcesList)}
 */
export function getResourcesList(pageNum) {
    return function dispatchMe(dispatch) {
        //axios服务器请求响应集成对象
        keryiAxiosConfig.axiosRequest(
            api.GET_RESOURCE_LIST,
            "GET",
            {
                pageSize: PAGE_SIZE,
                pageNum
            },
            function done(response) {
                //服务器响应body主体对象
                let body = response;
                dispatch(getResourcesListAction(body));
            }.bind(this),
            function error(response) {

            }.bind(this)
        );
    }.bind(this)
}

/**
 * 获取资源详情
 * @param resourceId
 */
export function getResourcesListViewDetails(resourceId) {
    return function dispatcher(dispatch) {
        keryiAxiosConfig.axiosRequest(
            api.GET_RESOURCE_LIST_VIEW_DETAIL + "/" + resourceId,
            "get",
            {},
            function done(response) {
                //服务器响应body主体对象
                let body = response;
                dispatch(getUserHeadPortraitViewDetail(body));
                dispatch(getResourcesListViewDetailsAction(body));
            }.bind(this),
            function error() {

            }.bind(this)
        );
    }.bind(this)
}

/**
 * 更新喜欢数
 * @param resourceId
 * @param likeCount
 * @returns {function(this:updateLikeCount)}
 */
export function updateLikeCount(resourceId, likeCount) {
    return function dispatcher(dispatch) {
        keryiAxiosConfig.axiosRequest(
            api.UPDATE_LIKE_COUNT,
            "put",
            {
                resourceId,
                likeCount
            },
            function done(response) {

            }.bind(this),
            function error(response) {

            }.bind(this)
        );
    }.bind(this)
}

/**
 * 发起交换
 * @param initiativeResourceId
 * @param passiveResourceId
 * @param initiativeUserId
 * @param passiveUserId
 * @returns {function(this:haveResourcesExchange)}
 */
export function haveResourcesExchange({initiativeResourceId, passiveResourceId, initiativeUserId, passiveUserId}) {
    return function dispatcher(dispatch) {
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

            }.bind(this),
            function error(response) {

            }.bind(this)
        )
    }.bind(this)
}

/**
 * 获取资源详情评论列表
 * @param resourceId
 * @param commentFrom
 * @param commentTo
 * @param pageNum
 */
export function getResourcesListViewDetailsCommentList(resourceId, commentFrom, commentTo, pageNum) {
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
 * 插入资源详情评论
 * @param resourceId
 * @param commentFrom
 * @param commentTo
 * @param comment
 */
export function doResourcesListViewDetailsComment(resourceId, commentFrom, commentTo, comment) {
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
 * 获取资源列表Action
 * @param payload
 * @returns {{type: *, payload: *}}
 */
export function getResourcesListAction(payload) {
    return {
        type: appActionsType["GET_RESOURCE_LIST"],
        payload
    }
}

/**
 * 获取资源详情Action
 * @param payload
 * @returns {{type: *, payload: *}}
 */
export function getResourcesListViewDetailsAction(payload) {
    return {
        type: appActionsType["GET_RESOURCE_LIST_VIEW_DETAIL"],
        payload
    }
}

/**
 * 重置资源详情Action
 * @returns {{type: *}}
 */
export function resetResourcesListViewDetailsAction() {
    return {
        type: appActionsType["RESET_RESOURCE_LIST_VIEW_DETAIL"]
    }
}

/**
 * 重置资源数据列表和资源详情Action
 * @returns {{type: *}}
 */
export function resetResourcesListViewListDetailsAction() {
    return {
        type: appActionsType["RESET_RESOURCE_LIST_VIEW_LIST_DETAIL"]
    }
}

/**
 * 获取资源详情用户头像Action
 * @param payload
 * @returns {{type: *, payload: *}}
 */
export function getUserHeadPortraitViewDetail(payload) {
    return {
        type: appActionsType["GET_USER_HEAD_PORTRAIT_VIEW_DETAIL"],
        payload
    }
}

/**
 * 改变"评论"富文本编辑器编辑框内容Action
 * @param payload
 * @returns {{type: *, payload: *}}
 */
export function changeResourcesListViewDetailsCommentAction(payload) {
    return {
        type: appActionsType["CHANGE_RESOURCES_LIST_VIEW_DETAILS_COMMENT"],
        payload
    }
}

/**
 * 获取资源详情评论列表Action
 * @param payload
 * @returns {{type: *, payload: *}}
 */
export function getResourcesListViewDetailsCommentListAction(payload) {
    return {
        type: appActionsType["GET_RESOURCES_LIST_VIEW_DETAILS_COMMENT_LIST"],
        payload
    }
}