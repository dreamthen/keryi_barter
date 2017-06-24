/**
 * Created by yinwk on 2017/6/21.
 */
import React, {PropTypes} from "react";
import {HeadPortrait} from "../HeadPortrait";
import {Input} from "../Input";
import modalConfig from "./configs/modalConfig";
import modalComponentConfig from "./configs/modalComponentConfig";
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
//组件类型
const componentType = ["input"];

export class Modal extends React.Component {
    static propTypes = {
        //Modal组件对话框是否弹出,必写属性
        visible: PropTypes.bool.isRequired,
        //Modal组件对话框宽度
        width: PropTypes.number,
        //Modal组件对话框HeadPortrait组件头像地址
        headPortrait: PropTypes.string,
        //Modal组件对话框用户名
        userName: PropTypes.string,
        //Modal组件对话框样式表配置
        className: PropTypes.string,
        //Modal组件对话框是否显示右上角关闭按钮
        closable: PropTypes.bool,
        //Modal组件对话框关闭回调函数
        onClose: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {
            //Modal组件对话框显示或者隐藏判断标志位
            modalAppear: false,
            //Modal组件对话框标题
            title: ""
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
     * render渲染对话框头像
     * @returns {XML}
     */
    renderModalHeadPortrait() {
        const {headPortrait} = this.props;
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
     * render渲染对话框头部(包括用户名等信息)
     * @returns {XML}
     */
    renderModalHeader() {
        const {
            //对话框关闭函数
            onCloseHandler
        } = this;
        const {
            //对话框用户名
            userName,
            //对话框是否显示右上角关闭按钮
            closable
        } = this.props;
        return (
            <header className="keryi_barter_modal_head">
                <div className="keryi_barter_modal_head_title">
                    {userName}
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
     * 根据不同的组件类型配置来设置组件
     * @param key
     * @param include
     * @param size
     * @param type
     * @param placeholder
     * @param maxLength
     * @param className
     */
    renderModalComponent(key, include, size, type, placeholder, maxLength, className) {
        const {onChangeInputHandler} = this;
        switch (include) {
            case componentType[0]:
                return (
                    <Input
                        value={key}
                        type={type ? type : "text"}
                        size={size}
                        placeholder={placeholder}
                        maxLength={maxLength}
                        className={className ? className : ""}
                        onChange={onChangeInputHandler.bind(this, key)}
                    />
                )
        }
    }

    /**
     * 改变标题内容函数
     * @param key
     * @param value
     */
    onChangeInputHandler(key, value) {
        this.setState({
            [key]: value
        });
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
                className="keryi_barter_modal_main"
            >
                {
                    modalComponentConfig.map(function modal(modalItem, index) {
                        //根据不同的组件类型配置来设置组件
                        return renderModalComponent.bind(this)(
                            modalItem["key"],
                            modalItem["include"],
                            modalItem["size"],
                            modalItem["type"],
                            modalItem["placeholder"],
                            modalItem["maxLength"],
                            modalItem["className"]
                        );
                    }.bind(this))
                }
            </main>
        )
    }

    render() {
        const {
            //根据外部传入的props visible来设置Modal组件对话框className样式表
            visibleToClass,
            //根据state modalAppear来设置Modal组件对话框className样式表
            appearToClass,
            //对话框关闭函数
            onCloseHandler,
            //根据外部传入的props onClose来设置Modal组件对话框关闭
            outsideClassToClass,
            //对话框头部(包括标题、用户名和时间等信息)
            renderModalHeader,
            //对话框头像
            renderModalHeadPortrait,
            //对话框主要内容(包括标题、描述和标签等信息)
            renderModalMain
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
                {/*对话框副级容器*/}
                <section className="keryi_barter_modalContainer">
                    {/*对话框头像*/}
                    {renderModalHeadPortrait.bind(this)()}
                    <main
                        className={outsideClassToClass.bind(this)()}
                        style={{width: width ? width : defaultWidth}}
                    >
                        <article
                            className="keryi_barter_modal_article"
                        >
                            {/*对话框头部(包括用户名等信息)*/}
                            {renderModalHeader.bind(this)()}
                            {/*对话框主要内容(包括标题、描述和标签等信息)*/}
                            {renderModalMain.bind(this)()}
                        </article>
                    </main>
                </section>
            </section>
        )
    }
}