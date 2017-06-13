/**
 * Created by yinwk on 2017/6/13.
 */
import React from "react";
import {connect} from "react-redux";

class BarterView extends React.Component {
    render() {
        return (
            <h1>
                Gary yin
            </h1>
        )
    }
}

function select(state, ownProps) {
    return {}
}

export default connect(select)(BarterView);