/**
 * Created by yinwk on 2017/5/28.
 */
import React from "react";
import {render} from "react-dom";
import {Provider} from "react-redux";
import store from "./configs/storeConfig";
import LoginView from "./containers/LoginView";
import "../stylesheets/common.css";

render(<Provider store={store}>
        <LoginView />
    </Provider>,document.getElementById("keryi_barter_login_page"));