/**
 * Created by yinwk on 2017/7/15.
 */
import React, {PropTypes} from "react";
import Figure from "./components/Figure";
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
        //FigureCarousel组件图片轮播器图片组
        imageList: PropTypes.array,
        //FigureCarousel组件图片轮播器className,外部传入样式表
        className: PropTypes.string,
        //改变FigureCarousel组件图片轮播器中的图片组或者关闭FigureCarousel组件图片轮播器方法,外部传入函数
        onImageListChange: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {
            //FigureCarousel组件图片轮播器className样式表控制所在的容器显示或者隐藏
            figureCarouselVisible: false,
            //FigureCarousel组件图片className样式表控制所在的容器消失或者隐藏
            figureVisible: false,
            //FigureCarousel组件图片移动距离
            move: 0
        }
    }

    /**
     * 组件开始装载
     */
    componentWillMount() {

    }

    componentWillReceiveProps(nextProps) {
        const {
            //图片轮播器图片组
            imageList
        } = this.props;
        if (imageList.length > 0) {
            this.setState({
                figureCarouselVisible: true,
                figureVisible: true
            });
        }
    }

    /**
     * 根据外部传入的props className来设置FigureCarousel组件图片轮播器容器的className样式表
     * @returns {*}
     */
    outsideClassToClass() {
        const {
            className
        } = this.props;
        return className ? " " + className : "";
    }

    /**
     * 根据props ImageList数组和state figureCarouselVisible来设置FigureCarousel组件图片轮播器的className样式表
     * @returns {string}
     */
    figureCarouselVisibleOrImageListToClass() {
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
     * FigureCarousel组件图片轮播器控制Figure组件图片关闭,外部传入的关闭方法
     */
    onFigureCarouselControlClose(src) {
        const {
            //图片组
            imageList,
            //改变FigureCarousel组件图片轮播器中的图片组或者关闭FigureCarousel组件图片轮播器方法,外部传入函数
            onImageListChange
        } = this.props;
        let index = 0;
        this.setState({
            figureVisible: false
        });
        imageList.forEach(function imageLister(imageItem, imageIndex) {
            if (src === imageItem["src"]) {
                index = imageIndex;
                return false;
            }
        });
        imageList.splice(index, 1);
        if (imageList.length <= 0) {
            this.setState({
                figureCarouselVisible: false
            }, function figureCarouseler() {
                //FIXME 这里设置一个时间控制器,在FigureCarousel组件图片容器关闭时,先控制其所在的容器隐藏,在500ms之后设置其所在的容器改变其中的图片组或者关闭图片轮播器
                setTimeout(function timer() {
                    onImageListChange(imageList);
                }, 500);
            }.bind(this));
        }
    }

    /**
     * render渲染FigureCarousel组件图片轮播器图片组
     */
    renderFigureCarousel() {
        const {
            //图片组
            imageList
        } = this.props;
        const {
            //图片className样式表控制所在的容器消失或者隐藏
            figureVisible,
            //图片移动距离
            move
        } = this.state;
        const {
            //图片轮播器控制Figure组件图片关闭,外部传入的关闭方法
            onFigureCarouselControlClose,
            //左右移动标志Icon
            renderMovePoint
        } = this;
        return (
            <section className="keryi_barter_figureCarousel_figure">
                {
                    imageList.map(function imageLister(imageItem, imageIndex) {
                        return (
                            <Figure
                                key={imageIndex}
                                visible={figureVisible}
                                src={imageItem["src"]}
                                style={{left: imageIndex * 100 + move + "%"}}
                                onClose={onFigureCarouselControlClose.bind(this)}
                            />
                        )
                    }.bind(this))
                }
                {/*左右移动标志Icon*/}
                {renderMovePoint.bind(this)()}
            </section>
        );
    }

    /**
     * render渲染左右移动标志Icon
     * @returns {XML}
     */
    renderMovePoint() {
        const {

        } = this;
        return (
            <div className="keryi_barter_figureCarousel_movePoint">
                <i className="iconfontKeryiBarter keryiBarter-left">

                </i>
                <i className="iconfontKeryiBarter keryiBarter-right">

                </i>
            </div>
        )
    }

    render() {
        const {
            //根据外部传入的props className来设置FigureCarousel组件图片轮播器容器的className样式表
            outsideClassToClass,
            //根据props ImageList数组和state figureCarouselVisible来设置FigureCarousel组件图片轮播器的className样式表
            figureCarouselVisibleOrImageListToClass,
            //图片轮播器图片组
            renderFigureCarousel
        } = this;
        return (
            <section
                className={figureCarouselVisibleOrImageListToClass.bind(this)() + outsideClassToClass.bind(this)()}>
                {/*图片轮播器图片组*/}
                {renderFigureCarousel.bind(this)()}
            </section>
        )
    }
}

//导出keryi_barter FigureCarousel图片轮播器组件
export default FigureCarousel;