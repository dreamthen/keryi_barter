/**
 * author yinwk
 * createTime 2017/8/16 14:41
 * description clown laugh at you~
 */
import React from "react";
import {connect} from "react-redux";

class PersonalView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div className="keryi_barter_personal_main_container">

            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {

    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonalView);