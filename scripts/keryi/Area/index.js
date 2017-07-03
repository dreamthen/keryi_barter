/**
 * Created by yinwk on 2017/6/27.
 */
import React, {PropTypes} from "react";
import {
    getElementPosition
} from "../../configs/getElementPosition";
import typeConfig from "./configs/typeConfig";
import sizeConfig from "./configs/sizeConfig";
import "./keryi_barter_area.css";

//在不传入编辑框尺寸size、size为空或者size类型错误时,Area组件编辑框className样式表用默认字体尺寸14px
const defaultSizeConfig = "default";
//在不传入编辑框类型type、type为空或者type类型错误时,Area组件编辑框className样式表用图文类型作为默认类型
const defaultTypeConfig = "imageText";
//Area组件编辑框的ref属性
const defaultRefs = "contentEdit";

/**
 * keryi_barter Area编辑框组件
 */
class Area extends React.Component {
    static propTypes = {
        //Area组件编辑框内容
        value: PropTypes.string,
        //Area组件编辑框尺寸:small,default和large,默认为default
        size: PropTypes.string,
        //Area组件编辑框类型:imageText,默认为imageText
        type: PropTypes.string,
        //Area组件编辑框className,外部传入样式表
        className: PropTypes.string,
        //Area组件编辑框是否执行下拉选择框
        pullListDown: PropTypes.bool,
        //Area组件编辑框默认提示语
        placeholder: PropTypes.string,
        //Area组件编辑框onChange内容改变事件,外部传入Area编辑框内容改变函数
        onChange: PropTypes.func,
        //Area组件编辑框onFocus聚焦事件
        onFocus: PropTypes.func,
        //Area组件编辑框onBlur失焦事件
        onBlur: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {}
    }

    componentWillReceiveProps(nextProps) {
        const {
            //编辑框是否执行下拉选择框
            pullListDown,
            //编辑框onFocus聚焦事件
            onFocus
        } = this.props;
        if ((this.props.value === "" && nextProps.value !== null) || (this.props.value === "" && nextProps.value !== "")) {
            if (pullListDown) {
                //获取元素
                let contentEdit = this.refs[defaultRefs];
                //获取到元素初始距离窗口顶部、右边、底部和左边的位置
                let position = getElementPosition(contentEdit);
                onFocus(position.left);
            }
        }
    }

    /**
     * 组件重新渲染判断函数
     * @param nextProps
     * @param nextState
     * @returns {boolean}
     */
    shouldComponentUpdate(nextProps, nextState) {
        const {
            //编辑框内容
            value
        } = this.props;
        return !this.refs[defaultRefs] || (this.refs[defaultRefs].innerHTML !== nextProps.value && nextProps.value !== value);
    }

    /**
     * 组件重新渲染完毕之后的操作函数
     * @param prevProps
     * @param prevState
     */
    componentDidUpdate(prevProps, prevState) {
        const {
            //编辑框
            value
        } = this.props;
        if (this.refs[defaultRefs].innerHTML !== value) {
            this.refs[defaultRefs].innerHTML = value;
        }
    }

    /**
     * 组件结束装载
     */
    componentDidMount() {

    }

    /**
     * 根据外部传入的props size来设置Area组件编辑框className样式表
     * @returns {*}
     */
    sizeToClass() {
        const {size} = this.props;
        //在传入编辑框尺寸size且size类型为string时,Area组件编辑框用sizeConfig中的指定className样式表字体尺寸;在不传入编辑框尺寸size、size为空或者size类型错误时,Area组件编辑框className样式表用默认字体尺寸14px
        return size ? sizeConfig[size] : sizeConfig[defaultSizeConfig];
    }

    /**
     * 根据外部传入的props type来设置Area组件编辑框className样式表
     * @returns {*}
     */
    typeToClass() {
        const {type} = this.props;
        //在传入type且type类型为string时,Area组件编辑框用typeConfig中的指定className样式表类型;在不传入type、type为空或者type类型错误时,Area组件编辑框className样式表用图文类型作为默认类型
        return type ? typeConfig[type] : typeConfig[defaultTypeConfig];
    }

    /**
     * 根据外部传入的props className来设置Area组件编辑框className样式表
     * @returns {*}
     */
    outsideClassToClass() {
        const {
            //编辑框className,外部传入样式表
            className
        } = this.props;
        return className ? "keryi_barter_article_area " + className : "keryi_barter_article_area";
    }

    /**
     * render渲染placeholder区域
     * @returns string
     */
    renderPlaceHolder() {
        const {
            //Area组件编辑框默认提示语
            placeholder
        } = this.props;
        return placeholder !== null ? placeholder : "";
    }

    /**
     * 将html片段转化为value,实现Area编辑框内容改变事件
     * @param e
     * @returns {*}
     */
    createHtmlToValue(e) {
        const contentEdit = this.refs[defaultRefs];
        const newArea = contentEdit.innerHTML;
        e.target = {
            value: newArea
        };
        return e;
    }

    /**
     * Area编辑框onChange内容改变事件
     */
    onChangeAreaHandler(e) {
        const {
            //Area组件编辑框onChange内容改变事件,外部传入Area编辑框内容改变函数
            onChange
        } = this.props;
        const {
            //将html片段转化为value,实现Area编辑框内容改变事件
            createHtmlToValue
        } = this;
        if (!this.refs[defaultRefs]) return;
        //将html片段转化为value,实现Area编辑框内容改变事件
        e = createHtmlToValue.bind(this, e)();
        onChange(e);
    }

    /**
     * 将value转化为html片段插入Area组件编辑框中
     * @returns {*}
     */
    createValueToHtml() {
        const {value} = this.props;
        return {__html: value}
    }

    /**
     * 编辑框onFocusHandler控制聚焦事件
     */
    onFocusHandler() {
        const {
            //编辑框onFocus聚焦事件
            onFocus
        } = this.props;
        onFocus();
    }

    /**
     * 编辑框onBlurHandler控制失焦事件
     */
    onBlurHandler() {
        const {
            //编辑框onBlur失焦事件
            onBlur
        } = this.props;
        onBlur();
    }

    render() {
        const {
            //Area组件编辑框是否执行下拉选择框
            pullListDown
        } = this.props;
        const {
            //根据外部传入的props size来设置Area组件编辑框className样式表
            sizeToClass,
            //根据外部传入的props type来设置Area组件编辑框className样式表
            typeToClass,
            //根据外部传入的props className来设置Area组件编辑框className样式表
            outsideClassToClass,
            //placeholder区域
            renderPlaceHolder,
            //onChange内容改变事件
            onChangeAreaHandler,
            //将value转化为html片段插入Area组件编辑框中
            createValueToHtml,
            //编辑框onFocusHandler控制聚焦事件
            onFocusHandler,
            //编辑框onBlurHandler控制失焦事件
            onBlurHandler
        } = this;
        return (
            <section className={typeToClass.bind(this)() + " " + sizeToClass.bind(this)()}>
                <div
                    ref={defaultRefs}
                    suppressContentEditableWarning={true}
                    contentEditable={pullListDown ? "plaintext-only" : true}
                    onInput={onChangeAreaHandler.bind(this)}
                    onFocus={onFocusHandler.bind(this)}
                    onBlur={onBlurHandler.bind(this)}
                    className={outsideClassToClass.bind(this)()}
                    dangerouslySetInnerHTML={
                        createValueToHtml.bind(this)()
                    }
                    data-placeholder={renderPlaceHolder.bind(this)()}
                >
                </div>
            </section>
        )
    }
}

//导出Area编辑框组件
export default Area;