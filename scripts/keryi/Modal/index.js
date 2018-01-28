/**
 * Created by yinwk on 2017/6/21.
 */
import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import HeadPortrait from "../HeadPortrait";
import Button from "../Button";
//Modal组件对话框样式表配置
import modalConfig from "./configs/modalConfig";
import "./keryi_barter_modal.css";
//Modal组件对话框显示样式表配置
const modalVisible = "visible";
//Modal组件对话框隐藏样式表配置
const modalVisibleDisappear = "visibleDisappear";
//Modal组件对话框消失样式表配置
const modalVisibleNone = "visibleNone";
//Modal组件对话框返回提示语显示样式表配置
const modalBackDfnAppear = "backDfnAppearAnimation";
///Modal组件对话框返回提示语隐藏样式表配置
const modalBackDfnDisappear = "backDfnDisappear";
//Modal组件对话框内部副级容器样式表配置
const modalInnerMain = "modalInnerMain";
//Modal组件对话框侧面边栏区域容器样式表配置
const modalAsideMain = "modalAsideMain";
//Modal组件对话框头像默认配置
const modalDefaultHeadPortrait = "defaultHeadPortrait";
//Modal组件对话框在外部不传入props width的情况下的默认宽度
const defaultWidth = 520;
//Modal组件对话框在外部不传入props asideWidth的情况下的默认宽度
const defaultAsideWidth = 200;
//Modal组件对话框footer底部区域确定按钮默认文本
const defaultOkText = "确定";
//Modal组件对话框footer底部区域取消按钮默认文本
const defaultCloseText = "取消";

/**
 * keryi_barter Modal对话框组件
 */
class Modal extends React.Component {
    static propTypes = {
        //Modal组件对话框是否弹出,必写属性
        visible: PropTypes.bool.isRequired,
        //Modal组件对话框宽度
        width: PropTypes.number,
        //Modal组件对话框HeadPortrait组件头像地址
        headPortrait: PropTypes.string,
        //Modal组件对话框HeadPortrait组件头像是否显示
        portrait: PropTypes.bool,
        //Modal组件对话框用户名
        title: PropTypes.string,
        //Modal组件对话框样式表配置
        className: PropTypes.string,
        //Modal组件对话框是否显示右上角关闭按钮
        closable: PropTypes.bool,
        //Modal组件对话框提交发布回调函数
        onOk: PropTypes.func,
        //Modal组件对话框关闭回调函数
        onClose: PropTypes.func,
        //Modal组件对话框侧面边栏区域列表滚动回调函数
        onAsideScroll: PropTypes.func,
        //Modal组件对话框侧面边栏区域列表选择回调函数
        onAsideSelect: PropTypes.func,
        //Modal组件对话框返回(在这里也就是返回到我的资源)回调函数
        onBack: PropTypes.func,
        //Modal组件对话框返回提示语
        backDfn: PropTypes.string,
        //Modal组件对话框是否显示aside侧面边栏区域
        aside: PropTypes.bool,
        //Modal组件对话框aside侧面边栏区域样式表配置
        asideClassName: PropTypes.string,
        //Modal组件对话框aside侧面边栏区域宽度
        asideWidth: PropTypes.number,
        //Modal组件对话框aside侧面边栏区域标题
        asideTitle: PropTypes.string,
        //Modal组件对话框aside侧面边栏区域列表
        asideDataSource: PropTypes.array,
        //Modal组件对话框aside侧面边栏区域列表统计Mode配置
        asideStatisticsConfig: PropTypes.array,
        //Modal组件对话框是否显示footer底部区域(包括取消按钮和确定按钮)
        footer: PropTypes.bool,
        //Modal组件对话框是否显示footer底部区域确定按钮
        showOk: PropTypes.bool,
        //Modal组件对话框footer底部区域确定按钮文本
        okText: PropTypes.string,
        //Modal组件对话框是否显示footer底部区域取消按钮
        showClose: PropTypes.bool,
        //Modal组件对话框footer底部区域取消按钮文本
        closeText: PropTypes.string
    };

    constructor(props) {
        super(props);
        this.state = {
            //Modal组件对话框隐藏或者消失判断标志位
            modalVisible: false,
            //Modal组件对话框显示或者隐藏判断标志位
            modalAppear: false,
            //Modal组件对话框返回提示语消失或者隐藏判断标志位
            backDfnAppear: false,
            //Modal组件对话框返回提示语显示或者因此判断标志位
            backDfnAppearAnimation: false
        }
    }

    /**
     * 组件开始装载
     */
    componentWillMount() {

    }

    componentWillReceiveProps(nextProps) {
        //当外部传入Modal组件对话框是否弹出属性为true时,Modal组件对话框先从消失变为隐藏,然后时间控制器控制在Modal组件对话框取消消失100ms之后从隐藏变为显示
        (this.props.visible !== nextProps.visible && nextProps.visible) &&
        this.setState({
            modalVisible: nextProps.visible
        }, () => {
            //FIXME 在这里设置一个时间控制器,Modal组件对话框取消消失100ms之后,从隐藏到显示的过程
            setTimeout(function timer() {
                this.setState({
                    modalAppear: nextProps.visible
                });
            }.bind(this), 100);
        });
        //当外部传入Modal组件对话框是否弹出属性为false时,Modal组件对话框先从显示变为隐藏,然后时间控制器控制在Modal组件对话框从显示到隐藏这个过程动画1s之后,将Modal组件对话框消失
        (this.props.visible !== nextProps.visible && !nextProps.visible) &&
        this.setState({
            modalAppear: nextProps.visible
        }, () => {
            //FIXME 在这里设置一个时间控制器,Modal组件对话框从显示到隐藏这个过程动画1s之后,将Modal组件对话框消失
            setTimeout(function timer() {
                this.setState({
                    modalVisible: nextProps.visible
                });
            }.bind(this), 1000);
        });
    }

    componentDidUpdate(prevState) {
        //渲染Modal组件对话框
        this._render.bind(this)();
    }

    /**
     * 组件结束装载
     */
    componentDidMount() {
        //创建Modal组件对话框DIV容器
        this.modalDiv = document.createElement("div");
        //添加到body标签中
        document.body.appendChild(this.modalDiv);
        //渲染Modal组件对话框
        this._render.bind(this)();
    }

    /**
     * 组件开始卸载
     */
    componentWillUnmount() {
        document.body.removeChild(this.modalDiv);
    }

    /**
     * 根据state modalVisible来设置Modal组件对话框className样式表
     * @returns {string}
     */
    visibleToClass() {
        const {
            //Modal组件对话框隐藏或者消失判断标志位
            modalVisible
        } = this.state;
        //在Modal组件对话框隐藏或者消失判断标志位为true时,Modal组件对话框用modalConfig中的指定className样式表隐藏;在Modal组件对话框隐藏或者消失判断标志位为false时,Modal对话框className样式表消失
        return modalVisible ? "" : " " + modalConfig[modalVisibleNone];
    }

    /**
     * 根据state modalAppear来设置Modal组件对话框className样式表
     * @returns {*}
     */
    appearToClass() {
        const {
            //Modal组件对话框显示或者隐藏判断标志位
            modalAppear
        } = this.state;
        //在Modal组件对话框显示或者隐藏判断标志位为true时,Modal组件对话框用modalConfig中的指定className样式表显示;在Modal组件对话框隐藏或者消失判断标志位为false时,Modal对话框className样式表隐藏
        return modalAppear ? modalConfig[modalVisible] : modalConfig[modalVisibleDisappear];
    }

    /**
     * 根据props className来设置Modal组件对话框内部副级容器的className样式表
     * @returns {string}
     */
    outsideClassToClass() {
        const {
            //Modal组件对话框样式表配置
            className
        } = this.props;
        return className ? modalConfig[modalInnerMain] + " " + className : modalConfig[modalInnerMain];
    }

    /**
     * 根据props asideClassName来设置Modal组件对话框侧面边栏区域容器的className样式表
     * @returns {string}
     */
    outAsideClassToClass() {
        const {
            //Modal组件对话框aside侧面区域样式表配置
            asideClassName
        } = this.props;
        return asideClassName ? modalConfig[modalAsideMain] + " " + asideClassName : modalConfig[modalAsideMain];
    }

    /**
     * 根据外部传入的props onOk来设置Modal组件对话框提交发布
     * @param e
     */
    onOkHandler(e) {
        const {
            //Modal组件对话框提交发布回调函数
            onOk
        } = this.props;
        //执行提交发布回调函数
        onOk();
        //取消冒泡
        e.nativeEvent.stopImmediatePropagation();
    }

    /**
     * 根据外部传入的props onClose来设置Modal组件对话框关闭
     * @param e
     */
    onCloseHandler(e) {
        const {
            //Modal组件对话框关闭回调函数
            onClose
        } = this.props;
        const {
            //对话框返回(在这里也就是返回到我的资源)
            onBackHandler
        } = this;
        //对话框返回(在这里也就是返回到我的资源)
        onBackHandler.bind(this)(e);
        //执行关闭回调函数
        onClose();
        //取消冒泡
        e.nativeEvent.stopImmediatePropagation();
    }

    /**
     * render渲染对话框头像
     * @returns {XML}
     */
    renderModalHeadPortrait() {
        const {
            //Modal组件对话框HeadPortrait组件头像地址
            headPortrait
        } = this.props;
        return (
            <header
                className="keryi_barter_modal_avatarContainer"
            >
                <div className="keryi_barter_modal_avatarShadow">

                </div>
                <main className="keryi_barter_modal_avatar">
                    <HeadPortrait
                        borderJudgement={true}
                        headPortrait={headPortrait ? headPortrait : modalConfig[modalDefaultHeadPortrait]}
                    />
                </main>
            </header>
        )
    }

    /**
     * 根据state backDfnAppearAnimation来设置Modal组件对话框返回提示语的className样式表
     */
    backDfnToClass() {
        const {
            //Modal组件对话框返回提示语显示或者因此判断标志位
            backDfnAppearAnimation
        } = this.state;
        return backDfnAppearAnimation ? modalConfig[modalBackDfnAppear] : modalConfig[modalBackDfnDisappear];
    }

    /**
     * 对话框返回(在这里也就是返回到我的资源)
     */
    onBackHandler(e) {
        const {
            //对话框返回(在这里也就是返回到我的资源)回调函数
            onBack
        } = this.props;
        this.setState({
            backDfnAppearAnimation: false
        }, function backDfner() {
            //FIXME 这里设置一个时间控制器,Modal组件对话框返回提示语从显示到隐藏这个过程动画500ms之后,将Modal组件对话框返回提示语消失
            setTimeout(function timer() {
                this.setState({
                    backDfnAppear: false
                })
            }.bind(this), 500);
        }.bind(this));
        onBack && onBack(e);
    }

    /**
     * render渲染对话框header头部(包括用户名等信息)
     * @returns {XML}
     */
    renderModalHeader() {
        const {
            //对话框关闭函数
            onCloseHandler,
            //根据state backDfnAppearAnimation来设置Modal组件对话框返回提示语的className样式表
            backDfnToClass,
            //对话框返回(在这里也就是返回到我的资源)
            onBackHandler
        } = this;
        const {
            //对话框用户名
            title,
            //对话框是否显示右上角关闭按钮
            closable,
            //对话框返回提示语
            backDfn,
            //对话框是否显示aside侧面边栏区域
            aside
        } = this.props;
        const {
            //对话框返回提示语显示或者隐藏判断标志位
            backDfnAppear
        } = this.state;
        return (
            <header className="keryi_barter_modal_head">
                <div className="keryi_barter_modal_head_title">
                    {title}
                </div>
                {
                    (!aside && backDfnAppear) && <div
                        onClick={onBackHandler.bind(this)}
                        className={backDfnToClass.bind(this)()}
                    >
                        <i className="iconfontKeryiBarter keryiBarter-back">

                        </i>
                        {backDfn}
                    </div>
                }
                {
                    closable && <i
                        className="iconfontKeryiBarter keryiBarter-close"
                        onClick={onCloseHandler.bind(this)}
                    >
                    </i>
                }
            </header>
        )
    }

    /**
     * render渲染对话框footer底部(包括关闭按钮和发布按钮)
     * @returns {XML}
     */
    renderModalFooter() {
        const {
            //对话框提交发布
            onOkHandler,
            //对话框关闭
            onCloseHandler
        } = this;
        const {
            //对话框footer底部区域确定按钮文本
            okText,
            //对话框footer底部区域取消按钮文本
            closeText,
            //对话框是否显示footer底部区域确定按钮
            showOk,
            //对话框是否显示footer底部区域取消按钮
            showClose
        } = this.props;
        return (
            <footer className="keryi_barter_modal_foot">
                {
                    showClose && <section className="keryi_barter_modal_close">
                        <Button
                            type="default"
                            className="keryi_barter_button_close"
                            onClick={onCloseHandler.bind(this)}
                        >
                            {closeText ? closeText : defaultCloseText}
                        </Button>
                    </section>
                }
                {
                    showOk && <section className="keryi_barter_modal_publish">
                        <Button
                            type="primary"
                            className="keryi_barter_button_publish"
                            onClick={onOkHandler.bind(this)}
                        >
                            {okText ? okText : defaultOkText}
                        </Button>
                    </section>
                }
            </footer>
        )
    }

    /**
     * render渲染对话框侧面边栏区域列表内容头像部分
     * @param keryiModalDataSource
     * @returns {XML}
     */
    renderAsideDataSourceHead(keryiModalDataSource) {
        return (
            <section className="keryi_barter_modal_asideAvatar">
                <HeadPortrait
                    headPortrait={keryiModalDataSource["personalAvatar"] ? keryiModalDataSource["personalAvatar"] : "/images/keryiBarter_v.png"}
                />
            </section>
        )
    }

    /**
     * render渲染对话框侧面边栏区域列表内容主体部分
     * @param keryiModalDataSource
     * @returns {XML}
     */
    renderAsideDataSourceMain(keryiModalDataSource) {
        const {
            //Modal组件对话框aside侧面边栏区域列表统计Mode配置
            asideStatisticsConfig
        } = this.props;
        return (
            <section className="keryi_barter_modal_asideSourceMain">
                <header className="keryi_barter_modal_asideTitle">
                    <h3 title={keryiModalDataSource["title"]}>
                        {keryiModalDataSource["title"]}
                    </h3>
                </header>
                <main className="keryi_barter_modal_asideIntroduce">
                    <p title={keryiModalDataSource["intro"]}>
                        {keryiModalDataSource["intro"]}
                    </p>
                </main>
                <footer className="keryi_barter_modal_asideStatistics">
                    <ul className="keryi_barter_modal_asideStatistics_ulList">
                        {
                            asideStatisticsConfig.map(function statisticser(statisticsItem, statisticsIndex) {
                                return (
                                    <li
                                        key={statisticsIndex}
                                        title={keryiModalDataSource[statisticsItem["key"]] + " " + statisticsItem["title"]}
                                    >
                                        <i className={statisticsItem["className"]}>

                                        </i>
                                        <dfn className="keryi_barter_modal_asideStatistics_description">
                                            {keryiModalDataSource[statisticsItem["key"]] + " " + statisticsItem["title"]}
                                        </dfn>
                                    </li>
                                )
                            }.bind(this))
                        }
                    </ul>
                </footer>
            </section>
        )
    }

    /**
     * 选择Modal组件对话框侧面边栏区域列表
     */
    onAsideSelectHandler(dataSource, e) {
        const {
            //Modal组件对话框侧面边栏区域列表选择回调函数
            onAsideSelect
        } = this.props;
        this.setState({
            backDfnAppear: true
        }, function backDfner() {
            //FIXME 在这里设置一个时间控制器,Modal组件对话框返回提示语从消失到隐藏100ms之后,将Modal组件对话框返回提示语显示
            setTimeout(function timer(e) {
                this.setState({
                    backDfnAppearAnimation: true
                })
            }.bind(this), 100);
        }.bind(this));
        onAsideSelect(dataSource, e);
    }

    /**
     * render渲染对话框侧面边栏区域列表内容
     * @returns {XML}
     */
    renderModalAsideMain() {
        const {
            //Modal组件对话框aside侧面边栏区域列表
            asideDataSource
        } = this.props;
        const {
            //render渲染对话框侧面边栏区域列表内容头像部分
            renderAsideDataSourceHead,
            //render渲染对话框侧面边栏区域列表内容主体部分
            renderAsideDataSourceMain,
            //选择Modal组件对话框侧面边栏区域列表
            onAsideSelectHandler
        } = this;
        return (
            <ul className="keryi_barter_modal_asideList">
                {
                    (asideDataSource && asideDataSource.length > 0) && asideDataSource.map(function asideDataer(dataItem, dataIndex) {
                        return (
                            <li
                                key={dataIndex}
                                className="keryi_barter_modal_asideItem"
                                onClick={onAsideSelectHandler.bind(this, dataItem)}
                            >
                                {/*render渲染对话框侧面边栏区域列表内容头像部分*/}
                                {renderAsideDataSourceHead.bind(this)(dataItem)}
                                {/*render渲染对话框侧面边栏区域列表内容主体部分*/}
                                {renderAsideDataSourceMain.bind(this)(dataItem)}
                            </li>
                        )
                    }.bind(this))
                }
            </ul>
        )
    }

    /**
     *  render渲染Modal组件对话框
     */
    _render() {
        const {
            //根据外部传入的props visible来设置Modal组件对话框className样式表
            visibleToClass,
            //根据state modalAppear来设置Modal组件对话框className样式表
            appearToClass,
            //对话框关闭函数
            onCloseHandler,
            //根据外部传入的props onClose来设置Modal组件对话框关闭
            outsideClassToClass,
            //对话框header头部(包括用户名等信息)
            renderModalHeader,
            //对话框头像
            renderModalHeadPortrait,
            //对话框footer底部(包括关闭按钮和发布按钮)
            renderModalFooter,
            //对话框侧面边栏区域列表内容
            renderModalAsideMain,
            //根据props asideClassName来设置Modal组件对话框侧面边栏区域容器的className样式表
            outAsideClassToClass
        } = this;
        const {
            //Modal组件对话框宽度
            width,
            //Modal组件对话框是否显示footer底部区域(包括关闭按钮和发布按钮)
            footer,
            //Modal组件主要内容(外部传入)
            children,
            //Modal组件对话框HeadPortrait组件头像是否显示
            portrait,
            //Modal组件对话框是否显示aside侧面边栏区域
            aside,
            //Modal组件对话框aside侧面边栏区域宽度
            asideWidth,
            //Modal组件对话框aside侧面边栏区域标题
            asideTitle,
            //Modal组件对话框侧面边栏区域列表滚动回调函数
            onAsideScroll
        } = this.props;
        ReactDOM.render(
            <section
                tabIndex="-1"
                className={appearToClass.bind(this)() + visibleToClass.bind(this)()}
            >
                <div
                    className="keryi_barter_modal_shadow"
                    onClick={onCloseHandler.bind(this)}
                >

                </div>
                {/*对话框副级容器*/}
                <section className="keryi_barter_modalContainer">
                    {/*对话框头像*/}
                    {portrait && renderModalHeadPortrait.bind(this)()}
                    <main
                        className={outsideClassToClass.bind(this)()}
                        style={{width: width ? width : defaultWidth}}
                    >
                        <article
                            className="keryi_barter_modal_article"
                        >
                            {/*对话框header头部(包括用户名等信息)*/}
                            {renderModalHeader.bind(this)()}
                            {/*对话框主要内容(外部传入)*/}
                            {children}
                            {/*对话框footer底部(包括关闭按钮和发布按钮)*/}
                            {
                                footer && renderModalFooter.bind(this)()
                            }
                        </article>
                    </main>
                    {
                        aside && <aside
                            onScroll={(e) => {
                                const asideContainer = e.target,
                                    asideContent = this._asideContent,
                                    beforeScrollTop = asideContainer.scrollTop,
                                    asideScreenHeight = asideContainer.clientHeight,
                                    asideHeight = asideContent.clientHeight;
                                onAsideScroll(asideHeight, asideScreenHeight, beforeScrollTop);
                            }}
                            className={outAsideClassToClass.bind(this)()}
                            style={{width: asideWidth ? asideWidth : defaultAsideWidth}}
                        >
                            <header className="keryi_barter_modal_aside_head">
                                {asideTitle}
                            </header>
                            <main
                                ref={asideContent => this._asideContent = asideContent}
                                className="keryi_barter_modal_aside_main"
                            >
                                {/*对话框侧面边栏区域列表内容*/}
                                {renderModalAsideMain.bind(this)()}
                            </main>
                        </aside>
                    }
                </section>
            </section>, this.modalDiv
        );
    }

    render() {
        return null;
    }
}

//导出keryi_barter Modal对话框组件
export default Modal;