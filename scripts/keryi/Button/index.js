/**
 * Created by yinwk on 2017/6/2.
 */
import React, {PropTypes} from "react";
import sizeConfig from "./configs/sizeConfig";
import typeConfig from "./configs/typeConfig";
import "./keryi_barter_button.css";

//在不传入按钮类型type、type为空或者type类型错误时,Button组件按钮className样式表用默认类型
const defaultTypeConfig = "default";
//在不传入按钮尺寸size、size为空或者size类型错误时,Button组件按钮className样式表用默认字体尺寸14px
const defaultSizeConfig = "default";

/**
 * keryi_barter Button按钮组件
 */
class Button extends React.Component {
    static propTypes = {
        //Button组件按钮类型:default,primary,info,warning和error,默认为default
        type: PropTypes.string,
        //Button组件按钮尺寸:small,default和large,默认为default
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
     * 根据外部传入的props size来设置Button组件按钮className样式表
     * @returns {*}
     */
    sizeToClass() {
        const {size} = this.props;
        //在传入按钮尺寸size且size类型为string时,Button组件按钮用sizeConfig中的指定className样式表字体尺寸;在不传入按钮尺寸size、size为空或者size类型错误时,Button组件按钮className样式表用默认字体尺寸14px
        return size ? sizeConfig[size] : sizeConfig[defaultSizeConfig];
    }

    /**
     * 根据外部传入的props type来设置Button组件按钮className样式表
     * @returns {*}
     */
    typeToClass() {
        const {type} = this.props;
        //在传入type且type类型为string时,Button组件按钮用typeConfig中的指定className样式表类型;在不传入type、type为空或者type类型错误时,Button组件按钮className样式表用默认类型
        return type ? typeConfig[type] : typeConfig[defaultTypeConfig];
    }

    render() {
        const {sizeToClass, typeToClass} = this;
        const {
            className,
            children,
            onClick
        } = this.props;
        return (
            <div className={typeToClass.bind(this)() + " " + sizeToClass.bind(this)()}>
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

//导出keryi_barter Button按钮组件
export default Button;