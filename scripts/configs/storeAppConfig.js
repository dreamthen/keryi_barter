/**
 * Created by yinwk on 2017/6/13.
 */
import {createStore, applyMiddleware, compose} from "redux";
import thunkMiddleware from "redux-thunk";
import loggerMiddleware from "redux-logger";
import reducers from "../reducers/app";

const develop = "develop";

let middleware = [];
//通过DefinePlugin插件添加的功能标识来区分"开发环境"或者"生产环境"该添加或者删除的代码
if (process.env.NODE_ENV === develop) {
    middleware = [
        thunkMiddleware,
        loggerMiddleware
    ]
} else {
    middleware = [
        thunkMiddleware
    ]
}
//创建react-redux store,将reducers放进createStore中,生成react-redux store
const store = createStore(reducers, compose(
    applyMiddleware(...middleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
));

export default store;