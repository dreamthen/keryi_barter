/**
 * Created by yinwk on 2017/6/14.
 */
import React, {PropTypes} from "react";
import "./keryi_barter_headPortrait.css";
import headPortraitConfig from "./configs/headPortraitConfig";

//在不传入头像外部样式表、className为空或者className类型错误时,HeadPortrait组件头像className样式表用默认样式表配置
const defaultHeadPortrait = "headPortrait";

export class HeadPortrait extends React.Component {
    static Proptypes = {
        //HeadPortrait组件头像地址
        headPortrait: PropTypes.string,
        //HeadPortrait组件头像className,外部传入样式表
        className: PropTypes.string
    };

    constructor(props) {
        super(props);
        this.state = {}
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
        const {outSideClassToClass} = this;
        return (
            <i
                className={outSideClassToClass.bind(this)()}
                style={{background: "url(" + headPortrait + ") no-repeat center center / cover border-box content-box"}}>

            </i>
        )
    }
}