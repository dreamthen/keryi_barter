/**
 * Created by yinwk on 2017/6/10.
 */

/**
 * 根据服务器响应的错误或者异常status状态码来进行处理
 * @type {{}}
 */
const requestError = {
    error: function (status) {
        switch (status) {
            //401(会话过期,重新登录)跳转到login页面
            case 401:
                setTimeout(function timer() {
                    window.location.href = "./login.html";
                }, 1500);
                break;
            //404(not found)跳转到notFound页面
            case 404:
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