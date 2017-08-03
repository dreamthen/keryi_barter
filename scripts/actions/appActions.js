/**
 * Created by yinwk on 2017/6/26.
 */
import appActionsType from "./appActionsType";
import api from "../configs/api";
import keryiAxiosConfig from "../configs/axiosConfig";
import modalComponentConfig from "../configs/modalComponentConfig";
import Success from "../prompt/successPrompt";
import {
    getFocusPosition
} from "../configs/getElementPosition";

/**
 * 设置选择资源类型下拉框距离添加选择资源类型输入框左边的位置
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
 * 设置选择资源类型下拉框光标距离添加选择资源类型输入框左边的位置
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
 * 设置选择目标资源类型下拉框光标距离添加选择资源类型输入框左边的位置
 * @param payload
 * @returns {{type: *, payload: *}}
 */
export function changeTargetDistance(payload) {
    return {
        type: appActionsType["CHANGE_TARGET_DISTANCE"],
        payload
    }
}

/**
 * 设置选择资源类型下拉框重置距离添加选择资源类型输入框左边的位置
 * @returns {{type: *}}
 */
export function resetDistance() {
    return {
        type: appActionsType["RESET_DISTANCE"]
    }
}

/**
 * 设置选择目标资源类型下拉框重置距离添加选择目标资源类型输入框左边的位置
 * @returns {{type: *}}
 */
export function resetTargetDistance() {
    return {
        type: appActionsType["RESET_TARGET_DISTANCE"]
    }
}

/**
 * 重置对话框状态
 */
export function resetModalStatus() {
    return {
        type: appActionsType["RESET_MODAL_STATUS"]
    }
}

/**
 * 改变资源描述输入框上传图片组
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
 * 改变选择资源类型或者目标资源类型输入框模糊搜索标签组
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
 * 改变选择资源类型输入框上方的标签组,添加或者删除Tag标签数组元素
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
 * 改变选择目标资源类型输入框上方的标签组,添加或者删除Tag标签数组元素
 * @param payload
 * @returns {{type: *, payload: *}}
 */
export function setTargetTagConfig(payload) {
    return {
        type: appActionsType["SET_TARGET_TAG_CONFIG"],
        payload
    }
}

/**
 * 改变选择资源类型id标签组,添加或者删除Tag id标签数组元素
 * @param payload
 * @returns {{type: *, payload: *}}
 */
export function setTagIdConfig(payload) {
    return {
        type: appActionsType["SET_TAG_ID_CONFIG"],
        payload
    }
}

/**
 * 改变选择目标资源类型id标签组,添加或者删除Tag id标签数组元素
 * @param payload
 * @returns {{type: *, payload: *}}
 */
export function setTargetTagIdConfig(payload) {
    return {
        type: appActionsType["SET_TARGET_TAG_ID_CONFIG"],
        payload
    }
}

/**
 * 搜寻资源tag
 * @param key
 * @param initLeft
 * @param tag
 * @param tagList
 * @returns {dispatcher}
 */
export function changeTagFunction(key, initLeft, tag, tagList) {
    return function dispatcher(dispatch) {
        //axios服务器请求响应集成对象
        keryiAxiosConfig.axiosRequest(
            api.GET_RESOURCE_TAG_LIST + "/" + tag,
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
                if (code === Success.GET_RESOURCE_TAG_SUCCESS_CODE) {
                    let rect = getFocusPosition();
                    let tagListNow = [];
                    //设置选择资源类型下拉框光标距离添加对话框左边的位置
                    (key === modalComponentConfig[6]["key"]) && dispatch(changeDistance({
                        rectLeft: rect.left,
                        initLeft
                    }));
                    //设置选择目标资源类型下拉框光标距离添加对话框左边的位置
                    (key === modalComponentConfig[8]["key"]) && dispatch(changeTargetDistance({
                        rectLeft: rect.left,
                        initLeft
                    }));
                    body.forEach(function tagger(tagItem, tagIndex) {
                        let flag = false;
                        tagList.forEach(function tagBody(item, index) {
                            if (tagItem["id"] === item["id"]) {
                                flag = true;
                                return false;
                            }
                        });
                        if (!flag) {
                            tagListNow.push(tagItem);
                        }
                    });
                    //设置对话框模糊搜索资源类型标签组
                    (key === modalComponentConfig[6]["key"]) && dispatch(changeTagList({pullList: tagListNow}));
                    //设置对话框模糊搜索选择目标资源类型标签组
                    (key === modalComponentConfig[8]["key"]) && dispatch(changeTagList({pullListTarget: tagListNow}));
                }
            }.bind(this)
        );
    }
}

/**
 * 提交发布资源
 * @param title
 * @param userId
 * @param intro
 * @param price_worth
 * @param imgUrls
 * @param tags
 * @param targetTags
 * @returns {dispatcher}
 */
export function publishResource(userId, title, intro, price_worth, imgUrls, tags, targetTags) {
    return function dispatcher(dispatch) {
        //axios服务器请求响应集成对象
        keryiAxiosConfig.axiosRequest(
            api.PUBLISH_RESOURCE,
            "post",
            {
                userId,
                title,
                intro,
                priceWorth: parseInt(price_worth),
                imgUrls,
                tags,
                targetTags
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
                if (code === Success.PUBLISH_RESOURCE_SUCCESS_CODE) {
                    this.setState({
                        //控制对话框隐藏并消失
                        addBarterVisible: false,
                        //设置对话框标题为空
                        title: "",
                        //设置对话框资源描述为空
                        description: "",
                        //设置对话框选择资源类型为空
                        sourceTag: "",
                        //设置对话框选择目标资源类型为空
                        targetSourceTag: "",
                        //控制选择资源类型框消失
                        pullListDownVisible: false,
                        //控制选择目标资源类型框消失
                        pullListTargetDownVisible: false
                    });
                    //重置对话框状态
                    dispatch(resetModalStatus());
                }
            }.bind(this)
        )
    }
}