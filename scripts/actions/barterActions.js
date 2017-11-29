/**
 * Created by yinwk on 2017/7/11.
 */
import appActionsType from "./appActionsType";
import api from "../configs/api";
import keryiAxiosConfig from "../configs/axiosConfig";
import Success from "../prompt/successPrompt";

//获取资源列表的每页页码数量
const PAGE_SIZE = 10;

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
export function resetResourcesListViewDetailsAction(){
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