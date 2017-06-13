/**
 * Created by yinwk on 2017/6/13.
 */
import React from "react";
import {connect} from "react-redux";
import "../../stylesheets/app.css";

class AppView extends React.Component {
    render() {
        return (
            <div>
                hello,world
            </div>
        )
    }
}

function select(state, ownProps) {
    return {}
}

export default connect(select)(AppView);