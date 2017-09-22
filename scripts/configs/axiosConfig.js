/**
 * Created by yinwk on 2017/6/10.
 */
import axios from "axios";
import Success from "../prompt/successPrompt";
import requestError from "./requestError";

const GET_METHOD = "GET";

//axios服务器请求响应集成对象
const keryiAxiosConfig = {
    /**
     * axios服务器请求响应集成对象请求配置
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
            done
        ).catch(
            //响应抛出错误或者异常回调函数
            this.errorHandler
        );
    },
    /**
     * axios服务器请求响应集成对象拦截器配置
     */
    interceptorsHandler: function () {
        axios.interceptors.response.use(function (response) {
            let data = response.data,
                status = response.status,
                head = data.head,
                body = data.body,
                code = head.code;
            if (code === Success.SUCCESS_CODE) {
                return body;
            }
        }, function () {

        });
    },
    /**
     * 响应后台出现错误(500,404)的回调函数
     * @param error
     */
    errorHandler: function (error) {
        console.error(error);
    }
};

//执行axios服务器请求响应集成对象拦截器
keryiAxiosConfig.interceptorsHandler();

export default keryiAxiosConfig;