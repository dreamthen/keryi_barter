/**
 * author yinwk
 * createTime 2017/8/16 14:41
 * description clown laugh at you~
 */
import appActionsType from "./appActionsType";

/**
 * 改变个人信息编辑状态,使得其可编辑
 * @returns {{type: *}}
 */
export function changePersonalInformation() {
    return {
        type: appActionsType["CHANGE_PERSONAL_INFORMATION"]
    }
}

/**
 * 改变个人信息编辑状态,使得其不可编辑
 * @returns {{type: *}}
 */
export function closeChangePersonalInformation() {
    return {
        type: appActionsType["CLOSE_CHANGE_PERSONAL_INFORMATION"]
    }
}