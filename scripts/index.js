/**
 * Created by yinwk on 2017/5/28.
 */
import "babel-polyfill";
import React from "react";
import {Provider} from "react-redux";
import {Router, browserHistory} from "react-router";
import {render} from "react-dom";
import store from "./configs/storeAppConfig";
import routes from "./configs/routesConfig";
import "../stylesheets/common.css";
import "../stylesheets/webkitScrollBar.css";

render(
    <Provider store={store}>
        <Router history={browserHistory}>
            {routes}
        </Router>
    </Provider>, document.getElementById("keryi_barter_index_page")
);

