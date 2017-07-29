/**
 * Created by yinwk on 2017/6/3.
 */
import keryiFetchConfig from "../configs/fetchConfig";
import api from "../configs/api";
import Success from "../prompt/successPrompt";
import loginActionsType from "./loginActionsType";

/**
 * keryi_barter登录
 * @param account
 * @param password
 */
export function login(account, password) {
    //fetch服务器请求响应集成对象
    keryiFetchConfig.fetchRequest(
        api.KERYI_LOGIN,
        "get",
        {
            account,
            password
        },
        function done(response) {
            //服务器响应数据
            const body = response.body,
                //服务器响应head头部对象
                head = response.head,
                //服务器响应code状态码
                code = head.code,
                //服务器对响应结果描述
                msg = head.message;
            const {setPromptTrueOrFalse} = this;
            if (code === Success.LOGIN_SUCCESS_CODE) {
                //登录成功后,设置成功提示语状态
                setPromptTrueOrFalse.bind(this)(false, false, true);
                //登录成功后,设置成功提示语
                this.setState({
                    successPrompt: Success.LOGIN_SUCCESS_MESSAGE
                });
                localStorage.setItem("userLoginInformation", JSON.stringify(body));
                //FIXME 这里设置一个时间控制器,登录成功后,看到成功提示语1.5s之后,跳转到keryi主页面
                setTimeout(function timer() {
                    window.location = "./index.html";
                }.bind(this), 1500);
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
            const body = response.body,
                //服务器响应head头部对象
                head = response.head,
                //服务器响应code状态码
                code = head.code,
                //服务器响应状态描述
                msg = head.message;
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
                //FIXME 这里设置一个时间控制器,注册成功后,看到成功提示语1.5s之后,从register注册模块动画过渡到login登录模块
                setTimeout(function timer() {
                    //从register注册模块动画过渡到login登录模块
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

/**
 * 将login页面副级容器距离页面最上方的长度设置为100%
 * @param payload
 * @returns {{type: *, payload: *}}
 */
export function descriptionToLoginAction(payload) {
    return {
        type: loginActionsType["DESCRIPTION_TO_LOGIN"],
        payload
    }
}

/**
 *
 * @param payload
 * @returns {{type: *, payload: *}}
 */
export function loginChangeRegisterAction(payload) {
    return {
        type: loginActionsType["LOGIN_CHANGE_REGISTER"],
        payload
    }
}

