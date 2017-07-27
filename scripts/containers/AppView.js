/**
 * Created by yinwk on 2017/6/13.
 */
import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {Link} from "react-router";
import api from "../configs/api";
import {
    changeInitDistance,
    changeImageList,
    changeTagFunction,
    setTagConfig
} from "../actions/appActions";
import modalComponentConfig from "../configs/modalComponentConfig";
import {
    Area,
    Button,
    FigureCarousel,
    Modal,
    PullListDown,
    Tag
} from "../keryi";
import Upload from "rc-upload";
import uploadConfig from "../configs/uploadConfig";
import routesMode from "../configs/routesConfigMode";
import "../../stylesheets/app.css";

//Area组件编辑框类型
const componentType = ["area", "functionIcons", "carousel", "tagArea"];
//Area组件icon功能图标类型
const functionIconType = ["uploadPhoto"];
//时间处理器,用来控制处理查询资源类型
let timer;

class AppView extends React.Component {
    static propTypes = {
        //对话框标题
        title: PropTypes.string,
        //对话框资源描述
        description: PropTypes.string,
        //对话框选择资源类型
        sourceTag: PropTypes.string,
        //选择资源类型初始距离添加对话框左边的位置
        initLeft: PropTypes.number,
        //选择资源类型下拉框距离添加对话框左边的位置
        left: PropTypes.number,
        //对话框上传图片组
        imageList: PropTypes.array,
        //对话框模糊查询标签组
        pullList: PropTypes.array,
        //对话框上方标签组
        tagList: PropTypes.array
    };

    constructor(props) {
        super(props);
        this.state = {
            //控制Modal组件对话框显示、隐藏或者消失
            addBarterVisible: false,
            //控制PullListDown组件编辑框显示、隐藏或者消失
            pullListDownVisible: false,
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

    componentWillReceiveProps(nextProps) {

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
     * 根据不同的功能图标Icon类型配置来设置功能图标Icon
     * @param key
     * @param include
     * @param className
     * @param iconName
     */
    renderFunctionIcons(key, include, className, iconName) {
        const {
            //上传图片成功后的回调函数
            uploadImageSuccess
        } = this.props;
        switch (include) {
            case functionIconType[0]:
                return (
                    <Upload
                        key={key}
                        {...uploadConfig.bind(this)("file", api.UPLOAD_RESOURCE_IMAGE, {}, uploadImageSuccess.bind(this))}
                        className="keryi_barter_modal_upload"
                    >
                        <li
                            className={className}
                        >
                            <i className={iconName}>

                            </i>
                        </li>
                    </Upload>
                );
        }
    }

    /**
     * 设置对话框上方标签组
     * @param key
     * @param value
     * @param iconName
     * @returns {XML}
     */
    renderTagList(key, value, iconName) {
        return (
            <li
                key={key}
            >
                <Tag
                    type="primary"
                >
                    {"#" + value}
                </Tag>
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
     * @param pullListDown
     * @param placeholder
     * @param className
     * @param classNameShow
     * @param functionIcons
     * @returns {XML}
     */
    renderModalComponent(key, include, size, type, pullListDown, placeholder, className, classNameShow, functionIcons, iconName) {
        const {
            //根据不同的功能图标Icon类型配置来设置功能图标Icon
            renderFunctionIcons,
            //设置对话框上方标签组
            renderTagList
        } = this;
        const {
            //对话框上传图片组
            imageList,
            //对话框上方标签组
            tagList,
            //改变标题内容函数
            onChangeAreaHandler,
            //改变FigureCarousel组件图片轮播器中的图片组或者关闭FigureCarousel组件图片轮播器
            onFigureCarouselControlChangeImageList,
            //初始化选择资源类型下拉框距离添加对话框的位置
            initPullListDownPosition
        } = this.props;
        switch (include) {
            case componentType[0]:
                return (
                    <Area
                        key={key}
                        value={this.state[key]}
                        type={type ? type : "imageText"}
                        size={size}
                        pullListDown={pullListDown}
                        initPullListDownPosition={initPullListDownPosition.bind(this)}
                        placeholder={placeholder}
                        className={className ? className : ""}
                        onChange={onChangeAreaHandler.bind(this, key)}
                    />
                );
            case componentType[1]:
                return (
                    <ul
                        key={key}
                        className={classNameShow}
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
            case componentType[2]:
                return (
                    <FigureCarousel
                        key={key}
                        imageList={imageList}
                        onChange={onFigureCarouselControlChangeImageList.bind(this)}
                    />
                );
            case componentType[3]:
                return (
                    <ul
                        key={key}
                        className={classNameShow}
                    >
                        {
                            tagList && tagList.length > 0 && tagList.map(function tagger(tagItem, tagIndex) {
                                return renderTagList.bind(this)(tagItem["id"], tagItem["tag"], iconName);
                            }.bind(this))
                        }
                    </ul>
                )
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
                                modalItem["pullListDown"],
                                modalItem["placeholder"],
                                modalItem["className"],
                                modalItem["classNameShow"],
                                modalItem["functionIcons"],
                                modalItem["iconName"]
                            );
                        }.bind(this))
                    }
                </section>
            </main>
        )
    }

    /**
     * 下拉框关闭函数
     */
    closePullListDown() {
        this.setState({
            pullListDownVisible: false
        });
    }

    /**
     * render渲染对话框标签下拉框列表
     * @returns {XML}
     */
    renderModalPullList() {
        const {
            //选择资源类型下拉框距离添加对话框左方的位置
            left,
            //对话框模糊查询标签组
            pullList,
            //下拉框选择函数
            selectPullListDown
        } = this.props;
        const {
            //控制PullListDown组件编辑框显示、隐藏或者消失
            pullListDownVisible
        } = this.state;
        const {
            //下拉框关闭函数
            closePullListDown
        } = this;
        return (
            <PullListDown
                visible={pullListDownVisible}
                title="热门"
                onSelect={selectPullListDown.bind(this)}
                onClose={closePullListDown.bind(this)}
                dataSource={pullList}
                style={{
                    left
                }}
            />
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
     * keryi_barter主页面添加"以物换物"需要对话框
     * @returns {XML}
     */
    renderModal() {
        const {
            //控制Modal组件对话框隐藏并消失
            addBarterCloseHandler,
            //对话框主要内容(包括标题、描述和标签等信息)
            renderModalMain,
            //对话框标签下拉框列表
            renderModalPullList
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
                {/*对话框标签下拉框列表*/}
                {renderModalPullList.bind(this)()}
            </Modal>
        )
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

function mapStateToProps(state, ownProps) {
    return {
        ...state.appReducers
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        /**
         * 改变Area编辑框内容函数
         * @param key
         * @param e
         */
        onChangeAreaHandler(key, e) {
            const {
                //选择资源类型初始距离添加对话框左边的位置
                initLeft
            } = this.props;
            if (timer) {
                clearTimeout(timer);
            }
            let value = e.target.value;
            this.setState({
                [key]: value
            });
            if (key === modalComponentConfig[4]["key"]) {
                //FIXME 在这里设置一个时间控制器,控制在1s的时间内如果不继续输入,就显示PullListDown下拉框,这个控制器是处理重复查询资源类型的问题光标位置
                timer = setTimeout(function controlTimer() {
                    if (value.slice(1) !== "" && (value.indexOf("#") === 0)) {
                        dispatch(changeTagFunction(initLeft, value.slice(1)));
                    } else if (value !== "" && (value.indexOf("#") !== 0)) {
                        dispatch(changeTagFunction(initLeft, value));
                    }
                    //控制PullListDown组件编辑框取消消失
                    (value === "" || value.slice(1) === "") ?
                        this.setState({pullListDownVisible: false}) : this.setState({pullListDownVisible: true});
                }.bind(this), 600);
            }
        },
        /**
         * 删除FigureCarousel组件图片轮播器中的图片组图片或者关闭FigureCarousel组件图片轮播器
         * @param src
         */
        onFigureCarouselControlChangeImageList(src) {
            dispatch(changeImageList({src, type: "delete"}));
        },
        /**
         * 初始化选择资源类型下拉框距离添加对话框的位置
         */
        initPullListDownPosition(initLeft) {
            //初始化选择资源类型下拉框距离添加对话框的位置
            dispatch(changeInitDistance({initLeft}));
        },
        /**
         * 上传图片成功后的回调函数,获取资源图片,添加FigureCarousel组件图片轮播器中的图片组图片或者关闭FigureCarousel组件图片轮播器
         * @param data
         */
        uploadImageSuccess(data) {
            dispatch(changeImageList({src: api.GET_RESOURCE_IMAGE + "/" + data, type: "add"}));
        },
        /**
         * 下拉框选择函数
         */
        selectPullListDown(id, tag) {
            dispatch(setTagConfig({id, tag}));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppView);