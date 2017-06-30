/**
 * Created by yinwk on 2017/6/20.
 */
import React, {PropTypes} from "react";
import typeConfig from "./configs/typeConfig";
import "./keryi_barter_tag.css";

//在不传入按钮类型type、type为空或者type类型错误时,Tag组件标签className样式表用默认类型
const defaultTypeConfig = "default";

class Tag extends React.Component {
    static propTypes = {
        //Tag组件标签类型:primary,default,warning和error
        type: PropTypes.string,
        //Tag组件标签className,外部传入样式表
        className: PropTypes.string
    };

    /**
     * 根据外部传入的props type来设置Tag组件标签className样式表
     * @returns {*}
     */
    typeToClass() {
        const {type} = this.props;
        //在传入type且type类型为string时,Tag组件标签用typeConfig中的指定className样式表类型;在不传入type、type为空或者type类型错误时,Tag组件标签className样式表用默认类型
        return type ? typeConfig[type] : typeConfig[defaultTypeConfig]
    }

    /**
     * 根据外部传入的props className来设置Tag组件标签className样式表
     * @returns {*}
     */
    outSideClassToClass() {
        const {className} = this.props;
        //在传入className且className样式表为string时,Tag组件标签用外部传入的className样式表类型;在不传入className、className为空或者className类型错误时,Tag组件标签className样式表类型为空字符串
        return className ? " "+className : ""
    }

    render() {
        const {
            //根据外部传入的props type来设置Tag组件标签className样式表
            typeToClass,
            //根据外部传入的props className来设置Tag组件标签className样式表
            outSideClassToClass
        } = this;
        const {
            children
        } = this.props;
        return (
            <span className={typeToClass.bind(this)() + outSideClassToClass.bind(this)()}>
                <a href="javascript:void(0);">
                    {children}
                </a>
            </span>
        )
    }
}

export default Tag;
