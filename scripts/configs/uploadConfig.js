/**
 * Created by yinwk on 2017/7/12.
 */
import Success from "../prompt/successPrompt";

/**
 * Upload组件上传文件配置
 * @param name
 * @param action
 * @param data
 * @param success
 * @returns {{name: *, action: *, data: *, multiple: boolean, onSuccess: (function(this:uploadConfig)), onError: (function(this:uploadConfig))}}
 */
function uploadConfig(name, action, data, success) {
    return {
        //Upload组件上传文件的name上传名称
        name,
        //Upload组件上传文件的action上传地址
        action,
        //Upload组件上传文件的action上传参数
        data,
        multiple: true,
        withCredentials: true,
        onSuccess: function (response, file) {
            let head = response.head,
                code = head.code,
                msg = head.message,
                body = response.body;
            if (code === Success.SUCCESS_CODE) {
                success(body);
            }
        }.bind(this),
        onError: function (err, response, file) {

        }.bind(this)
    }
}

//导出Upload组件上传文件配置
export default uploadConfig;