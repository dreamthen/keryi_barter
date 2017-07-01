/**
 * Created by yinwk on 2017/6/14.
 */
import React, {PropTypes} from "react";
import "./keryi_barter_headPortrait.css";
import headPortraitConfig from "./configs/headPortraitConfig";

//在不传入头像外部样式表、className为空或者className类型错误时,HeadPortrait组件头像className样式表用默认样式表配置
const defaultHeadPortrait = "headPortrait";
//在传入头像外部判断是否有白色边框标志位且判断是否有白色边框标志位为true时,HeadPortrait组件头像borderJudgement样式表用添加资源或者个人信息头像容器样式表配置
const addHeadPortrait = "headPortraitAdd";

/**
 * keryi_barter HeadPortrait头像组件
 */
class HeadPortrait extends React.Component {
    static Proptypes = {
        //HeadPortrait组件头像地址
        headPortrait: PropTypes.string,
        //HeadPortrait组件是否有白色边框
        borderJudgement: PropTypes.bool,
        //HeadPortrait组件头像className,外部传入样式表
        className: PropTypes.string
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

    render() {
        const {headPortrait} = this.props;
        const {
            //根据外部传入的props className来设置HeadPortrait组件头像className样式表
            outSideClassToClass,
            //根据外部传入的props borderJudgement来设置HeadPortrait组件头像className是否有边框
            borderJudgementToClass
        } = this;
        return (
            <i
                className={outSideClassToClass.bind(this)() + borderJudgementToClass.bind(this)()}
                style={{background: "url(" + headPortrait + ") no-repeat center center / cover border-box content-box"}}>

            </i>
        )
    }
}

//导出keryi_barter HeadPortrait头像组件
export default HeadPortrait;