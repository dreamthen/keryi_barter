/**
 * Created by yinwk on 2017/6/3.
 */
import React, {PropTypes} from "react";
import sizeConfig from "./configs/sizeConfig";
import typeConfig from "./configs/typeConfig";
import "./keryi_barter_input.css";

//在不传入输入框类型type、type为空或者type类型错误时,Input组件输入框className样式表用文本类型作为默认类型
const defaultTypeConfig = "text";
//在不传入输入框尺寸size、size为空或者size类型错误时,Input组件输入框className样式表用默认宽度100px
const defaultSizeConfig = "default";

export class Input extends React.Component {
    static propTypes = {
        //Input组件输入框内容
        value: PropTypes.string,
        //Input组件输入框类型:text和password,默认为text
        type: PropTypes.string,
        //Input组件输入框尺寸:small,default和large,默认为default
        size: PropTypes.string,
        //Input组件输入框className,外部传入样式表
        className: PropTypes.string,
        //Input组件输入框onChange内容改变事件,外部传入Input输入框内容改变函数
        onChange: PropTypes.func,
        //Input组件输入框默认提示语
        placeholder: PropTypes.string,
        //Input组件输入框可输入最大字符数
        maxLength: PropTypes.number
    };

    constructor(props) {
        super(props);
        this.state = {}
    }

    /**
     * 根据外部传入的props size来设置Input组件输入框className样式表
     * @returns {*}
     */
    sizeToClass() {
        const {size} = this.props;
        //在传入输入框尺寸size且size类型为string时,Input组件输入框用sizeConfig中的指定className样式表宽度;在不传入输入框尺寸size、size为空或者size类型错误时,Input输入框className样式表用默认宽度100px
        return sizeConfig[size] ? sizeConfig[size] : sizeConfig[defaultSizeConfig];
    }

    /**
     * 根据外部传入的props type来设置Input组件输入框className样式表
     * @returns {*}
     */
    typeToClass() {
        const {type} = this.props;
        //在传入type且type类型为string时,Input组件输入框用typeConfig中的指定className样式表类型;在不传入type、type为空或者type类型错误时,Input组件输入框className样式表用文本类型作为默认类型
        return type ? typeConfig[type] : typeConfig[defaultTypeConfig];
    }

    render() {
        const {typeToClass, sizeToClass} = this;
        const {
            //Input组件输入框类型:text和password,默认为text
            type,
            //Input组件输入框className,外部传入样式表
            className,
            //Input组件输入框内容
            value,
            //Input组件输入框onChange内容改变事件,外部传入Input输入框内容改变函数
            onChange,
            //Input组件输入框默认提示语
            placeholder,
            //Input组件输入框可输入最大字符数
            maxLength
        } = this.props;
        return (
            <div className={typeToClass.bind(this)() + " " + sizeToClass.bind(this)()}>
                <input
                    value={value}
                    placeholder={placeholder}
                    maxLength={maxLength}
                    className={className}
                    type={type}
                    onChange={onChange}
                />
            </div>
        )
    }
}