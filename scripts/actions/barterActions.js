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
                //服务器响应数据
                let data = response.data,
                    //服务器响应body主题对象
                    body = data.body,
                    //服务器响应head头部对象
                    head = data.head,
                    //服务器响应code状态码
                    code = head.code,
                    //服务器对响应结果描述
                    msg = head.message;
                if (code === Success.GET_RESOURCE_LIST_SUCCESS_CODE) {
                    dispatch(getResourcesListAction(body));
                }
            }
        );
    }
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
                //服务器响应数据
                let data = response.data,
                    //服务器响应body主题对象
                    body = data.body,
                    //服务器响应head头部对象
                    head = data.head,
                    //服务器响应code状态码
                    code = head.code,
                    //服务器对响应结果描述
                    msg = head.message;
                if (code === Success.GET_RESOURCE_LIST_VIEW_DETAIL_SUCCESS_CODE) {
                    dispatch(getUserHeadPortraitViewDetail(body));
                    dispatch(getResourcesListViewDetailsAction(body));
                }
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

            }.bind(this)
        );
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
export function resetResourcesListViewDetailsAction() {
    return {
        type: appActionsType["RESET_RESOURCE_LIST_VIEW_DETAIL"]
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