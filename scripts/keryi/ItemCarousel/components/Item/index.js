/**
 * Created by yinwk on 2017/7/16.
 */
import React from "react";
import PropTypes from "prop-types";
import HeadPortrait from "../../../HeadPortrait";
import Select from "../../../Select";
import itemConfig from "./configs/itemConfig";
import {styleConfig} from "./configs/styleConfig";
import "./keryi_barter_item.css";

//keryi_barter表单下拉框组件Option选项组件
const Option = Select.Option;
//Item组件元素className样式表显示设置
const itemShow = "itemShow";
//Item组件元素className样式表隐藏设置
const item = "item";
//Item组件元素className样式表消失设置
const itemDisappear = "itemDisappear";

//keryi_barter Item元素组件
class Item extends React.Component {
    static propTypes = {
        //Item组件元素是否显示
        visible: PropTypes.bool,
        //Item组件元素地址
        src: PropTypes.string,
        //Item组件元素className,外部传入样式表
        className: PropTypes.string,
        //Item组件元素关闭方法,外部传入函数
        onClose: PropTypes.func,
        //Item组件元素改变表单下拉框选项状态方法,外部传入函数
        onSelect: PropTypes.func,
        //Item组件内联样式,外部传入内联样式
        style: PropTypes.object,
        //判断Item组件元素组是否可关闭
        close: PropTypes.bool.isRequired,
        //判断Item组件元素是否显示描述浮层
        hover: PropTypes.bool,
        //Item组件元素浮层内容(标题、描述内容、喜欢数以及资源估值数)
        hoverContent: PropTypes.object,
        //Item组件元素浮层统计Mode配置
        hoverStatisticsConfig: PropTypes.array,
        //Item组件元素状态Mode配置
        exchangeStatusConfig: PropTypes.array
    };

    constructor(props) {
        super(props);
        this.state = {
            //Item组件元素className样式表控制所在的容器消失或者隐藏
            itemVisible: false,
            //Item组件元素className样式表控制所在的容器显示或者隐藏
            itemAnimation: false,
            //Item组件元素表单下拉框选项状态,初始化为"交换中"状态
            exchangingStatus: this.props.exchangeStatusConfig[1]["key"]
        }
    }

    /**
     * 组件开始装载
     */
    componentWillMount() {

    }

    componentWillReceiveProps(nextProps) {
        const {
            //元素是否显示
            visible
        } = this.props;
        visible !== nextProps.visible && nextProps.visible && this.setState({
            itemVisible: nextProps.visible
        }, function animationer() {
            //FIXME 这里设置一个时间控制器,在Item组件元素容器开启时,先控制其所在的容器隐藏,在100ms之后设置其所在的容器显示
            setTimeout(function timer() {
                this.setState({
                    itemAnimation: nextProps.visible
                });
            }.bind(this), 100);
        }.bind(this));
    }

    /**
     * 组件结束装载
     */
    componentDidMount() {
        const {
            //元素是否显示
            visible
        } = this.props;
        visible && this.setState({
            itemVisible: visible
        }, function animationer() {
            //FIXME 这里设置一个时间控制器,在Item组件元素容器开启时,先控制其所在的容器隐藏,在100ms之后设置其所在的容器显示
            setTimeout(function timer() {
                this.setState({
                    itemAnimation: visible
                });
            }.bind(this), 100);
        }.bind(this));
    }

    /**
     * 根据外部传入的props className来设置Item组件元素的className样式表
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
     * 根据外部传入的state itemVisible和state itemAnimation来设置Item组件元素的className样式表
     * @returns {string}
     */
    itemVisibleOrAnimationToClass() {
        const {
            //元素className样式表控制所在的容器消失或者隐藏
            itemVisible,
            //元素className样式表控制所在的容器显示或者隐藏
            itemAnimation
        } = this.state;
        return !itemVisible ? itemConfig[itemDisappear] : itemAnimation ? itemConfig[itemShow] : itemConfig[item];
    }

    /**
     * Item组件元素容器关闭方法
     */
    onItemClose() {
        const {
            //元素关闭方法,外部传入函数
            onClose
        } = this.props;
        this.setState({
            itemAnimation: false
        }, function itemer() {
            //FIXME 这里设置一个时间控制器,在Item组件元素容器关闭时,先控制其所在的容器隐藏,在500ms之后设置其所在的容器消失
            setTimeout(function timer() {
                this.setState({
                    itemVisible: false
                });
                onClose();
            }.bind(this), 500);
        }.bind(this));
    }

    /**
     * Item组件元素改变表单下拉框选项状态方法
     */
    onItemSelect(value) {
        const {
            //元素改变表单下拉框选项状态方法,外部传入函数
            onSelect
        } = this.props;
        this.setState({
            itemAnimation: false,
            exchangingStatus: value
        }, function itemer() {
            //FIXME 这里设置一个时间控制器,在Item组件元素容器关闭时,先控制其所在的容器隐藏,在500ms之后设置其所在的容器消失
            setTimeout(function timer() {
                this.setState({
                    itemVisible: false
                });
                onSelect(value);
            }.bind(this), 500);
        }.bind(this));
    }

    render() {
        const {
            //元素是否显示
            src,
            //内联样式,外部传入内联样式
            style,
            //判断元素组是否可以关闭
            close,
            //判断元素是否显示描述浮层
            hover,
            //元素浮层内容(标题、描述内容、喜欢数以及资源估值数)
            hoverContent,
            //元素浮层统计Mode配置
            hoverStatisticsConfig,
            //元素状态Mode配置
            exchangeStatusConfig
        } = this.props;
        const {
            //元素表单下拉框选项状态
            exchangingStatus
        } = this.state;
        const {
            //根据外部传入的props className来设置Item组件元素的className样式表
            outsideClassToClass,
            //根据外部传入的state itemVisible和state itemAnimation来设置Item组件元素的className样式表
            itemVisibleOrAnimationToClass,
            //Item元素组件关闭方法
            onItemClose,
            //Item组件元素改变表单下拉框选项状态方法
            onItemSelect
        } = this;
        console.log(hoverContent);
        return (
            <figure
                className={itemVisibleOrAnimationToClass.bind(this)() + outsideClassToClass.bind(this)()}
                style={Object.assign({}, styleConfig(src), style)}
            >
                {
                    hover && <section
                        className="keryi_barter_item_hover"
                    >
                        <h4 className="keryi_barter_item_hover_title">
                            {hoverContent["title"]}
                        </h4>
                        <dfn className="keryi_barter_item_hover_introduce">
                            {hoverContent["intro"]}
                        </dfn>
                        <ul className="keryi_barter_item_hover_uiList">
                            {
                                hoverStatisticsConfig.map(function statisticser(hoverStatisticsItem, hoverStatisticsIndex) {
                                    return (
                                        <li
                                            key={hoverStatisticsItem["key"]}
                                            title={hoverContent[hoverStatisticsItem["key"]] + " " + hoverStatisticsItem["title"]}
                                        >
                                            <i className={hoverStatisticsItem["className"]}>

                                            </i>
                                            <dfn className="keryi_barter_item_hover_description">
                                                {hoverContent[hoverStatisticsItem["key"]]}
                                            </dfn>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </section>
                }
                <cite className="keryi_barter_item_user">
                    <figure className="keryi_barter_item_user_avatar">
                        <HeadPortrait
                            headPortrait={hoverContent["user"]["id"] ? hoverContent["userAvatar"] : "/images/keryiBarter_v.png"}
                            borderJudgement
                        />
                    </figure>
                    <figcaption className="keryi_barter_item_user_description">
                        {hoverContent["user"]["username"]}
                    </figcaption>
                    {
                        exchangeStatusConfig.map(function exchangerStatus(exchangeStatusItem, exchangeStatusIndex) {
                            return (exchangeStatusItem["key"] === hoverContent["status"] && exchangeStatusItem["key"] === exchangeStatusConfig[1]["key"]) ?
                                <Select
                                    key={exchangeStatusIndex}
                                    value={exchangingStatus}
                                    onChange={onItemSelect.bind(this)}
                                    className="keryi_barter_item_user_select"
                                    dropdownClassName="keryi_barter_item_user_select_dropDown"
                                >
                                    {
                                        exchangeStatusConfig.map(function exchangerOptionStatus(exchangeOptionStatusItem, exchangeOptionStatusIndex) {
                                            return (
                                                <Option
                                                    key={exchangeOptionStatusIndex}
                                                    value={exchangeOptionStatusItem["key"]}
                                                >
                                                    <i
                                                        className={exchangeOptionStatusItem["className"]}
                                                        title={exchangeOptionStatusItem["value"]}
                                                    >

                                                    </i>
                                                </Option>
                                            )
                                        })
                                    }
                                </Select> : (exchangeStatusItem["key"] === hoverContent["status"] && exchangeStatusItem["key"] !== exchangeStatusConfig[1]["key"]) ?
                                    <i
                                        key={exchangeStatusIndex}
                                        className={exchangeStatusItem["className"]}
                                        title={exchangeStatusItem["value"]}
                                    >

                                    </i> : null
                        }.bind(this))
                    }
                </cite>
                {
                    close && <i
                        className="iconfontKeryiBarter keryiBarter-close"
                        onClick={onItemClose.bind(this)}
                    >
                    </i>
                }
            </figure>
        )
    }
}

//导出keryi_barter Item元素组件
export default Item;