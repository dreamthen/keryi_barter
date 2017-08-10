/**
 * Created by yinwk on 2017/6/21.
 */
import React, {PropTypes} from "react";
import ReactDOM from "react-dom";
import HeadPortrait from "../HeadPortrait";
import Button from "../Button";
import modalConfig from "./configs/modalConfig";
import "./keryi_barter_modal.css";
//Modal组件对话框显示样式表配置
const modalVisible = "visible";
//Modal组件对话框隐藏样式表配置
const modalVisibleDisappear = "visibleDisappear";
//Modal组件对话框消失样式表配置
const modalVisibleNone = "visibleNone";
//Modal组件对话框内部副级容器样式表配置
const modalInnerMain = "modalInnerMain";
//Modal组件对话框头像默认配置
const modalDefaultHeadPortrait = "defaultHeadPortrait";
//Modal组件对话框在外部不传入props width的情况下的默认宽度
const defaultWidth = 520;

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
        //Modal组件对话框是否显示footer底部区域(包括关闭按钮和发布按钮)
        footer: PropTypes.bool
    };

    constructor(props) {
        super(props);
        this.state = {
            //Modal组件对话框显示或者隐藏判断标志位
            modalAppear: false
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.visible !== nextProps.visible) {
            //FIXME 在这里设置一个时间控制器,Modal组件对话框取消消失100ms之后,从隐藏到显示的过程
            setTimeout(function timer() {
                this.setState({
                    modalAppear: nextProps.visible
                });
            }.bind(this), 100);
        }
    }

    componentDidUpdate(prevState) {
        this._render();
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
     * 根据外部传入的props visible来设置Modal组件对话框className样式表
     * @returns {string}
     */
    visibleToClass() {
        const {
            //Modal组件对话框是否弹出,必写属性
            visible
        } = this.props;
        //在传入对话框判断标志位visible且visible类型为bool时,Modal组件对话框用modalConfig中的指定className样式表显示;在不传入对话框判断标志位visible、visible为空或者visible类型错误时,Modal对话框className样式表消失
        return visible ? "" : " " + modalConfig[modalVisibleNone];
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
     * 关闭Modal对话框,并执行参数方法函数
     * @param callback
     */
    closeModal(callback) {
        this.setState({
            modalAppear: false
        }, function closer() {
            //FIXME 在这里设置一个时间控制器,Modal组件对话框从显示到隐藏这个过程动画1s之后,将Modal组件对话框消失
            setTimeout(function timer() {
                //Modal组件对话框关闭回调函数
                callback();
            }.bind(this), 1000);
        }.bind(this));
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
        //关闭Modal对话框,并执行提交发布回调函数
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
            //关闭Modal对话框,并执行参数方法函数
            closeModal
        } = this;
        //关闭Modal对话框,并执行关闭回调函数
        closeModal.bind(this)(onClose);
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
     * render渲染对话框header头部(包括用户名等信息)
     * @returns {XML}
     */
    renderModalHeader() {
        const {
            //对话框关闭函数
            onCloseHandler
        } = this;
        const {
            //对话框用户名
            title,
            //对话框是否显示右上角关闭按钮
            closable
        } = this.props;
        return (
            <header className="keryi_barter_modal_head">
                <div className="keryi_barter_modal_head_title">
                    {title}
                </div>
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
        return (
            <footer className="keryi_barter_modal_foot">
                <section className="keryi_barter_modal_close">
                    <Button
                        type="default"
                        className="keryi_barter_button_close"
                        onClick={onCloseHandler.bind(this)}
                    >
                        关闭
                    </Button>
                </section>
                <section className="keryi_barter_modal_publish">
                    <Button
                        type="primary"
                        className="keryi_barter_button_publish"
                        onClick={onOkHandler.bind(this)}
                    >
                        发布
                    </Button>
                </section>
            </footer>
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
            renderModalFooter
        } = this;
        const {
            //Modal组件对话框宽度
            width,
            //对话框是否显示footer底部区域(包括关闭按钮和发布按钮)
            footer,
            //Modal组件主要内容(外部传入)
            children,
            //Modal组件对话框HeadPortrait组件头像是否显示
            portrait
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