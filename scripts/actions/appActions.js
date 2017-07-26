/**
 * Created by yinwk on 2017/6/26.
 */
import appActionsType from "./appActionsType";
import api from "../configs/api";
import keryiFetchConfig from "../configs/fetchConfig";
import Success from "../prompt/successPrompt";
import {
    getFocusPosition
} from "../configs/getElementPosition";

/**
 * 设置选择资源类型下拉框距离添加对话框左边的位置
 * @param payload
 * @returns {{type: *, payload: *}}
 */
export function changeInitDistance(payload) {
    return {
        type: appActionsType["CHANGE_INIT_DISTANCE"],
        payload
    }
}

/**
 * 设置选择资源类型下拉框光标距离添加对话框左边的位置
 * @param payload
 * @returns {{type: *, payload: *}}
 */
export function changeDistance(payload) {
    return {
        type: appActionsType["CHANGE_DISTANCE"],
        payload
    }
}

/**
 * 改变对话框上传图片组
 * @param payload
 * @returns {{type: *, payload: *}}
 */
export function changeImageList(payload) {
    return {
        type: appActionsType["CHANGE_IMAGE_LIST"],
        payload
    }
}

/**
 * 改变对话框模糊搜索标签组
 * @param payload
 * @returns {{type: *, payload: *}}
 */
export function changeTagList(payload) {
    return {
        type: appActionsType["CHANGE_TAG_LIST"],
        payload
    }
}

/**
 * 改变对话框中的标签组
 * @param payload
 * @returns {{type: *, payload: *}}
 */
export function setTagConfig(payload) {
    return {
        type: appActionsType["SET_TAG_CONFIG"],
        payload
    }
}

/**
 * 搜寻资源tag
 * @param initLeft
 * @param tag
 * @returns {dispatcher}
 */
export function changeTagFunction(initLeft, tag) {
    return function dispatcher(dispatch) {
        keryiFetchConfig.fetchRequest(
            api.GET_RESOURCE_TAG_LIST + "/" + tag,
            "get",
            {},
            function done(response) {
                let head = response.head,
                    code = head.code,
                    msg = head.message,
                    body = response.body;
                if (code === Success.GET_RESOURCE_TAG_SUCCESS_CODE) {
                    let rect = getFocusPosition();
                    //设置选择资源类型下拉框光标距离添加对话框左边的位置
                    dispatch(changeDistance({rectLeft: rect.left, initLeft}));
                    //设置对话框模糊搜索标签组
                    dispatch(changeTagList({pullList: body}));
                }
            }.bind(this)
        )
    }
}