/**
 * Created by yinwk on 2017/7/15.
 */
import React, {PropTypes} from "react";
import Figure from "./components/Figure";
import ItemCarouselConfig from "./configs/ItemCarouselConfig";
import "./keryi_barter_ItemCarousel.css";
//FigureCarousel组件图片轮播器显示样式表配置
const itemCarouselShow = "itemCarouselShow";
//FigureCarousel组件图片轮播器隐藏样式表配置
const itemCarousel = "itemCarousel";
//FigureCarousel组件图片轮播器消失样式表配置
const itemCarouselDisappear = "itemCarouselDisappear";
//时间处理器变量
let timer;

/**
 * keryi_barter ItemCarousel元素轮播器组件
 */
class ItemCarousel extends React.Component {
    static propTypes = {
        //ItemCarousel组件元素轮播器元素组
        itemList: PropTypes.array,
        //ItemCarousel组件元素轮播器可显示的元素个数
        split: PropTypes.number,
        //ItemCarousel组件元素轮播器className,外部传入样式表
        className: PropTypes.string,
        //改变ItemCarousel组件元素轮播器中的元素组或者关闭ItemCarousel组件元素轮播器方法,外部传入函数
        onChange: PropTypes.func,
        //判断ItemCarousel组件元素轮播器中的元素组是否可关闭
        close: PropTypes.bool.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            //ItemCarousel组件元素轮播器className样式表控制所在的容器显示或者隐藏
            itemCarouselVisible: false,
            //ItemCarousel组件元素className样式表控制所在的容器消失或者隐藏
            itemVisible: false,
            //ItemCarousel组件元素移动距离
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
            //元素轮播器元素组
            itemList,
            //判断元素轮播器中的元素组是否可关闭
            close
        } = this.props;
        if ((itemList.length === 0 && nextProps.itemList.length > 0) || itemList.length !== nextProps.itemList.length) {
            this.setState({
                itemCarouselVisible: true,
                itemVisible: true
            });
            if (timer) {
                clearTimeout(timer);
            }
            //FIXME 这里设置一个时间控制器,ItemCarousel组件元素className样式表由隐藏变为显示动画500ms过渡之后,改变元素组移动距离
            timer = setTimeout(function timer() {
                (itemList.length > nextProps.itemList.length) ? this.setState({
                    move: 0
                }) : !close ? this.setState({
                    move: 0
                }) : this.setState({
                    move: -(nextProps.itemList.length - 1)
                });
            }.bind(this), 500);
        }
    }

    /**
     * 根据外部传入的props className来设置ItemCarousel组件元素轮播器容器的className样式表
     * @returns {*}
     */
    outsideClassToClass() {
        const {
            className
        } = this.props;
        return className ? " " + className : "";
    }

    /**
     * 根据props ItemList数组和state itemCarouselVisible来设置ItemCarousel组件元素轮播器的className样式表
     * @returns {string}
     */
    itemCarouselVisibleOrImageListToClass() {
        const {
            //元素组
            itemList
        } = this.props;
        const {
            //图片轮播器className样式表控制所在的容器显示或者隐藏
            itemCarouselVisible
        } = this.state;
        return (!itemList || itemList.length <= 0) ? ItemCarouselConfig[itemCarouselDisappear] : itemCarouselVisible ? ItemCarouselConfig[itemCarouselShow] : ItemCarouselConfig[itemCarousel];
    }

    /**
     * ItemCarousel组件元素轮播器控制Item组件元素关闭,外部传入的关闭方法
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
     * render渲染ItemCarousel组件元素轮播器元素组
     */
    renderFigureCarousel() {
        const {
            //元素组
            itemList,
            //判断元素轮播器中的元素组是否可关闭
            close
        } = this.props;
        const {
            //元素className样式表控制所在的容器消失或者隐藏
            itemVisible,
            //元素移动距离
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
                    itemList.map(function itemLister(itemItem, itemIndex) {
                        return (
                            <Figure
                                key={itemIndex}
                                visible={itemVisible}
                                src={itemItem["src"]}
                                style={{left: (move + itemIndex) * 100 + "%"}}
                                close={close}
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
            //根据外部传入的props className来设置ItemCarousel组件图片轮播器容器的className样式表
            outsideClassToClass,
            //根据props itemList数组和state itemCarouselVisible来设置ItemCarousel组件元素轮播器的className样式表
            itemCarouselVisibleOrImageListToClass,
            //图片轮播器图片组
            renderFigureCarousel
        } = this;
        return (
            <section
                className={itemCarouselVisibleOrImageListToClass.bind(this)() + outsideClassToClass.bind(this)()}>
                {/*图片轮播器图片组*/}
                {renderFigureCarousel.bind(this)()}
            </section>
        )
    }
}

//导出keryi_barter ItemCarousel元素轮播器组件
export default ItemCarousel;