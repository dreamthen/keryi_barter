/**
 * Created by yinwk on 2017/6/27.
 */
import React, {PropTypes} from "react";
import pullListDownConfig from "./configs/pullListDownConfig";
import "./keryi_barter_pullListDown.css";

//PullListDown组件下拉框隐藏样式表配置
const pullListDown = "pullListDown";
//PullListDown组件下拉框显示样式表配置
const pullListDownShow = "pullListDownShow";
//PullListDown组件下拉框消失样式表配置
const pullListDownDisappear = "pullListDownDisappear";
//PullListDown组件下拉框虚拟dom名称
const pullListDownRefs = "pullListDown";

/**
 * keryi_barter PullListDown下拉框组件
 */
class PullListDown extends React.Component {
    static propTypes = {
        //PullListDown组件下拉框是否显示
        visible: PropTypes.bool,
        //PullListDown组件下拉框标题
        title: PropTypes.string,
        //PullListDown组件下拉框列表
        dataSource: PropTypes.array,
        //PullListDown组件下拉框标题Icon className,外部传入样式表
        iconClassName: PropTypes.string,
        //PullListDown组件下拉框className,外部传入样式表
        className: PropTypes.string,
        //PullListDown组件下拉框style,外部传入内联样式
        style: PropTypes.object,
        //PullListDown组件下拉框关闭回调函数
        onClose: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {
            //PullListDown组件编辑框显示或者隐藏判断标志位
            pullListDownVisible: false
        }
    }

    componentWillReceiveProps(nextProps, nextState) {
        const {
            //PullListDown组件下拉框是否显示
            visible
        } = this.props;
        const {
            //点击除了PullListDown组件下拉框以外的区域,调用PullListDown组件下拉框关闭函数
            clickDocument
        } = this;
        if (visible !== nextProps.visible) {
            //FIXME 在这里设置一个时间控制器,PullList组件编辑框取消消失100ms之后,从隐藏到显示的过程
            setTimeout(function timer() {
                this.setState({
                    pullListDownVisible: nextProps.visible
                });
                nextProps.visible ? document.addEventListener("click", clickDocument.bind(this)) : document.removeEventListener("click", clickDocument.bind(this));
            }.bind(this), 100);
        }
    }

    /**
     * 获取PullListDown组件下拉框的区域范围
     * @param clientX
     * @param clientY
     * @returns {boolean}
     */
    initRect({clientX, clientY}) {
        //获取到PullListDown组件下拉框的区域范围
        const pullListDownRect = this.refs[pullListDownRefs].getBoundingClientRect();
        //如果点击事件处在PullListDown组件之内,返回true;如果点击事件处在PullListDown组件之外,返回false
        return clientX >= pullListDownRect.left && clientX <= pullListDownRect.right && clientY >= pullListDownRect.top && clientY <= pullListDownRect.bottom;
    }

    /**
     * PullListDown组件下拉框关闭函数
     */
    onPullListDownCloseHandler() {
        const {
            //下拉框关闭回调函数
            onClose
        } = this.props;
        this.setState({
            pullListDownVisible: false
        }, function closer() {
            setTimeout(function timer() {
                onClose();
            }.bind(this), 400);
        }.bind(this));
    }

    /**
     * 点击除了PullListDown组件下拉框以外的区域,调用PullListDown组件下拉框关闭函数
     */
    clickDocument(e) {
        const {
            //下拉框是否显示
            visible
        } = this.props;
        const {
            //获取PullListDown组件下拉框的区域范围
            initRect,
            //下拉框关闭函数
            onPullListDownCloseHandler
        } = this;
        visible && !initRect.bind(this, e)() && onPullListDownCloseHandler && onPullListDownCloseHandler.bind(this)();
    }

    /**
     * 根据props visible和state pullListDownVisible来设置PullListDown组件下拉框容器的className样式表
     * @returns {string}
     */
    visibleOrPullListDownToClass() {
        const {
            //下拉框是否显示
            visible
        } = this.props;
        const {
            //编辑框显示或者隐藏判断标志位
            pullListDownVisible
        } = this.state;
        return pullListDownVisible ? pullListDownConfig[pullListDownShow] : visible ? pullListDownConfig[pullListDown] : pullListDownConfig[pullListDownDisappear];
    }

    /**
     * 根据props className来设置PullListDown组件下拉框容器的className样式表
     * @returns {string}
     */
    outSideClassToClass() {
        const {
            //下拉框className,外部传入样式表
            className
        } = this.props;
        return className ? " " + className : "";
    }

    /**
     * 根据props style来设置PullListDown组件下拉框容器的style内联样式
     * @returns {object}
     */
    outsideStyleToStyle() {
        const {
            //下拉框style,外部传入内联样式
            style
        } = this.props;
        return style ? style : {};
    }

    /**
     * render渲染PullListDown组件下拉框标题Icon
     * @returns {XML}
     */
    renderPullListTitleIconClassName() {
        const {
            //下拉框标题Icon className,外部传入样式表
            iconClassName
        } = this.props;
        return (
            <i className={iconClassName ? iconClassName : "iconfontKeryiBarter keryiBarter-fire"}>

            </i>
        )
    }

    /**
     * render渲染下拉框组件头部
     * @returns {XML}
     */
    renderPullListHeader() {
        const {
            //下拉框标题Icon
            renderPullListTitleIconClassName
        } = this;
        const {
            //下拉框标题
            title
        } = this.props;
        return (
            <header className="keryi_barter_pullListDown_header">
                {renderPullListTitleIconClassName.bind(this)()}
                {title}
            </header>
        )
    }

    /**
     * 根据外部传入的列表数据,render渲染下拉框组件列表
     * @returns {XML}
     */
    renderDataSourceToPullList() {
        let {
            dataSource
        } = this.props;
        if (!dataSource || dataSource.length <= 0) {
            return null;
        }
        return dataSource.map(function pullList(pullItem, pullIndex) {
            return (
                <li
                    key={pullIndex}
                >
                    {pullItem}
                </li>
            )
        });
    }

    /**
     * render渲染下拉框组件
     * @returns {XML}
     */
    render() {
        const {
            //下拉框组件头部
            renderPullListHeader,
            //根据外部传入的列表数据,render渲染下拉框组件列表
            renderDataSourceToPullList,
            //根据props className和visible来设置PullListDown组件下拉框容器的className样式表
            visibleOrPullListDownToClass,
            //根据props className来设置PullListDown组件下拉框容器的className样式表
            outSideClassToClass,
            //根据props style来设置PullListDown组件下拉框容器的style内联样式
            outsideStyleToStyle
        } = this;
        return (
            <section
                ref={pullListDownRefs}
                className={visibleOrPullListDownToClass.bind(this)() + outSideClassToClass.bind(this)()}
                style={outsideStyleToStyle.bind(this)()}
            >
                {/*下拉框组件头部*/}
                {
                    renderPullListHeader.bind(this)()
                }
                <ul>
                    {/*根据外部传入的列表数据,render渲染下拉框组件列表*/}
                    {
                        renderDataSourceToPullList.bind(this)()
                    }
                </ul>
            </section>
        )
    }
}

//导出keryi_barter PullListDown下拉框组件
export default PullListDown;