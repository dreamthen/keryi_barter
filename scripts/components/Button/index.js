/**
 * Created by yinwk on 2017/6/2.
 */
import React, {PropTypes} from "react";
import sizeConfig from "./config/sizeConfig";
import typeConfig from "./config/typeConfig";
import "./keryi_barter_button.css";

//在不传入按钮类型type、type为空或者type类型错误时,Button按钮className样式表用默认类型
const defaultTypeConfig = "default";
//在不传入按钮大小size、size为空或者size类型错误时,Button按钮style样式宽度用默认宽度100px
const defaultSizeConfig = "default";

/**
 * keryi_barter Button按钮组件
 */
export class Button extends React.Component {
    static propTypes = {
        //Button组件按钮类型:default,primary,warning和error,默认为default
        type: PropTypes.string,
        //Button组件按钮大小:small,default和large,默认为default
        size: PropTypes.string,
        //Button组件按钮className,外部传入样式表
        className: PropTypes.string,
        //Button组件按钮onClick点击事件,外部传入点击函数
        onClick: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {}
    }

    /**
     * 根据外部传入的props size来设置Button按钮的尺寸
     * @returns {*}
     */
    sizeToStyle() {
        const {size} = this.props;
        //在传入size且size类型为string时,Button按钮用sizeConfig中的指定className样式表宽度;在不传入按钮大小size、size为空或者size类型错误时,Button按钮className样式表用默认宽度100px
        return size ? sizeConfig[size] : sizeConfig[defaultSizeConfig];
    }

    /**
     * 根据外部传入的props type来设置Button按钮className样式表
     * @returns {*}
     */
    typeToClass() {
        const {type} = this.props;
        //在传入type且type类型为string时,Button按钮用typeConfig中的指定className样式表类型;在不传入type、type为空或者type类型错误时,Button按钮className样式表用默认类型
        return type ? typeConfig[type] : typeConfig[defaultTypeConfig];
    }

    render() {
        const {sizeToStyle, typeToClass} = this;
        const {
            className,
            children,
            onClick
        } = this.props;
        return (
            <div className={typeToClass.bind(this)() + " " + sizeToStyle.bind(this)()}>
                <button
                    className={className}
                    onClick={onClick}
                >
                    {children}
                </button>
            </div>
        )
    }
}