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
//时间处理器变量
let timer;

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
        onChange: PropTypes.func,
        //判断FigureCarousel组件图片轮播器中的图片组是否可关闭
        close: PropTypes.bool.isRequired
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
            imageList,
            //判断图片轮播器中的图片组是否可关闭
            close
        } = this.props;
        if ((imageList.length === 0 && nextProps.imageList.length > 0) || imageList.length !== nextProps.imageList.length) {
            this.setState({
                figureCarouselVisible: true,
                figureVisible: true
            });
            if (timer) {
                clearTimeout(timer);
            }
            //FIXME 这里设置一个时间控制器,FigureCarousel组件图片className样式表由隐藏变为显示动画500ms过渡之后,改变图片组移动距离
            timer = setTimeout(function timer() {
                (imageList.length >= nextProps.imageList.length) ? this.setState({
                    move: 0
                }) : !close ? this.setState({
                    move: 0
                }) : this.setState({
                    move: -(nextProps.imageList.length - 1)
                });
            }.bind(this), 500);
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
            onChange
        } = this.props;
        let index = 0;
        this.setState({
            figureVisible: false
        });
        if (imageList.length <= 0) {
            this.setState({
                figureCarouselVisible: false
            }, function figureCarouseler() {
                //FIXME 这里设置一个时间控制器,在FigureCarousel组件图片容器关闭时,先控制其所在的容器隐藏,在500ms之后设置其所在的容器改变其中的图片组或者关闭图片轮播器
                setTimeout(function timer() {
                    onChange(src);
                }.bind(this), 500);
            }.bind(this));
        } else {
            onChange(src);
        }
    }

    /**
     * render渲染FigureCarousel组件图片轮播器图片组
     */
    renderFigureCarousel() {
        const {
            //图片组
            imageList,
            //判断图片轮播器中的图片组是否可关闭
            close
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
                                style={{left: (move + imageIndex) * 100 + "%"}}
                                close={close}
                                onClose={onFigureCarouselControlClose.bind(this)}
                            />
                        )
                    }.bind(this))
                }
                {/*左右移动标志Icon*/}
                {imageList.length > 1 && renderMovePoint.bind(this)()}
            </section>
        );
    }

    /**
     * 点击左移动标志Icon,向左移动figureCarousel组件图片轮播器
     */
    moveLeft() {
        const {
            //图片组
            imageList
        } = this.props;
        const {
            //图片移动距离
            move
        } = this.state;
        if (move <= 0 && move > -(imageList.length - 1)) {
            this.setState({
                move: move - 1
            });
        } else {
            this.setState({
                move: 0
            });
        }
    }

    /**
     * 点击右移动标志Icon,向右移动figureCarousel组件图片轮播器
     */
    moveRight() {
        const {
            //图片组
            imageList
        } = this.props;
        const {
            //图片移动距离
            move
        } = this.state;
        if (move < 0) {
            this.setState({
                move: move + 1
            });
        } else {
            this.setState({
                move: -(imageList.length - 1)
            })
        }
    }

    /**
     * render渲染左右移动标志Icon
     * @returns {XML}
     */
    renderMovePoint() {
        const {
            //点击左移动标志Icon,向左移动figureCarousel组件图片轮播器
            moveLeft,
            //点击右移动标志Icon,向右移动figureCarousel组件图片轮播器
            moveRight
        } = this;
        return (
            <div className="keryi_barter_figureCarousel_movePoint">
                <i
                    className="iconfontKeryiBarter keryiBarter-left"
                    onClick={moveLeft.bind(this)}
                >

                </i>
                <i
                    className="iconfontKeryiBarter keryiBarter-right"
                    onClick={moveRight.bind(this)}
                >

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