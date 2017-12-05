import React, {PropTypes} from "react";
import ReactDOM from "react-dom";
import shadowModalConfig from "./configs/shadowModalConfig";
import Button from "../Button";
import "./keryi_barter_shadowModal.css";
//ShadowModal组件全局对话框显示样式表配置
const shadowModalVisible = "visible";
//ShadowModal组件全局对话框隐藏样式表配置
const shadowModalVisibleDisAppear = "visibleDisAppear";
//ShadowModal组件全局对话框消失样式表配置
const shadowModalVisibleNone = "visibleNone";
//Modal组件对话框footer底部区域确定按钮默认文本
const defaultOkText = "确定";
//Modal组件对话框footer底部区域取消按钮默认文本
const defaultCloseText = "取消";

/**
 * keryi_barter ShadowModal全局对话框组件
 */
class ShadowModal extends React.Component {
    static propTypes = {
        //ShadowModal组件全局对话框是否弹出,必写属性
        visible: PropTypes.bool.isRequired,
        //ShadowModal组件全局对话框是否显示右上角关闭按钮
        closable: PropTypes.bool,
        //ShadowModal组件全局对话框主容器样式表配置
        wrapClassName: PropTypes.string,
        //ShadowModal组件全局对话框副级容器样式表配置
        className: PropTypes.string,
        //ShadowModal组件全局对话框footer底部区域确定按钮文本
        okText: PropTypes.string,
        //ShadowModal组件全局对话框footer底部区域取消按钮文本
        cancelText: PropTypes.string,
        //ShadowModal组件全局对话框提交发布回调函数
        onOk: PropTypes.func,
        //ShadowModal组件全局对话框关闭回调函数
        onCancel: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {
            //判断ShadowModal组件全局对话框隐藏或者消失
            shadowModalVisibleAppear: false,
            //判断ShadowModal组件全局对话框隐藏或者显示
            shadowModalVisibleAnimation: false
        };
    }

    componentWillReceiveProps(nextProps) {
        //当外部传入ShadowModal组件全局对话框是否弹出属性为true时,ShadowModal组件全局对话框先从消失变为隐藏,然后时间控制器控制在ShadowModal组件全局对话框取消消失100ms之后从隐藏变为显示
        this.props.visible !== nextProps.visible && nextProps.visible &&
        this.setState({
            shadowModalVisibleAppear: nextProps.visible
        }, () => {
            //FIXME 在这里设置一个时间控制器,ShadowModal组件全局对话框取消消失100ms之后,从隐藏到显示的过程
            setTimeout(function timer() {
                this.setState({
                    shadowModalVisibleAnimation: nextProps.visible
                });
            }.bind(this), 100);
        });

        //当外部传入ShadowModal组件全局对话框是否弹出属性为false时,ShadowModal组件全局对话框先从显示变为隐藏,然后时间控制器控制在ShadowModal组件全局对话框从显示到隐藏这个过程动画1s之后,将ShadowModal组件全局对话框消失
        this.props.visible !== nextProps.visible && !nextProps.visible &&
        this.setState({
            shadowModalVisibleAnimation: nextProps.visible
        }, () => {
            //FIXME 在这里设置一个时间控制器,ShadowModal组件全局对话框从显示到隐藏这个过程动画1s之后,将ShadowModal组件全局对话框消失
            setTimeout(function timer() {
                this.setState({
                    shadowModalVisibleAppear: nextProps.visible
                });
            }.bind(this), 1000);
        });
    }

    componentDidMount() {
        this.shadowModalDiv = document.createElement("div");
        document.body.appendChild(this.shadowModalDiv);
        this._render.bind(this)();
    }

    componentDidUpdate() {
        this._render.bind(this)();
    }

    componentWillUnmount() {
        document.body.removeChild(this.shadowModalDiv);
    }

    /**
     * 根据state shadowModalVisibleAppear来设置ShadowModal组件全局对话框主容器的className样式表隐藏或者消失
     */
    appearClassToClass() {
        const {
            //判断ShadowModal组件全局对话框隐藏或者消失
            shadowModalVisibleAppear
        } = this.state;
        //在ShadowModal组件全局对话框隐藏或者消失判断标志位为true时,ShadowModal组件对话框用shadowModalConfig中的指定className样式表隐藏;在ShadowModal组件对话框隐藏或者消失判断标志位为false时,ShadowModal对话框className样式表消失
        return shadowModalVisibleAppear ? "" : ` ${shadowModalConfig[shadowModalVisibleNone]}`;
    }

    /**
     * 根据state shadowModalVisibleAnimation来设置ShadowModal组件全局对话框主容器的className样式表隐藏或者显示
     */
    animationClassToClass() {
        const {
            //判断ShadowModal组件全局对话框显示或者隐藏
            shadowModalVisibleAnimation
        } = this.state;
        //在ShadowModal组件全局对话框显示或者隐藏判断标志位为true时,ShadowModal组件对话框用shadowModalConfig中的指定className样式表显示;在ShadowModal组件对话框隐藏或者消失判断标志位为false时,ShadowModal对话框className样式表隐藏
        return shadowModalVisibleAnimation ? shadowModalConfig[shadowModalVisible] : shadowModalConfig[shadowModalVisibleDisAppear];
    }

    /**
     * 根据props className来设置ShadowModal组件全局对话框副级容器的className样式表
     * @returns {string}
     */
    outClassToClass() {
        const {
            //ShadowModal组件全局对话框副级容器样式表配置
            className
        } = this.props;
        return className ? ` ${className}` : "";
    }

    /**
     * 根据props wrapClassName来设置ShadowModal组件全局对话框主容器的className样式表
     * @returns {string}
     */
    wrapClassToClass() {
        const {
            //ShadowModal组件全局对话框主容器样式表配置
            wrapClassName
        } = this.props;
        return wrapClassName ? ` ${wrapClassName}` : "";
    }

    /**
     * 渲染ShadowModal组件全局对话框副级容器底部区域
     * @returns {*}
     */
    renderShadowModalInnerFooter() {
        const {
            //ShadowModal组件全局对话框footer底部区域确定按钮文本
            okText,
            //ShadowModal组件全局对话框footer底部区域取消按钮文本
            cancelText,
            //ShadowModal组件全局对话框提交发布回调函数
            onOk,
            //ShadowModal组件全局对话框关闭回调函数
            onCancel
        } = this.props;
        return (
            <footer className="keryi_barter_shadowModal_innerContainer_footer">
                <Button
                    size="default"
                    type="info"
                    onClick={onCancel}
                    className="keryi_barter_shadowModal_innerContainer_footer_close"
                >
                    {cancelText ? cancelText : defaultCloseText}
                </Button>
                <Button
                    size="default"
                    type="primary"
                    onClick={onOk}
                    className="keryi_barter_shadowModal_innerContainer_footer_sure"
                >
                    {okText ? okText : defaultOkText}
                </Button>
            </footer>
        )
    }

    _render() {
        const {
            //根据state shadowModalVisibleAppear来设置ShadowModal组件全局对话框主容器的className样式表隐藏或者消失
            appearClassToClass,
            //根据state shadowModalVisibleAnimation来设置ShadowModal组件全局对话框主容器的className样式表隐藏或者显示
            animationClassToClass,
            //根据props className来设置ShadowModal组件全局对话框主容器的className样式表
            outClassToClass,
            //根据props wrapClassName来设置ShadowModal组件全局对话框主容器的className样式表
            wrapClassToClass,
            //渲染ShadowModal组件全局对话框副级容器底部区域
            renderShadowModalInnerFooter
        } = this;
        const {
            children
        } = this.props;
        ReactDOM.render(
            <section
                className={animationClassToClass.bind(this)() + appearClassToClass.bind(this)() + wrapClassToClass.bind(this)()}>
                <div className="keryi_barter_shadowModal_shadow">
                </div>
                <div className={`keryi_barter_shadowModal_innerContainer${outClassToClass.bind(this)()}`}>
                    <main className="keryi_barter_shadowModal_innerContainer_main">
                        {children}
                    </main>
                    {/*渲染ShadowModal组件全局对话框副级容器底部区域*/}
                    {renderShadowModalInnerFooter.bind(this)()}
                </div>
            </section>, this.shadowModalDiv
        );
    }

    render() {
        return null;
    }
}

//导出keryi_barter ShadowModal全局对话框组件
export default ShadowModal;