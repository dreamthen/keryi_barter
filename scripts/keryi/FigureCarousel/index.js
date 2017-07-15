/**
 * Created by yinwk on 2017/7/15.
 */
import React, {PropTypes} from "react";
import figureCarouselConfig from "./configs/figureCarouselConfig";
import "./keryi_barter_figureCarousel.css";
//FigureCarousel组件图片轮播器显示样式表配置
const figureCarouselShow = "figureCarouselShow";
//FigureCarousel组件图片轮播器隐藏样式表配置
const figureCarousel = "figureCarousel";
//FigureCarousel组件图片轮播器消失样式表配置
const figureCarouselDisappear = "figureCarouselDisappear";

/**
 * keryi_barter FigureCarousel图片轮播器组件
 */
class FigureCarousel extends React.Component {
    static propTypes = {
        //FigureCarousel组件图片组
        imageList: PropTypes.array,
        //FigureCarousel组件图片轮播器className,外部传入样式表
        className: PropTypes.string
    };

    constructor(props) {
        super(props);
        this.state = {
            //FigureCarousel组件图片轮播器className样式表控制所在的容器显示或者隐藏
            figureCarouselVisible: false
        }
    }

    /**
     * 组件开始装载
     */
    componentWillMount() {

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.imageList && nextProps.imageList > 0) {
            this.setState({
                figureCarouselVisible: true
            });
        }
    }

    /**
     * 根据外部传入的props className来设置FigureCarousel组件图片轮播器容器的className样式表
     * @returns {*}
     */
    outsideClassNameToClassName() {
        const {
            className
        } = this.props;
        return className ? " " + className : "";
    }

    /**
     * 根据props ImageList数组和state figureCarouselVisible来设置FigureCarousel组件图片轮播器的className样式表
     * @returns {string}
     */
    figureCarouselVisibleOrImageListToClassName() {
        const {
            //图片组
            imageList
        } = this.props;
        const {
            //图片轮播器className样式表控制所在的容器显示或者隐藏
            figureCarouselVisible
        } = this.state;
        return (!imageList || imageList.length <= 0) ? figureCarouselConfig[figureCarouselDisappear] : figureCarouselVisible ? figureCarouselConfig[figureCarouselShow] : figureCarouselConfig[figureCarousel];
    }

    /**
     * render渲染FigureCarousel组件图片轮播器图片组
     */
    renderFigureCarousel() {
        const {
            //图片组
            imageList
        } = this.props;
        return imageList.map(function imageLister(imageItem, imageIndex) {
            return (
                <figure
                    key={imageIndex}
                    className="keryi_barter_figureCarousel_figure"
                    style={{background: "url(" + imageItem["src"] + ") no-repeat center center/cover border-box content-box"}}
                >
                    <i className="iconfontKeryiBarter keryiBarter-close">

                    </i>
                </figure>
            )
        });
    }

    render() {
        const {
            //根据外部传入的props className来设置FigureCarousel组件图片轮播器容器的className样式表
            outsideClassNameToClassName,
            //根据props ImageList数组和state figureCarouselVisible来设置FigureCarousel组件图片轮播器的className样式表
            figureCarouselVisibleOrImageListToClassName,
            //FigureCarousel组件图片轮播器图片组
            renderFigureCarousel
        } = this;
        return (
            <section
                className={figureCarouselVisibleOrImageListToClassName.bind(this)() + outsideClassNameToClassName.bind(this)()}>
                {renderFigureCarousel.bind(this)()}
            </section>
        )
    }
}

//导出keryi_barter FigureCarousel图片轮播器组件
export default FigureCarousel;