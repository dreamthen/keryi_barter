/**
 * Created by yinwk on 2017/6/14.
 */
import React from "react";
import PropTypes from "prop-types";
import "./keryi_barter_headPortrait.css";
//头像样式表配置
import headPortraitConfig from "./configs/headPortraitConfig";
//头像形状样式表配置
import typeConfig from "./configs/typeConfig";

//在不传入头像外部样式表、className为空或者className类型错误时,HeadPortrait组件头像className样式表用默认样式表配置
const defaultHeadPortrait = "headPortrait";
//在传入头像外部判断是否有白色边框标志位且判断是否有白色边框标志位为true时,HeadPortrait组件头像borderJudgement样式表用添加资源或者个人信息头像容器样式表配置
const addHeadPortrait = "headPortraitAdd";
//在不传入头像形状时，HeadPortrait组件头像形状样式表配置用默认circular圆形配置
const defaultHeadPortraitType = "circular";

/**
 * keryi_barter HeadPortrait头像组件
 */
class HeadPortrait extends React.Component {
    static Proptypes = {
        //HeadPortrait组件头像形状,默认为circular(圆形)
        type: PropTypes.string,
        //HeadPortrait组件头像地址
        headPortrait: PropTypes.string,
        //HeadPortrait组件是否有白色边框
        borderJudgement: PropTypes.bool,
        //HeadPortrait组件头像className,外部传入样式表
        className: PropTypes.string,
        //HeadPortrait组件头像style,外部传入内联样式
        style: PropTypes.object
    };

    constructor(props) {
        super(props);
        this.state = {}
    }

    /**
     *  根据外部传入的props borderJudgement来设置HeadPortrait组件头像className是否有边框
     *  @returns {*}
     */
    borderJudgementToClass() {
        const {
            //HeadPortrait组件是否有白色边框
            borderJudgement
        } = this.props;
        return borderJudgement === true ? " " + headPortraitConfig[addHeadPortrait] : "";
    }

    /**
     * 根据外部传入的props className来设置HeadPortrait组件头像className样式表
     * @returns {*}
     */
    outSideClassToClass() {
        const {
            //HeadPortrait组件头像className,外部传入样式表
            className
        } = this.props;
        return className ? className : headPortraitConfig[defaultHeadPortrait];
    }

    /**
     * 根据外部传入的props type来设置HeadPortrait组件头像形状样式表
     * @returns {*}
     */
    typeClassToClass() {
        const {
            //HeadPortrait组件头像形状,默认为circular(圆形)
            type
        } = this.props;
        return ` ${type ? typeConfig[type] : typeConfig[defaultHeadPortraitType]}`;
    }

    render() {
        const {
            //HeadPortrait组件头像style,外部传入内联样式
            style,
            //HeadPortrait组件头像地址
            headPortrait
        } = this.props;
        const {
            //根据外部传入的props className来设置HeadPortrait组件头像className样式表
            outSideClassToClass,
            //根据外部传入的props type来设置HeadPortrait组件头像形状样式表
            typeClassToClass,
            //根据外部传入的props borderJudgement来设置HeadPortrait组件头像className是否有边框
            borderJudgementToClass
        } = this;
        return (
            <i
                className={outSideClassToClass.bind(this)() + borderJudgementToClass.bind(this)() + typeClassToClass.bind(this)()}
                style={Object.assign({}, {background: "url(" + headPortrait + ") no-repeat center center / cover border-box content-box"}, style)}>

            </i>
        )
    }
}

//导出keryi_barter HeadPortrait头像组件
export default HeadPortrait;