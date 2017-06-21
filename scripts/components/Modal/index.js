/**
 * Created by yinwk on 2017/6/21.
 */
import React, {PropTypes} from "react";
import "./keryi_barter_modal.css";

export class Modal extends React.Component {
    static propTypes = {
        //Modal组件对话框是否弹出,必写属性
        visible: PropTypes.bool.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const {
            //Modal组件对话框是否弹出,必写属性
            visible
        } = this.props;
        return (
            <section className="keryi_barter_modal">
                <main className="keryi_barter_modal_main">

                </main>
            </section>
        )
    }
}