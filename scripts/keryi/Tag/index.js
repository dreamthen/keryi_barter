/**
 * Created by yinwk on 2017/6/20.
 */
import React from "react";
import PropTypes from "prop-types";
import typeConfig from "./configs/typeConfig";
import animationConfig from "./configs/animationConfig";
import "./keryi_barter_tag.css";

//在不传入按钮类型type、type为空或者type类型错误时,Tag组件标签className样式表用默认类型
const defaultTypeConfig = "default";
//标签动态隐藏
const animationAnimationConfig = "animation";
//标签动态显示
const animationShowAnimationConfig = "animationShow";

/**
 * keryi_barter Tag标签组件
 */
class Tag extends React.Component {
    static propTypes = {
        //Tag组件标签类型:primary,default,warning和error
        type: PropTypes.string,
        //Tag组件标签className,外部传入样式表
        className: PropTypes.string,
        //Tag组件标签图标className,外部传入样式表
        iconName: PropTypes.string,
        //Tag组件标签显示是否有动画效果
        animation: PropTypes.bool,
        //Tag组件标签关闭方法函数,外部传入
        onClose: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {
            //Tag组件标签className样式表控制所在的容器显示或者隐藏
            animationVisible: false
        };
    }

    /**
     * 组件开始装载
     */
    componentWillMount() {

    }

    componentWillReceiveProps(nextProps) {

    }

    /**
     * 组件结束装载
     */
    componentDidMount() {
        //标签显示是否有动画效果
        const {animation} = this.props;
        //FIXME
        animation && setTimeout(function timer() {
            this.setState({
                animationVisible: true
            });
        }.bind(this), 100);
    }

    /**
     * 根据外部传入的props animation来设置Tag组件标签className样式表
     */
    outAnimationToClass() {
        //标签显示是否有动画效果
        const {animation} = this.props;
        //标签className样式表控制所在的容器显示或者隐藏
        const {animationVisible} = this.state;
        return animation ? " " + (animationVisible ? animationConfig[animationShowAnimationConfig] : animationConfig[animationAnimationConfig]) : "";
    }

    /**
     * 根据外部传入的props type来设置Tag组件标签className样式表
     * @returns {*}
     */
    typeToClass() {
        const {type} = this.props;
        //在传入type且type类型为string时,Tag组件标签用typeConfig中的指定className样式表类型;在不传入type、type为空或者type类型错误时,Tag组件标签className样式表用默认类型
        return type ? typeConfig[type] : typeConfig[defaultTypeConfig];
    }

    /**
     * 根据外部传入的props className来设置Tag组件标签className样式表
     * @returns {*}
     */
    outSideClassToClass() {
        const {className} = this.props;
        //在传入className且className样式表为string时,Tag组件标签用外部传入的className样式表类型;在不传入className、className为空或者className类型错误时,Tag组件标签className样式表类型为空字符串
        return className ? " " + className : "";
    }

    /**
     * 在Tag组件标签显示有动画效果的情况下,关闭tag标签方法函数
     */
    closeTagHandler() {
        const {
            //标签关闭方法函数
            onClose
        } = this.props;
        this.setState({
            animationVisible: false
        }, function animationer() {
            //FIXME 这里设置一个时间控制器,控制在500ms中标签className样式表控制所在的容器由显示变为隐藏,然后调用外部关闭方法函数
            setTimeout(function timer() {
                onClose();
            }.bind(this), 500);
        }.bind(this));
    }

    render() {
        const {
            //根据外部传入的props type来设置Tag组件标签className样式表
            typeToClass,
            //根据外部传入的props className来设置Tag组件标签className样式表
            outSideClassToClass,
            //根据外部传入的props animation来设置Tag组件标签className样式表
            outAnimationToClass,
            //在Tag组件标签显示有动画效果的情况下,关闭tag标签方法函数
            closeTagHandler
        } = this;
        const {
            children,
            iconName
        } = this.props;
        return (
            <span
                className={typeToClass.bind(this)() + outSideClassToClass.bind(this)() + outAnimationToClass.bind(this)()}>
                <a href="javascript:void(0);">
                    {children}
                </a>
                {iconName && <i className={iconName} onClick={closeTagHandler.bind(this)}> </i>}
            </span>
        )
    }
}

//导出keryi_barter Tag标签组件
export default Tag;
