/**
 * Created by yinwk on 2017/6/8.
 */
import React, {PropTypes} from "react";
import typeConfig from "./config/typeConfig";
import sizeConfig from "./config/sizeConfig";
import "./keryi_barter_prompt.css";

//在不传入提示语类型type、type为空或者type类型错误时,Prompt组件提示语className样式表用文本类型作为默认类型
const defaultTypeConfig = "default";
//在不传入提示语尺寸size、size为空或者size类型错误时,Prompt组件提示语className样式表用默认字体尺寸14px
const defaultSizeConfig = "default";

/**
 * keryi_barter Prompt提示语组件
 */
class Prompt extends React.Component {
    static propTypes = {
        //Prompt组件提示语是否显示Icon图标
        showIcon: PropTypes.bool,
        //Prompt组件提示语类型:default,error,warning和success,默认为default
        type: PropTypes.string,
        //Prompt组件提示语尺寸:small,default和large,默认为default
        size: PropTypes.string,
        //Prompt组件提示语className,外部传入样式表
        className: PropTypes.string,
        //Prompt组件提示语内容,外部传入内容
        message: PropTypes.string
    };

    /**
     * 根据外部传入的props type className属性来设置Prompt组件提示语className样式表
     * @returns {*}
     */
    typeToClass() {
        const {type} = this.props;
        //在传入type且type类型为string时,Prompt组件提示语用typeConfig中的指定className样式表类型;在不传入type、type为空或者type类型错误时,Prompt组件提示语className样式表用默认类型
        return type ? typeConfig[type]["className"] : typeConfig[defaultTypeConfig]["className"];
    }

    /**
     * 根据外部传入的props size来设置Prompt组件按钮className样式表
     * @returns {*}
     */
    sizeToClass() {
        const {size} = this.props;
        //在传入提示语尺寸size且size类型为string时,Prompt组件提示语用sizeConfig中的指定className样式表字体尺寸;在不传入提示语尺寸size、size为空或者size类型错误时,Prompt组件提示语className样式表用默认字体尺寸14px
        return size ? sizeConfig[size] : sizeConfig[defaultSizeConfig];
    }

    /**
     * 根据外部传入的props type icon来设置Prompt组件提示语className样式表
     * @returns {XML}
     */
    renderPromptIcon() {
        const {type} = this.props;
        return (
            <i className={type ? typeConfig[type]["icon"] : typeConfig[defaultTypeConfig]["icon"]}>

            </i>
        )
    }

    render() {
        const {typeToClass, sizeToClass, renderPromptIcon} = this;
        const {className, message, children} = this.props;
        return (
            <section
                className={typeToClass.bind(this)() + " " + sizeToClass.bind(this)()}
            >
                <div
                    className={className}
                >
                    {renderPromptIcon.bind(this)()}
                    {message !== undefined ? message : children}
                </div>
            </section>
        )
    }
}

//导出keryi_barter Prompt提示语组件
export default Prompt;
