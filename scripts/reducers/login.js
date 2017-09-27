/**
 * Created by yinwk on 2017/6/1.
 */
import {combineReducers} from "redux";
//login页面reducers集成函数
import {loginReducers} from "./loginReducers";
//login页面loading请求加载模块集成函数
import {loadingReducers} from "./loadingReducers";

//集成reducers
const reducers = combineReducers({
    //login页面reducers集成函数
    loginReducers,
    //login页面loading请求加载模块集成函数
    loadingReducers
});

//导出集成的reducers
export default reducers;