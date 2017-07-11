/**
 * Created by yinwk on 2017/6/13.
 */
import {createStore, applyMiddleware, compose} from "redux";
import thunkMiddleware from "redux-thunk";
import reducers from "../reducers/app";

//
let middleware = [
    thunkMiddleware
];
//创建react-redux store,将reducers放进createStore中,生成react-redux store
const store = createStore(reducers, compose(
    applyMiddleware(...middleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
));
export default store;