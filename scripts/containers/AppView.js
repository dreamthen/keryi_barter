/**
 * Created by yinwk on 2017/6/13.
 */
import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router";
import {Button} from "../components/Button";
import {Modal} from "../components/Modal";
import routesMode from "../configs/routesConfigMode";
import "../../stylesheets/app.css";

class AppView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //控制Modal组件对话框显示、隐藏或者消失
            addBarterVisible: false
        };
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
     * 控制Modal组件对话框显示
     * @params e
     */
    addKeryiBarterHandler(e) {
        this.setState({
            addBarterVisible: true
        });
        //取消冒泡
        e.nativeEvent.stopImmediatePropagation();
    }

    /**
     * render渲染keryi_barter主页面头部
     * @returns {XML}
     */
    renderHeader() {
        const {addKeryiBarterHandler} = this;
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
                    <ul className="keryi_barter_nav_container">
                        {
                            routesMode.map((routeItem, routeIndex) => {
                                return (
                                    <li
                                        key={routeIndex}
                                        className="keryi_barter_navItem"
                                    >
                                        <Link
                                            to={routeItem["path"]}
                                            activeClassName="keryi_barter_navActiveItem"
                                        >
                                            <i className={routeItem["icon"]}>

                                            </i>
                                        </Link>
                                    </li>
                                )
                            })
                        }
                        <li className="keryi_barter_navItem">
                            <Button
                                size="large"
                                type="primary"
                                className="keryi_barter_button_addBarter"
                                onClick={addKeryiBarterHandler.bind(this)}
                            >
                                <i className="iconfontKeryiBarter keryiBarter-addBarter">

                                </i>
                            </Button>
                        </li>
                    </ul>
                </nav>
            </header>
        )
    }

    /**
     * render渲染keryi_barter主页面主要内容barterList列表
     * @returns {XML}
     */
    renderMain() {
        const {children} = this.props;
        return (
            <main className="keryi_barter_main">
                {children}
            </main>
        );
    }

    /**
     * keryi_barter主页面添加"以物换物"需要对话框
     * @returns {XML}
     */
    renderModal() {
        const {
            //控制Modal组件对话框隐藏并消失
            addBarterCloseHandler
        } = this;
        const {
            //控制Modal组件对话框显示、隐藏或者消失
            addBarterVisible
        } = this.state;
        return (
            <Modal
                visible={addBarterVisible}
                width={960}
                onClose={addBarterCloseHandler.bind(this)}
            >

            </Modal>
        )
    }

    /**
     * 控制Modal组件对话框隐藏并消失
     * @param e
     */
    addBarterCloseHandler(e) {
        this.setState({
            addBarterVisible: false
        });
    }


    /**
     * render渲染keryi_barter主页面主要内容barterList列表
     * @returns {XML}
     */
    render() {
        const {
            //keryi_barter主页面头部
            renderHeader,
            //keryi_barter主页面阴影遮罩
            renderShadow,
            //keryi_barter主页面主要内容barterList列表
            renderMain,
            //keryi_barter主页面添加"以物换物"需要对话框
            renderModal
        } = this;
        return (
            <div className="keryi_barter_index_page_container">
                {/*keryi_barter主页面阴影遮罩*/}
                {renderShadow.bind(this)()}
                {/*keryi_barter主页面头部*/}
                {renderHeader.bind(this)()}
                {/*keryi_barter主页面主要内容barterList列表*/}
                {renderMain.bind(this)()}
                <footer>

                </footer>
                {/*keryi_barter主页面添加"以物换物"需要对话框*/}
                {renderModal.bind(this)()}
            </div>
        )
    }
}

function select(state, ownProps) {
    return {}
}

export default connect(select)(AppView);