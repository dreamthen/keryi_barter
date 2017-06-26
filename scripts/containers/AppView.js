/**
 * Created by yinwk on 2017/6/13.
 */
import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {Link} from "react-router";
import modalComponentConfig from "../configs/modalComponentConfig";
import {Button} from "../components/Button";
import {Modal} from "../components/Modal";
import {Input} from "../components/Input";
import routesMode from "../configs/routesConfigMode";
import "../../stylesheets/app.css";

//Input组件类型
const componentType = ["input", "textarea", "functionIcons"];

class AppView extends React.Component {
    static propTypes = {
        //对话框标题
        title: PropTypes.string,
        //对话框资源描述
        description: PropTypes.string
    };

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
     * 改变Input输入框内容函数
     * @param key
     * @param e
     */
    onChangeInputHandler(key, e) {
        this.setState({
            [key]: e.target.value
        });
    }

    /**
     * 资源描述聚焦事件
     * @param e
     */
    onDescriptionFocus(e) {

    }

    /**
     * 资源描述失焦事件
     * @param e
     */
    onDescriptionBlur(e) {

    }

    /**
     * 根据不同的功能图标Icon类型配置来设置功能图标Icon
     * @param key
     * @param include
     * @param className
     * @param iconName
     */
    renderFunctionIcons(key, include, className, iconName) {
        return (
            <li
                key={key}
                className={className}
            >
                <i className={iconName}>

                </i>
            </li>
        )
    }

    /**
     * 根据不同的组件类型配置来设置组件
     * @param key
     * @param include
     * @param size
     * @param type
     * @param rows
     * @param placeholder
     * @param maxLength
     * @param className
     * @param focus
     * @param blur
     * @param focusFunc
     * @param blurFunc
     * @param functionIcons
     * @returns {XML}
     */
    renderModalComponent(key, include, size, type, rows, placeholder, maxLength, className, focus, blur, focusFunc, blurFunc, functionIcons) {
        const {
            //改变标题内容函数
            onChangeInputHandler,
            renderFunctionIcons
        } = this;
        switch (include) {
            case componentType[0]:
            case componentType[1]:
                return (
                    <Input
                        key={key}
                        value={this.state[key]}
                        type={type ? type : "text"}
                        size={size}
                        rows={rows}
                        placeholder={placeholder}
                        maxLength={maxLength}
                        className={className ? className : ""}
                        onFocus={focus ? this[focusFunc] : new Function()}
                        onBlur={blur ? this[blurFunc] : new Function()}
                        onChange={onChangeInputHandler.bind(this, key)}
                    />
                );
            case componentType[2]:
                return (
                    <ul
                        key={key}
                        className={className}
                    >
                        {
                            functionIcons && functionIcons.length > 0 && functionIcons.map(function icons(iconItem, iconIndex) {
                                return renderFunctionIcons.bind(this)(
                                    iconItem["key"],
                                    iconItem["include"],
                                    iconItem["className"],
                                    iconItem["iconName"]
                                );
                            }.bind(this))
                        }
                    </ul>
                );
        }
    }

    /**
     * render渲染对话框主要内容(包括标题、描述和标签等信息)
     * @returns {XML}
     */
    renderModalMain() {
        const {
            //根据不同的组件类型配置来设置组件
            renderModalComponent
        } = this;
        return (
            <main
                className="keryi_barter_modal_innerMain"
            >
                <section className="keryi_barter_modal_mainContainer">
                    {
                        modalComponentConfig.map(function modal(modalItem, index) {
                            //根据不同的组件类型配置来设置组件
                            return renderModalComponent.bind(this)(
                                modalItem["key"],
                                modalItem["include"],
                                modalItem["size"],
                                modalItem["type"],
                                modalItem["rows"],
                                modalItem["placeholder"],
                                modalItem["maxLength"],
                                modalItem["className"],
                                modalItem["focus"],
                                modalItem["blur"],
                                modalItem["focusFunc"],
                                modalItem["blurFunc"],
                                modalItem["functionIcons"]
                            );
                        }.bind(this))
                    }
                </section>
            </main>
        )
    }

    /**
     * keryi_barter主页面添加"以物换物"需要对话框
     * @returns {XML}
     */
    renderModal() {
        const {
            //控制Modal组件对话框隐藏并消失
            addBarterCloseHandler,
            //对话框主要内容(包括标题、描述和标签等信息)
            renderModalMain
        } = this;
        const {
            //控制Modal组件对话框显示、隐藏或者消失
            addBarterVisible
        } = this.state;
        return (
            <Modal
                visible={addBarterVisible}
                closable
                width={540}
                title="1000yardStyle"
                headPortrait="/images/keryiBarter_v.jpg"
                onClose={addBarterCloseHandler.bind(this)}
            >
                {/*对话框主要内容(包括标题、描述和标签等信息)*/}
                {renderModalMain.bind(this)()}
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
    return {
        ...state.appReducers
    }
}

export default connect(select)(AppView);