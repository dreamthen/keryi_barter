/**
 * Created by yinwk on 2017/6/14.
 */
import React, {PropTypes} from "react";
import {SpinAnimation} from "../SpinAnimation";
import {Tag} from "../Tag";
import keryiCardConfig from "./configs/keryiCardConfig";
import "./keryi_barter_keryiCard.css";

//Card组件卡片"更多图片"设置过渡动画以及透明度对象属性
const loadingAppear = "loading";
//Card组件卡片"更多图片"设置消失(透明度为0)对象属性
const loadingDisappear = "loading_disAppear";

export class KeryiCard extends React.Component {
    static Proptypes = {
        //KeryiCard组件卡片用户名
        userName: PropTypes.string,
        //KeryiCard组件卡片标题
        title: PropTypes.string,
        //KeryiCard组件卡片上传图片数组
        imageList: PropTypes.array,
        //KeryiCard组件卡片资源介绍
        introduce: PropTypes.string,
        //KeryiCard组件卡片资源类型
        tagList: PropTypes.array,
        //KeryiCard组件卡片资源被需要数目
        needParty: PropTypes.number
    };

    constructor(props) {
        super(props);
        this.state = {
            //是否显示SpinAnimation组件动画加载
            loading: true,
            //是否动画操作透明度消除SpinAnimation组件动画加载容器
            disAppear: true,
            //是否显示剩下的多于3张的图片
            imageAppear: true
        }
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
        return (
            <header className="keryi_barter_card_header">
                {userName}
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
     * render渲染card加载更多图片区域
     * @returns {XML}
     */
    renderCardImageMore() {
        return (
            <section className="keryi_barter_card_image_more">

            </section>
        )
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
                        title={imageItem["name"]}
                        alt={imageItem["name"]}
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
     * render渲染card主要内容标题和介绍
     * @returns {XML}
     */
    renderDescription() {
        const {title, introduce} = this.props;
        return (
            <section className="keryi_barter_card_description">
                <header className="keryi_barter_card_title">
                    <h1>
                        {title}
                    </h1>
                </header>
                <p className="keryi_barter_card_paragraph">
                    {introduce}
                </p>
            </section>
        )
    }

    /**
     *
     * @returns {XML}
     */
    renderTag() {
        const {tagList} = this.props;
        return (
            <section className="keryi_barter_card_tag">
                {
                    tagList.map(function tager(tagItem, tagIndex) {
                        return (
                            <Tag>

                            </Tag>
                        )
                    })
                }
            </section>
        )
    }

    /**
     * render渲染card主要内容
     */
    renderCardInfo() {
        const {
            //card主要内容头部
            renderCardHead,
            //card主要内容图片
            renderCardImage,
            //点击SpinAnimation组件动画加载,点击加载更多图片
            loadingImage,
            //render渲染card主要内容标题和介绍
            renderDescription,
            //render渲染card主要内容标签
            renderTag
        } = this;
        const {
            //是否动画操作透明度消除SpinAnimation组件动画加载容器
            disAppear,
            //是否显示剩下的多于3张的图片
            imageAppear
        } = this.state;
        const {
            //KeryiCard组件卡片资源介绍
            introduce,
            //KeryiCard组件卡片资源类型
            tagList,
            //KeryiCard组件卡片资源被需要数目
            needParty
        } = this.props;
        return (
            <section className="keryi_barter_card_main">
                {/*card主要内容头部*/}
                {renderCardHead.bind(this)()}
                <main className="keryi_barter_card_mainContent">
                    {/*card主要内容图片*/}
                    {renderCardImage.bind(this)()}
                    {imageAppear &&
                    <div className={disAppear ? keryiCardConfig[loadingAppear] : keryiCardConfig[loadingDisappear]}>
                        <SpinAnimation
                            size="default"
                            onClick={
                                loadingImage.bind(this)
                            }
                        />
                    </div>}
                    {/*render渲染card主要内容标题和介绍*/}
                    {renderDescription.bind(this)()}
                    {/*render渲染card主要内容标签*/}
                    {renderTag.bind(this)()}
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