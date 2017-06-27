/**
 * Created by yinwk on 2017/6/13.
 */
import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {Link} from "react-router";
import modalComponentConfig from "../configs/modalComponentConfig";
import {Button} from "../components/Button";
import {Modal} from "../components/Modal";
import {Area} from "../components/Area";
import routesMode from "../configs/routesConfigMode";
import "../../stylesheets/app.css";

//Input组件类型
const componentType = ["area", "functionIcons"];

class AppView extends React.Component {
    static propTypes = {
        //对话框标题
        title: PropTypes.string,
        //对话框资源描述
        description: PropTypes.string,
        //对话框选择资源类型
        sourceTag: PropTypes.string
    };

    constructor(props) {
        super(props);
        this.state = {
            //控制Modal组件对话框显示、隐藏或者消失
            addBarterVisible: false,
            //控制功能图标位置显示或者消失
            focusFunctionIconsVisibility: false,
            //控制功能图标显示或者隐藏
            focusShowFunctionIcons: false
        };
    }

    /**
     * 组件开始装载
     */
    componentWillMount() {
        //将redux props转化为state
        const {mapPropsToState} = this;
        mapPropsToState.bind(this)();
    }

    /**
     * 将redux props转化为state
     */
    mapPropsToState() {
        const {props} = this;
        this.setState({
            ...props
        });
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
        //控制功能图标位置显示
        this.setState({
            focusFunctionIconsVisibility: true
        }, function focus() {
            //FIXME 这里设置一个时间控制器,在功能图标位置显示100ms后,将功能图标从隐藏转变为显示
            setTimeout(function timer() {
                this.setState({
                    focusShowFunctionIcons: true
                });
            }.bind(this), 100);
        }.bind(this));
    }

    /**
     * 资源描述失焦事件
     * @param e
     */
    onDescriptionBlur(e) {
        //将功能图标从显示转变为隐藏
        this.setState({
            focusShowFunctionIcons: false
        }, function blur() {
            //FIXME 这里设置一个时间控制器,在功能图标隐藏1s后,将功能图标位置消失
            setTimeout(function timer() {
                this.setState({
                    focusFunctionIconsVisibility: false
                });
            }.bind(this), 500);
        }.bind(this));
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
     * @param classNameNone
     * @param classNameShow
     * @param focus
     * @param blur
     * @param focusFunc
     * @param blurFunc
     * @param functionIcons
     * @returns {XML}
     */
    renderModalComponent(key, include, size, type, rows, placeholder, maxLength, className, classNameNone, classNameShow, focus, blur, focusFunc, blurFunc, functionIcons) {
        const {
            //改变标题内容函数
            onChangeInputHandler,
            renderFunctionIcons
        } = this;
        const {
            //控制功能图标位置显示或者消失
            focusFunctionIconsVisibility,
            //控制功能图标显示或者隐藏
            focusShowFunctionIcons
        } = this.state;
        //资源描述聚焦事件
        focusFunc = this[focusFunc];
        //资源描述失焦事件
        blurFunc = this[blurFunc];
        switch (include) {
            case componentType[0]:
                return (
                    <Area
                        key={key}
                        value={this.state[key]}
                        type={type ? type : "imageText"}
                        size={size}
                        rows={rows}
                        placeholder={placeholder}
                        maxLength={maxLength}
                        className={className ? className : ""}
                        onFocus={focus ? focusFunc.bind(this) : new Function()}
                        onBlur={blur ? blurFunc.bind(this) : new Function()}
                        onChange={onChangeInputHandler.bind(this, key)}
                    />
                );
            case componentType[1]:
                return (
                    <ul
                        key={key}
                        className={focusShowFunctionIcons ? classNameShow : focusFunctionIconsVisibility ? className : classNameNone}
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
                                modalItem["classNameNone"],
                                modalItem["classNameShow"],
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
                footer
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