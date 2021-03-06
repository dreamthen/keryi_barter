/**
 * Created by yinwk on 2017/6/3.
 */
import keryiAxiosConfig from "../configs/axiosConfig";
import api from "../configs/api";
import Success from "../prompt/successPrompt";
import loginActionsType from "./loginActionsType";

/**
 * keryi_barter登录
 * @param account
 * @param password
 */
export function login(account, password) {
    //axios服务器请求响应集成对象
    keryiAxiosConfig.axiosRequest(
        api.KERYI_LOGIN,
        "get",
        {
            account,
            password
        },
        function done(response) {
            //服务器响应body主体对象
            let body = response;
            const {setPromptTrueOrFalse} = this;
            //登录成功后,设置成功提示语状态
            setPromptTrueOrFalse.bind(this)(false, false, true);
            //登录成功后,设置成功提示语
            this.setState({
                successPrompt: Success.LOGIN_SUCCESS_MESSAGE
            });
            localStorage.setItem("userLoginInformation", JSON.stringify(body));
            //FIXME 这里设置一个时间控制器,登录成功后,看到成功提示语1.5s之后,跳转到keryi主页面
            setTimeout(function timer() {
                window.location.href = "/";
            }.bind(this), 1500);
        }.bind(this),
        function error(response) {
            //服务器响应数据
            let data = response.data,
                //服务器响应head头部对象
                head = data.head,
                //服务器对响应结果描述
                msg = head.message;
            const {setPromptTrueOrFalse} = this;
            //登录出现错误或者异常,设置警告提示语状态
            setPromptTrueOrFalse.bind(this)(false, true, false);
            //登录出现错误或者异常,设置警告提示语
            this.setState({
                warnPrompt: msg
            });
        }.bind(this)
    );
}

/**
 * keryi_barter注册
 * @param account
 * @param password
 */
export function register(account, password) {
    //axios服务器请求响应集成对象
    keryiAxiosConfig.axiosRequest(
        api.KERYI_REGISTER,
        "post",
        {
            account,
            password
        },
        function done(response) {
            //服务器响应body主体对象
            let body = response;
            const {
                setPromptTrueOrFalse,
                loginChangeRegister
            } = this;
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
        }.bind(this),
        function error(response) {
            //服务器响应数据
            let data = response.data,
                //服务器响应head头部对象
                head = data.head,
                //服务器对响应结果描述
                msg = head.message;
            const {
                setPromptTrueOrFalse
            } = this;
            //注册出现错误或者异常,设置警告提示语状态
            setPromptTrueOrFalse.bind(this)(false, true, false);
            //注册出现错误或者异常,设置警告提示语
            this.setState({
                warnPrompt: msg
            });
        }.bind(this)
    );
}

/**
 * keryi_barter用户退出控制器
 */
function* logOutGenerator() {
    yield this.setState({
        viewShadowPersonalBarterVisible: false
    });
    yield localStorage.removeItem("userLoginInformation");
    yield setTimeout(() => {
        window.location.href = "./login.html";
    }, 1500);
}

/**
 * keryi_barter用户退出
 */
export function logOut() {
    keryiAxiosConfig.axiosRequest(
        api.KERYI_LOGOUT,
        "delete",
        {},
        function done(response) {
            let body = response;
            let logOutGeneratorConstructor = logOutGenerator.bind(this)();
            let next = logOutGeneratorConstructor.next();
            while (!next.done) {
                next = logOutGeneratorConstructor.next();
            }
        }.bind(this),
        function error(response) {
            let data = response.data,
                head = data.head,
                msg = head.message;
        }.bind(this)
    );
}

/**
 * 将login页面副级容器距离页面最上方的长度设置为100% Action
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
 * 将login登录模块的内容距离屏幕最左边设置为-100%;login注册模块的内容距离屏幕最左边设置为0 Action
 * @param payload
 * @returns {{type: *, payload: *}}
 */
export function loginChangeRegisterAction(payload) {
    return {
        type: loginActionsType["LOGIN_CHANGE_REGISTER"],
        payload
    }
}

/**
 * 控制login页面请求加载Loading模块显示Action
 * @returns {{type: *}}
 */
export function openLoadingAction() {
    return {
        type: loginActionsType["OPEN_LOADING"]
    }
}

/**
 * 控制login页面请求加载Loading模块消失Action
 * @returns {{type: *}}
 */
export function closeLoadingAction() {
    return {
        type: loginActionsType["CLOSE_LOADING"]
    }
}

