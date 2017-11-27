/**
 * Created by yinwk on 2017/6/10.
 */
import {Alert} from "../keryi";

/**
 * 根据服务器响应的错误或者异常status状态码来进行处理
 * @type {{}}
 */
const requestError = {
    error: function (status) {
        switch (status) {
            //401(会话过期,重新登录)跳转到login页面
            case 401:
                Alert.warning("会话过期，请重新登录", 1.5, function close() {
                    Alert.destroy();
                });
                setTimeout(function timer() {
                    window.location.href = "./login.html";
                }, 1500);
                break;
            //404(not found)跳转到notFound页面
            case 404:
                Alert.loading("服务器开小差了，请稍后重试刷新页面", 1.5, function close() {
                    Alert.destroy();
                });
                break;
            case 500:
                Alert.warning("服务器异常，请重新登录", 1.5, function close() {
                    Alert.destroy();
                });
                setTimeout(function timer() {
                    window.location.href = "./login.html";
                }, 1500);
                break;
            default:
                break;
        }
    }
};

export default requestError;