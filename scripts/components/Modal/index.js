/**
 * Created by yinwk on 2017/6/21.
 */
import React, {PropTypes} from "react";
import {HeadPortrait} from "../HeadPortrait";
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

export class Modal extends React.Component {
    static propTypes = {
        //Modal组件对话框是否弹出,必写属性
        visible: PropTypes.bool.isRequired,
        //Modal组件对话框宽度
        width: PropTypes.number,
        //Modal组件对话框HeadPortrait组件头像地址
        headPortrait: PropTypes.string,
        //Modal组件对话框样式表配置
        className: PropTypes.string,
        //Modal组件对话框关闭回调函数
        onClose: PropTypes.func
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
     * 根据外部传入的props onClose来设置Modal组件对话框关闭
     * @param e
     */
    onCloseHandler(e) {
        const {
            //Modal组件对话框关闭回调函数
            onClose
        } = this.props;
        this.setState({
            modalAppear: false
        }, function closer() {
            //FIXME 在这里设置一个时间控制器,Modal组件对话框从显示到隐藏这个过程动画1s之后,将Modal组件对话框消失
            setTimeout(function timer() {
                //Modal组件对话框关闭回调函数
                onClose();
            }.bind(this), 1000);
        }.bind(this));
        //取消冒泡
        e.nativeEvent.stopImmediatePropagation();
    }



    /**
     * render渲染对话框头部(包括头像、标题、用户名和时间等信息)
     * @returns {XML}
     */
    renderModalHeader() {
        const {headPortrait} = this.props;
        return (
            <header className="keryi_barter_modal_header">
                <div className="keryi_barter_modal_avatar">
                    <HeadPortrait
                        headPortrait={headPortrait ? headPortrait : modalConfig[modalDefaultHeadPortrait]}
                    />
                </div>
            </header>
        )
    }

    render() {
        const {
            //根据外部传入的props visible来设置Modal组件对话框className样式表
            visibleToClass,
            //根据state modalAppear来设置Modal组件对话框className样式表
            appearToClass,
            //Modal组件对话框关闭
            onCloseHandler,
            //根据外部传入的props onClose来设置Modal组件对话框关闭
            outsideClassToClass,
            //对话框头部(包括头像、标题、用户名和时间等信息)
            renderModalHeader
        } = this;
        const {
            //Modal组件对话框宽度
            width
        } = this.props;
        return (
            <section
                tabIndex="-1"
                className={appearToClass.bind(this)() + visibleToClass.bind(this)()}
            >
                <div
                    className="keryi_barter_modal_shadow"
                    onClick={onCloseHandler.bind(this)}
                >

                </div>
                <main
                    className={outsideClassToClass.bind(this)()}
                    style={{width: width ? width : defaultWidth}}
                >
                    <article
                        className="keryi_barter_modal_article"
                    >
                        {/*对话框头部(包括头像、标题、用户名和时间等信息)*/}
                        {renderModalHeader.bind(this)()}
                    </article>
                </main>
            </section>
        )
    }
}