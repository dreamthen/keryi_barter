/**
 * Created by yinwk on 2017/6/26.
 */
import appActionsType from "./appActionsType";
import api from "../configs/api";
import keryiFetchConfig from "../configs/fetchConfig";

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