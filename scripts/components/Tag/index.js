/**
 * Created by yinwk on 2017/6/20.
 */
import React,{PropTypes} from "react";
import typeConfig from "./configs/typeConfig";
import "./keryi_barter_tag.css";

//在不传入按钮类型type、type为空或者type类型错误时,Tag组件标签className样式表用默认类型
const defaultTypeConfig = "default";

export class Tag extends React.Component {
    static propTypes = {
        //Tag组件标签类型:primary,default,warning和error
        type: PropTypes.string,
        //Tag组件标签className,外部传入样式表
        className: PropTypes.string
    };

    typeToClass(){

    }

    render() {
        const {
            children,
            className
        } = this.props;
        return (
            <span className={className}>
                {children}
            </span>
        )
    }
}
