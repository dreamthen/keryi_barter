/**
 * Created by yinwk on 2017/6/27.
 */
import React, {PropTypes} from "react";
import "./keryi_barter_pullListDown.css";

/**
 * keryi_barter PullListDown下拉框组件
 */
class PullListDown extends React.Component {
    static propTypes = {
        //PullListDown组件下拉框标题
        title: PropTypes.string,
        //PullListDown组件下拉框列表
        dataSource: PropTypes.array,
        //PullListDown组件下拉框标题Icon className,外部传入样式表
        iconClassName: PropTypes.string,
        //PullListDown组件下拉框className,外部传入样式表
        className: PropTypes.string,
        //PullListDown组件下拉框style,外部传入内联样式
        style: PropTypes.object
    };

    constructor(props) {
        super(props);
        this.state = {}
    }

    /**
     * 根据props className来设置PullListDown组件下拉框容器的className样式表
     * @returns {string}
     */
    outsideClassToClass() {
        const {
            //PullListDown组件下拉框className,外部传入样式表
            className
        } = this.props;
        return className ? "keryi_barter_pullListDown " + className : "keryi_barter_pullListDown";
    }

    /**
     * 根据props style来设置PullListDown组件下拉框容器的style内联样式
     * @returns {object}
     */
    outsideStyleToStyle() {
        const {
            //PullListDown组件下拉框style,外部传入内联样式
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
            //PullListDown组件下拉框标题Icon className,外部传入样式表
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
            //PullListDown组件下拉框标题Icon
            renderPullListTitleIconClassName
        } = this;
        const {
            //PullListDown组件下拉框标题
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
        if(!dataSource || dataSource.length <= 0) {
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
            //根据props className来设置PullListDown组件下拉框容器的className样式表
            outsideClassToClass,
            //根据props style来设置PullListDown组件下拉框容器的style内联样式
            outsideStyleToStyle
        } = this;
        return (
            <section
                className={outsideClassToClass.bind(this)()}
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