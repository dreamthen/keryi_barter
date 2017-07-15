/**
 * Created by yinwk on 2017/7/11.
 */
import appActionsType from "./appActionsType";
import api from "../configs/api";
import keryiFetchConfig from "../configs/fetchConfig";
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
        keryiFetchConfig.fetchRequest(
            api.GET_RESOURCE_LIST,
            "GET",
            {
                pageSize: PAGE_SIZE,
                pageNum
            },
            function done(response) {
                //服务器响应数据
                let body = response.body,
                    //服务器响应head头部对象
                    head = response.head,
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