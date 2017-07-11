/**
 * Created by yinwk on 2017/6/13.
 */
import {combineReducers} from "redux";
import {appReducers} from "./appReducers";
import {barterReducers} from "./barterReducers";

//集成reducers
const reducers = combineReducers({
    appReducers,
    barterReducers
});

//导出集成的reducers
export default reducers;