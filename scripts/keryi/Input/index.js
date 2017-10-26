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
//Input组件类型
const inputType = ["text", "password", "number", "textarea"];

/**
 * keryi_barter Input输入框组件
 */
class Input extends React.Component {
    static propTypes = {
        //Input组件输入框内容
        value: PropTypes.string,
        //Input组件输入框类型:text、password和textarea,默认为text
        type: PropTypes.string,
        //Input组件输入框尺寸:small,default和large,默认为default
        size: PropTypes.string,
        //Input组件输入框是否可编辑
        disabled: PropTypes.bool,
        //Input组件输入框className,外部传入样式表
        className: PropTypes.string,
        //Input组件输入框onChange内容改变事件,外部传入Input输入框内容改变函数
        onChange: PropTypes.func,
        //Input组件输入框默认提示语
        placeholder: PropTypes.string,
        //Input组件输入框可输入最大字符数
        maxLength: PropTypes.number,
        //Input组件输入框textarea行数
        rows: PropTypes.number,
        //Input组件输入框onFocus聚焦事件,外部传入Input输入框聚焦函数
        onFocus: PropTypes.func,
        //Input组件输入框onFocus失焦事件,外部传入Input输入框失焦函数
        onBlur: PropTypes.func,
        //Input组件输入框能输入数字的最小值
        min: PropTypes.number,
        //Input组件输入框能输入数字的最大值
        max: PropTypes.number
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
            //Input组件输入框是否可编辑
            disabled,
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
            maxLength,
            //Input组件输入框textarea行数
            rows,
            //Input组件输入框onFocus聚焦事件,外部传入Input输入框聚焦函数
            onFocus,
            //Input组件输入框onFocus失焦事件,外部传入Input输入框失焦函数
            onBlur,
            //Input组件输入框能输入数字的最小值
            min,
            //Input组件输入框能输入数字的最大值
            max
        } = this.props;
        const typeAreaIndex = inputType.length;
        return (
            <div className={typeToClass.bind(this)() + " " + sizeToClass.bind(this)()}>
                {
                    type === inputType[typeAreaIndex - 1] ? <textarea
                        disabled={disabled}
                        value={value}
                        placeholder={placeholder}
                        maxLength={maxLength}
                        className={className}
                        onChange={onChange}
                        rows={rows}
                        onFocus={onFocus}
                        onBlur={onBlur}
                    >
                    </textarea> : <input
                        disabled={disabled}
                        value={value}
                        placeholder={placeholder}
                        maxLength={maxLength}
                        className={className}
                        type={type}
                        onChange={onChange}
                        min={min}
                        max={max}
                    />
                }
            </div>
        )
    }
}

//导出keryi_barter Input输入框组件
export default Input;