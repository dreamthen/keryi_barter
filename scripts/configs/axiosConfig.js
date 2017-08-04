/**
 * Created by yinwk on 2017/6/10.
 */
import axios from "axios";
import requestError from "./requestError";

const GET_METHOD = "GET";

//axios服务器请求响应集成对象
const keryiAxiosConfig = {
    /**
     * axios服务器请求响应集成对象属性
     * @param url
     * @param method
     * @param data
     * @param done
     */
    axiosRequest: function (url, method, data, done) {
        axios({
            //服务器请求地址
            url,
            //服务器请求方法
            method,
            //服务器返回数据类型
            responseType: "json",
            //服务器响应头部文件类型
            headers: {
                "Content-Type": "application/json"
            },
            //服务器请求参数,在get请求的情况下,请求参数的属性为params;在post请求的情况下,请求参数的属性为data
            params: method.toUpperCase() === GET_METHOD ? data : {},
            data: method.toUpperCase() === GET_METHOD ? {} : data,
            //服务器设置set_cookie JSESSIONID
            withCredentials: true
        }).then(
            //响应成功后的回调函数
            done
        ).catch(
            //响应抛出错误或者异常回调函数
            this.errorHandler
        )
    },
    /**
     * 响应出现错误或者异常处理的回调函数
     * @param error
     */
    errorHandler: function (error) {
        let status = error.status;
        //根据服务器响应的错误或者异常status状态码来进行处理
        requestError.error(status);
    }
};

export default keryiAxiosConfig;