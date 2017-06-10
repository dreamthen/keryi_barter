/**
 * Created by yinwk on 2017/6/3.
 */
import keryiFetchConfig from "../configs/fetchConfig";
import api from "../configs/api";
import Success from "../prompt/successPrompt";

/**
 * keryi_barter登录
 * @param account
 * @param password
 */
export function login(account, password) {
    //fetch服务器请求响应集成对象
    keryiFetchConfig.fetchRequest(
        api.KERYI_LOGIN,
        "post",
        {
            account,
            password
        },
        function done(response) {
            //服务器响应数据
            const data = response.data,
                //服务器响应code状态码
                code = response.code,
                //服务器对响应结果描述
                msg = response.msg;
            const {setPromptTrueOrFalse} = this;
            if (code === Success.LOGIN_SUCCESS_CODE) {
                //登录成功后,设置成功提示语状态
                setPromptTrueOrFalse.bind(this)(false, false, true);
                //登录成功后,设置成功提示语
                this.setState({
                    successPrompt: Success.LOGIN_SUCCESS_MESSAGE
                });
            } else {
                //登录出现错误或者异常,设置警告提示语状态
                setPromptTrueOrFalse.bind(this)(false, true, false);
                //登录出现错误或者异常,设置警告提示语
                this.setState({
                    warnPrompt: msg
                });
            }
        }.bind(this)
    );
}

/**
 * keryi_barter注册
 * @param account
 * @param password
 */
export function register(account, password) {
    //fetch服务器请求响应集成对象
    keryiFetchConfig.fetchRequest(
        api.KERYI_REGISTER,
        "post",
        {
            account,
            password
        },
        function done(response) {
            //服务器响应数据
            const data = response.data,
                //服务器响应code状态码
                code = response.code,
                //服务器响应状态描述
                msg = response.msg;
            const {
                setPromptTrueOrFalse,
                loginChangeRegister
            } = this;
            if (code === Success.REGISTER_SUCCESS_CODE) {
                //注册成功后,设置成功提示语状态
                setPromptTrueOrFalse.bind(this)(false, false, true);
                //注册成功后,设置成功提示语
                this.setState({
                    successPrompt: Success.REGISTER_SUCCESS_MESSAGE
                });
                //FIXME
                setTimeout(function timer() {
                    //从login登录模块动画过渡到register注册模块或者从register注册模块动画过渡到login登录模块
                    loginChangeRegister.bind(this)(0, "100%");
                }.bind(this), 1500);
            } else {
                //注册出现错误或者异常,设置警告提示语状态
                setPromptTrueOrFalse.bind(this)(false, true, false);
                //注册出现错误或者异常,设置警告提示语
                this.setState({
                    warnPrompt: msg
                });
            }
        }.bind(this)
    );
}

export function descriptionToLoginAction(payload) {
    return {
        type: "DESCRIPTION_TO_LOGIN",
        payload
    }
}