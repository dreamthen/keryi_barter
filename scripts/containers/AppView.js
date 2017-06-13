/**
 * Created by yinwk on 2017/6/13.
 */
import React from "react";
import {connect} from "react-redux";
import "../../stylesheets/app.css";

class AppView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    /**
     * render渲染keryi_barter主页面阴影遮罩
     * @returns {XML}
     */
    renderShadow() {
        return (
            <div className="keryi_barter_shadow">

            </div>
        )
    }

    /**
     * render渲染keryi_barter主页面头部
     * @returns {XML}
     */
    renderHeader() {
        return (
            <header className="keryi_barter_head">
                <nav className="keryi_barter_nav">
                    <figure className="keryi_barter_logo">
                        <i className="iconfontKeryiBarter keryiBarter-keryiLogo">

                        </i>
                        <sub className="keryi_barter_logo_title">
                            壳艺
                        </sub>
                    </figure>
                </nav>
            </header>
        )
    }

    /**
     * render渲染keryi_barter最终页面
     * @returns {XML}
     */
    render() {
        const {
            renderHeader,
            renderShadow
        } = this;
        const {children} = this.props;
        return (
            <div className="keryi_barter_index_page_container">
                {renderShadow.bind(this)()}
                {renderHeader.bind(this)()}
                <main>

                </main>
                <footer>

                </footer>
            </div>
        )
    }
}

function select(state, ownProps) {
    return {}
}

export default connect(select)(AppView);