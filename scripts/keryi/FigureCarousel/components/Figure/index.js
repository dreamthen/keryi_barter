/**
 * Created by yinwk on 2017/7/16.
 */
import React, {PropTypes} from "react";
import figureConfig from "./configs/figureConfig";
import "./keryi_barter_figure.css";

//Figure组件图片className样式表显示设置
const figureShow = "figureShow";
//Figure组件图片className样式表隐藏设置
const figure = "figure";
//Figure组件图片className样式表消失设置
const figureDisappear = "figureDisappear";

//keryi_barter Figure图片组件
class Figure extends React.Component {
    static propTypes = {
        //Figure组件图片是否显示
        visible: PropTypes.bool,
        //Figure组件图片地址
        src: PropTypes.string,
        //Figure组件图片className,外部传入样式表
        className: PropTypes.string,
        //Figure组件图片关闭方法,外部传入函数
        onClose: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {
            //Figure组件图片className样式表控制所在的容器显示或者隐藏
            figureVisible: false
        }
    }

    /**
     * 组件开始装载
     */
    componentWillMount(){

    }

    componentWillReceiveProps(nextProps) {
        const {
            //图片是否显示
            visible
        } = this.props;
        if (visible !== nextProps.visible) {
            this.setState({
                figureVisible: nextProps.visible
            });
        }
    }

    /**
     * 根据外部传入的props className来设置Figure组件图片的className样式表
     * @returns {string}
     */
    outsideClassToClass() {
        const {
            //图片className,外部传入样式表
            className
        } = this.props;
        return className ? " " + className : "";
    }

    /**
     * 根据外部传入的props visible和state figureVisible来设置Figure组件图片的className样式表
     * @returns {string}
     */
    visibleOrFigureVisibleToClass() {
        const {
            //图片是否显示
            visible
        } = this.props;
        const {
            //图片className样式表控制所在的容器显示或者隐藏
            figureVisible
        } = this.state;
        return !visible ? figureConfig[figureDisappear] : figureVisible ? figureConfig[figureShow] : figureConfig[figure];
    }

    /**
     * Figure组件图片容器关闭方法
     */
    onFigureClose(src) {
        const {
            //图片关闭方法,外部传入函数
            onClose
        } = this.props;
        this.setState({
            figureVisible: false
        }, function figurer() {
            //FIXME 这里设置一个时间控制器,在Figure组件图片容器关闭时,先控制其所在的容器隐藏,在500ms之后设置其所在的容器消失
            setTimeout(function timer() {
                onClose(src);
            }.bind(this), 500);
        }.bind(this));
    }

    render() {
        const {
            //图片是否显示
            src
        } = this.props;
        const {
            //根据外部传入的props className来设置Figure组件图片的className样式表
            outsideClassToClass,
            //根据外部传入的props visible和state figureVisible来设置Figure组件图片的className样式表
            visibleOrFigureVisibleToClass,
            //Figure图片组件关闭方法
            onFigureClose
        } = this;
        return (
            <figure
                className={visibleOrFigureVisibleToClass.bind(this)() + outsideClassToClass.bind(this)()}
                style={{background: "url(" + src + ") no-repeat center center/cover border-box content-box"}}
            >
                <i
                    className="iconfontKeryiBarter keryiBarter-close"
                    onClick={onFigureClose.bind(this, src)}
                >

                </i>
            </figure>
        )
    }
}

//导出keryi_barter Figure图片组件
export default Figure;