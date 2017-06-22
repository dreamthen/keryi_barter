/**
 * Created by yinwk on 2017/6/21.
 */
import React, {PropTypes} from "react";
import modalConfig from "./configs/modalConfig";
import "./keryi_barter_modal.css";

//Modal组件对话框显示样式表配置
const modalVisible = "visible";
//Modal组件对话框隐藏样式表配置
const modalVisibleDisappear = "visibleDisappear";
//Modal组件对话框消失样式表配置
const modalVisibleNone = "visibleNone";

export class Modal extends React.Component {
    static propTypes = {
        //Modal组件对话框是否弹出,必写属性
        visible: PropTypes.bool.isRequired,
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
     * 根据外部传入的props onClose来设置Modal组件对话框关闭
     * @param e
     */
    onCloseHandler(e) {
        const {
            //Modal组件对话框关闭回调函数
            onClose,
            //Modal组件对话框是否弹出,必写属性
            visible
        } = this.props;
        this.setState({
            modalAppear: visible
        });
        //FIXME 在这里设置一个时间控制器
        setTimeout(function timer() {
            onClose();
        }.bind(this), 1000);
        //取消冒泡
        e.nativeEvent.stopImmediatePropagation();
    }

    render() {
        const {
            //根据外部传入的props visible来设置Modal组件对话框className样式表
            visibleToClass,
            //根据state modalAppear来设置Modal组件对话框className样式表
            appearToClass,
            //Modal组件对话框关闭
            onCloseHandler
        } = this;
        return (
            <section
                tabIndex="-1"
                onClick={onCloseHandler.bind(this)}
                className={appearToClass.bind(this)() + visibleToClass.bind(this)()}
            >
                <main className="keryi_barter_modal_main">

                </main>
            </section>
        )
    }
}