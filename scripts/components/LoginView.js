/**
 * Created by yinwk on 2017/6/1.
 */
import React from "react";
import {connect} from "react-redux";
import "../../stylesheets/login.css";

class LoginView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    /**
     * 组件开始装载
     */
    componentWillMount() {

    }

    /**
     * 组件结束装载
     */
    componentDidMount() {

    }

    render() {
        return (
            <div className="keryi_barter_login_page_container">
                <section className="keryi_barter_login">

                </section>
                <section className="keryi_barter_register">

                </section>
            </div>
        )
    }
}

function select(state, ownProps) {
    return {

    }
}

export default connect(select)(LoginView);

