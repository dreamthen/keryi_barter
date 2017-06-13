/**
 * Created by yinwk on 2017/6/13.
 */
import React from "react";
import {connect} from "react-redux";
import "../../stylesheets/app.css";

class AppView extends React.Component {
    render() {
        const {children} = this.props;
        return (
            <div>
                hello,world
                {children}
            </div>
        )
    }
}

function select(state, ownProps) {
    return {}
}

export default connect(select)(AppView);