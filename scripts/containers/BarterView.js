/**
 * Created by yinwk on 2017/6/13.
 */
import React from "react";
import {connect} from "react-redux";
import {Card} from "../components/Card";
import "../../stylesheets/barter.css";

class BarterView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }



    render() {
        return (
            <div className="keryi_barter_main_container">
                hello,world,my name is yinwk
            </div>
        )
    }
}

function select(state, ownProps) {
    return {}
}

export default connect(select)(BarterView);