/**
 * Created by yinwk on 2017/6/1.
 */
import {createStore} from "redux";
import reducers from "../reducers/login";

//创建react-redux store,将reducers放进createStore中,生成react-redux store
const store = createStore(reducers);
export default store;