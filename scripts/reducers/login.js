/**
 * Created by yinwk on 2017/6/1.
 */
import {combineReducers} from "redux";
//login页面reducers集成函数
import {loginReducers} from "../reducers/loginReducers";

//集成reducers
const reducers = combineReducers({
    //login页面reducers集成函数
    loginReducers
});

//导出集成的reducers
export default reducers;