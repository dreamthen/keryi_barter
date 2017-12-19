/**
 * Created by yinwk on 2017/6/14.
 */
import React from "react";
import PropTypes from "prop-types";
import SpinAnimation from "../SpinAnimation";
import Tag from "../Tag";
import keryiCardConfig from "./configs/keryiCardConfig";
import viewDetailConfig from "./configs/viewDetailConfig";
import viewDetailAnimationConfig from "./configs/viewDetailAnimationConfig";
import "./keryi_barter_keryiCard.css";

//KeryiCard组件卡片"更多图片"设置过渡动画以及透明度对象属性
const loadingAppear = "loading";
//KeryiCard组件卡片"更多图片"设置消失(透明度为0)对象属性
const loadingDisappear = "loading_disAppear";
//KeryiCard组件卡片查看资源详情默认Icon配置
const defaultViewDetail = "default";
//KeryiCard组件卡片查看资源详情Icon默认动画状态
const defaultViewDetailAnimation = "default";
//KeryiCard组件卡片查看资源详情Icon移动动画状态
const moveViewDetailAnimation = "move";

/**
 * keryi_barter KeryiCard卡片组件
 */
class KeryiCard extends React.Component {
    static Proptypes = {
        //KeryiCard组件卡片用户名
        userName: PropTypes.string,
        //KeryiCard组件卡片标题
        title: PropTypes.string,
        //KeryiCard组件卡片上传图片数组
        imageList: PropTypes.array,
        //KeryiCard组件卡片资源介绍
        introduce: PropTypes.string,
        //KeryiCard组件卡片资源类型标签
        tagList: PropTypes.array,
        //KeryiCard组件卡片目标资源类型标签
        targetTagList: PropTypes.array,
        //KeryiCard组件卡片资源估值
        priceWorth: PropTypes.number,
        //KeryiCard组件卡片喜欢数目
        like: PropTypes.number,
        //KeryiCard组件卡片底部需要数和喜欢数显示控制
        control: PropTypes.array,
        //KeryiCard组件卡片查看资源详情icon className
        viewDetails: PropTypes.string,
        //KeryiCard组件卡片点击查看资源详情icon回调函数
        onViewDetails: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {
            //是否显示SpinAnimation组件动画加载
            loading: false,
            //是否动画操作透明度消除SpinAnimation组件动画加载容器
            disAppear: false,
            //是否显示剩下的多于3张的图片
            imageAppear: false,
            //查看资源详情Icon实现动画效果标识符
            viewDetailsMove: false
        }
    }

    componentDidMount() {
        const {
            imageList
        } = this.props;
        if (imageList.length > 3) {
            this.setState({
                loading: true,
                disAppear: true,
                imageAppear: true
            });
        }
    }

    /**
     * 根据state viewDetailMove来设置KeryiCard组件卡片动画效果
     * @returns {*}
     */
    viewDetailsMoveClassToClass() {
        const {
            //查看资源详情Icon实现动画效果标识符
            viewDetailsMove
        } = this.state;
        //根据state viewDetailsMove,如果state viewDetailsMove为true,就使用KeryiCard组件卡片查看资源详情Icon移动动画状态className样式表;如果state viewDetailsMove为false,就使用KeryiCard组件卡片查看资源详情Icon默认动画状态className样式表
        return viewDetailsMove ? viewDetailAnimationConfig[moveViewDetailAnimation] : viewDetailAnimationConfig[defaultViewDetailAnimation];
    }

    /**
     * 根据外部传入的props viewDetails来设置KeryiCard组件卡片查看资源详情icon className样式表
     * @returns {*}
     */
    outSideViewDetailClassToClass() {
        const {
            //KeryiCard组件卡片查看资源详情icon className
            viewDetails
        } = this.props;
        //根据外部传入的props viewDetail,如果外部传入的props viewDetails不为空,就使用外部传入的props viewDetails来设置KeryiCard组件卡片查看资源详情icon className样式表;如果外部传入的props viewDetails为空,就使用默认的KeryiCard组件卡片查看资源详情icon className样式表
        return viewDetails ? viewDetails : viewDetailConfig[defaultViewDetail];
    }

    /**
     * 移入card主要内容头部查看资源详情icon,实现移动动画状态className样式表
     * @param e
     */
    enterViewDetails(e) {
        this.setState({
            viewDetailsMove: true
        });
    }

    /**
     * 移出card主要内容头部查看资源详情icon,实现默认动画状态className样式表
     * @param e
     */
    leaveViewDetails(e) {
        this.setState({
            viewDetailsMove: false
        });
    }

    /**
     * render渲染card主要内容头部查看资源详情icon
     * @returns {XML}
     */
    renderCardViewDetail() {
        const {
            //KeryiCard组件卡片点击查看资源详情icon回调函数
            onViewDetails
        } = this.props;
        const {
            //根据外部传入的props viewDetails来设置KeryiCard组件卡片查看资源详情icon className样式表
            outSideViewDetailClassToClass,
            //根据state viewDetailMove来设置KeryiCard组件卡片动画效果
            viewDetailsMoveClassToClass,
            //移入card主要内容头部查看资源详情icon,实现移动动画状态className样式表
            enterViewDetails,
            //移出card主要内容头部查看资源详情icon,实现默认动画状态className样式表
            leaveViewDetails
        } = this;
        return (
            <aside
                className={viewDetailsMoveClassToClass.bind(this)()}
                onMouseEnter={enterViewDetails.bind(this)}
                onMouseLeave={leaveViewDetails.bind(this)}
                onClick={onViewDetails.bind(this)}
            >
                <i
                    className={outSideViewDetailClassToClass.bind(this)()}
                >

                </i>
                <span className="keryi_barter_card_viewDetail_description">查看资源详情</span>
            </aside>
        )
    }

    /**
     * render渲染card主要内容头部
     * @returns {XML}
     */
    renderCardHead() {
        const {
            //KeryiCard组件卡片用户名
            userName
        } = this.props;
        const {
            //card主要内容头部查看资源详情icon
            renderCardViewDetail
        } = this;
        return (
            <header className="keryi_barter_card_header">
                <dfn className="keryi_barter_card_userName">{userName}</dfn>
                {/*card主要内容头部查看资源详情icon*/}
                {renderCardViewDetail.bind(this)()}
            </header>
        )
    }

    /**
     * render渲染card主要内容图片
     * @returns {XML}
     */
    renderCardImage() {
        const {renderCardImagePartList, renderCardImageNull} = this;
        const {
            //KeryiCard组件卡片上传图片数组
            imageList
        } = this.props;
        const {
            //是否显示剩下的多于3张的图片
            imageAppear
        } = this.state;
        //如果存在imageList图片组且imageList图片组的数量大于0,就渲染card图片组(最多三张);如果不存在,就渲染返回null
        if (imageList && imageList.length > 0) {
            //将imageList图片组截取三张
            let imagePartList = (imageList.length > 3 && imageAppear) ? imageList.slice(0, 3) : imageList;
            //如果存在imageList图片组且imageList图片组的数量大于0,渲染card图片组(最多三张)
            return renderCardImagePartList.bind(this)(imagePartList);
        } else {
            //card主要内容图片为空时,返回null
            return renderCardImageNull.bind(this)();
        }
    }

    /**
     * render渲染card图片组(最多三张)
     * @param imageList
     */
    renderCardImagePartList(imageList) {
        return imageList.map(function imager(imageItem, imageIndex) {
            return (
                <figure
                    key={imageIndex}
                    className="keryi_barter_card_figure"
                >
                    <img
                        src={imageItem["src"]}
                        alt={imageItem["src"]}
                        className="keryi_barter_card_image"
                    />
                </figure>
            )
        }.bind(this));
    }

    /**
     * card主要内容图片为空时,render渲染返回null
     * @returns {null}
     */
    renderCardImageNull() {
        return null;
    }

    /**
     * render渲染card主要内容加载更多图片
     * returns {XML}
     */
    renderSpinAnimation() {
        const {
            //是否动画操作透明度消除SpinAnimation组件动画加载容器
            disAppear,
            //是否显示剩下的多于3张的图片
            imageAppear
        } = this.state;
        const {
            //点击SpinAnimation组件动画加载,点击加载更多图片
            loadingImage
        } = this;
        return imageAppear &&
            <div className={disAppear ? keryiCardConfig[loadingAppear] : keryiCardConfig[loadingDisappear]}>
                <SpinAnimation
                    size="default"
                    onClick={
                        loadingImage.bind(this)
                    }
                />
            </div>
    }

    /**
     * 点击SpinAnimation组件动画加载,点击加载更多图片
     */
    loadingImage() {
        //FIXME 这里设置一个时间控制器,3s后消除SpinAnimation组件动画加载
        setTimeout(function timerContainer() {
            this.setState({
                //消除SpinAnimation组件动画加载
                loading: false
            }, function afterState() {
                this.setState({
                    //动画操作透明度消除SpinAnimation组件动画加载容器
                    disAppear: false
                });
                //FIXME 这里设置一个时间控制器,0.5s后执行动画操作透明度消除SpinAnimation组件动画加载容器
                setTimeout(function timer() {
                    this.setState({
                        //是否显示剩下的多于3张的图片
                        imageAppear: false
                    });
                }.bind(this), 500);
            }.bind(this));
        }.bind(this), 3000);
    }

    /**
     * 设置介绍HTML文本
     * @returns {{__html}}
     */
    setInnerIntroduceHTML() {
        const {
            //KeryiCard组件卡片资源介绍
            introduce
        } = this.props;
        return {
            __html: introduce
        }
    }

    /**
     * render渲染card主要内容标题和介绍
     * @returns {XML}
     */
    renderDescription() {
        const {
            //KeryiCard组件卡片标题
            title
        } = this.props;
        const {
            //设置介绍HTML文本
            setInnerIntroduceHTML
        } = this;
        return (
            <section className="keryi_barter_card_description">
                <header className="keryi_barter_card_title">
                    <h1>
                        {title}
                    </h1>
                </header>
                <article
                    dangerouslySetInnerHTML={setInnerIntroduceHTML.bind(this)()}
                    className="keryi_barter_card_article"
                >
                </article>
                <hr className="keryi_barter_card_wire"/>
            </section>
        )
    }

    /**
     * render渲染card主要内容资源标签类型
     * @returns {XML}
     */
    renderTag() {
        const {
            //KeryiCard组件卡片资源标签类型
            tagList
        } = this.props;
        return (
            <section className="keryi_barter_card_tag">
                <h2 className="keryi_barter_card_tag_title">资源类型</h2>
                {
                    tagList.length > 0 && tagList.map(function tager(tagItem, tagIndex) {
                        return (
                            <Tag
                                key={tagItem["id"]}
                                type={tagItem["type"]}
                            >
                                {'#' + tagItem["tag"]}
                            </Tag>
                        )
                    })
                }
                <hr className="keryi_barter_card_wire"/>
            </section>
        )
    }

    /**
     * render渲染card主要内容目标资源标签类型
     * @returns {XML}
     */
    renderTargetTag() {
        const {
            //KeryiCard组件卡片目标资源标签类型
            targetTagList
        } = this.props;
        return (
            <section className="keryi_barter_card_targetTag">
                <h2 className="keryi_barter_card_targetTag_title">目标资源类型</h2>
                {
                    targetTagList.length > 0 && targetTagList.map(function targetTager(targetTagItem, targetTagIndex) {
                        return (
                            <Tag
                                key={targetTagItem["id"]}
                                type={targetTagItem["type"]}
                            >
                                {'#' + targetTagItem["tag"]}
                            </Tag>
                        )
                    })
                }
            </section>
        )
    }

    /**
     * render渲染card主要内容底部
     * @returns {XML}
     */
    renderCardFoot() {
        const {
            //KeryiCard组件卡片资源被需要数目
            priceWorth,
            //KeryiCard组件卡片底部需要数和喜欢数显示控制
            control
        } = this.props;
        return (
            <section
                className="keryi_barter_card_foot"
            >
                <article className="keryi_barter_card_priceWorth">
                    <dfn
                        className="keryi_barter_card_priceWorthDescription"
                        title={priceWorth + " 资源估值"}
                    >
                        {priceWorth} 资源估值
                    </dfn>
                </article>
                <aside className="keryi_barter_card_function">
                    <ul className="keryi_barter_card_function_ulList">
                        {
                            keryiCardConfig["card_function"].map(function configer(configItem, configIndex) {
                                return control.map(function controler(controlItem, controlIndex) {
                                    return (controlItem === configItem["key"]) && (
                                        <li
                                            key={configIndex}
                                            title={configItem["title"] + (configItem["key"] ? " " + this.props[configItem["key"]] : "")}
                                        >
                                            <i
                                                className={configItem["className"]}
                                            >

                                            </i>
                                            {configItem["key"] && <sub>
                                                {this.props[configItem["key"]]}
                                            </sub>}
                                        </li>
                                    );
                                }.bind(this));
                            }.bind(this))
                        }
                    </ul>
                </aside>
            </section>
        )
    }

    /**
     * render渲染card主要内容
     * @returns {XML}
     */
    renderCardInfo() {
        const {
            //card主要内容头部
            renderCardHead,
            //card主要内容图片
            renderCardImage,
            //card主要内容加载更多图片
            renderSpinAnimation,
            //card主要内容标题和介绍
            renderDescription,
            //card主要内容资源标签类型
            renderTag,
            //card主要内容目标资源标签类型
            renderTargetTag,
            //card主要内容底部
            renderCardFoot
        } = this;
        return (
            <section className="keryi_barter_card_main">
                {/*card主要内容头部*/}
                {renderCardHead.bind(this)()}
                <main className="keryi_barter_card_mainContent">
                    {/*card主要内容图片*/}
                    {renderCardImage.bind(this)()}
                    {/*card主要内容加载更多图片*/}
                    {renderSpinAnimation.bind(this)()}
                    {/*card主要内容标题和介绍*/}
                    {renderDescription.bind(this)()}
                    {/*card主要内容资源标签类型*/}
                    {renderTag.bind(this)()}
                    {/*card主要内容目标资源标签类型*/}
                    {renderTargetTag.bind(this)()}
                    {/*cord主要内容底部*/}
                    {renderCardFoot.bind(this)()}
                </main>
            </section>
        )
    }

    render() {
        const {renderCardInfo} = this;
        const {inputValue} = this.state;
        return (
            <div className="keryi_barter_card">
                {renderCardInfo.bind(this)()}
            </div>
        )
    }
}

//导出keryi_barter KeryiCard卡片组件
export default KeryiCard;