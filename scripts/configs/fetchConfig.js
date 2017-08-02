/**
 * Created by yinwk on 2017/6/10.
 */
import "whatwg-fetch";
import requestError from "./requestError";

const GET_METHOD = "GET";

//fetch服务器请求响应集成对象
const keryiFetchConfig = {
    /**
     * fetch服务器请求响应集成对象属性
     * @param url
     * @param method
     * @param data
     * @param done
     */
    fetchRequest: function (url, method, data, done) {
        fetch(
            //服务器请求地址,在get请求的情况下,用URLSearchParams来处理url请求地址添加参数;在post请求的情况下,直接请求url请求地址
            method.toUpperCase() === GET_METHOD ? this.urlSearchParamsConfig(url, data) : url,
            function options() {
                return {
                    //服务器请求方法
                    method,
                    //服务器响应头部文件类型
                    headers: {
                        "Content-Type": "application/json"
                    },
                    //服务器请求参数,在get请求的情况下,body直接为一个空对象;在post请求的情况下,要传递JSON对象,用JSON.stringify处理转化为JSON对象
                    body: method.toUpperCase() === GET_METHOD ? {} : JSON.stringify(data),
                    //服务器请求传输JESSIONCOOKIE类型,"same-origin"指在同域情况下可以传入此JESSIONCOOKIE
                    credentials: "include"
                }
            }()).then(
            //检查响应返回的状态码,如果状态码200成功状态码到300重定向状态码之间的时候,返回此响应;如果状态码遇到303重定向,401会话过期,404 not found,500服务器错误时,抛出此响应
            this.checkStatus
        ).then(
            //响应返回JSON格式数据
            this.responseJSON
        ).then(
            //响应成功后的回调函数
            done
        ).catch(
            //响应抛出错误或者异常回调函数
            this.errorHandler
        );
    },

    /**
     * 在get请求的情况下,用URLSearchParams来处理url请求地址添加参数
     * @param url
     * @param data
     * @returns {string}
     */
    urlSearchParamsConfig: function (url, data) {
        //URLSearchParams可以整合传递过来的对象转化为get请求参数,
        let params = new URLSearchParams();
        //利用for...in将对象的属性和属性值整合到URLSearchParams里面,转化为key=value&keyAnother=valueAnother
        for (let dataProps in data) {
            params.append(dataProps, data[dataProps]);
        }
        return url + "?" + params.toString();
    },
    /**
     * 检查响应返回的状态码,如果状态码200成功状态码到300重定向状态码之间的时候,返回此响应;如果状态码遇到303重定向,401会话过期,404 not found,500服务器错误时,抛出此响应
     * @param response
     * @returns {*}
     */
    checkStatus: function (response) {
        //获取到响应返回的状态码
        let status = response.status;
        //在200成功状态码到300重定向状态码之间的时候,返回此响应
        if (status >= 200 && status < 300) {
            return response;
            //如果状态码遇到303重定向,401会话过期,404 not found,500服务器错误时,抛出此响应
        } else {
            throw response;
        }
    },
    /**
     * 响应返回JSON格式数据
     * @param response
     * @returns {*}
     */
    responseJSON(response) {
        //返回JSON格式数据
        return response.json();
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

export default keryiFetchConfig;