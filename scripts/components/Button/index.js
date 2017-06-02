/**
 * Created by yinwk on 2017/6/2.
 */
import React, {PropTypes} from "react";
import sizeConfig from "./config/sizeConfig";
import typeConfig from "./config/typeConfig";
import "./keryi_barter_button.css";

//在不传入type、type为空或者type类型错误时,Button按钮className样式表用默认类型
const defaultTypeConfig = "default";

/**
 * keryi_barter Button按钮组件
 */
export class Button extends React.Component {
    static propTypes = {
        type: PropTypes.string,
        size: PropTypes.string,
        className: PropTypes.string,
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
        return sizeConfig[size];
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
            <div className={typeToClass.bind(this)()}>
                <button
                    className={className}
                    onClick={onClick}
                    style={sizeToStyle.bind(this)()}
                >
                    {children}
                </button>
            </div>
        )
    }
}