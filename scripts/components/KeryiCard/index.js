/**
 * Created by yinwk on 2017/6/14.
 */
import React, {PropTypes} from "react";
import "./keryi_barter_keryiCard.css";

export class KeryiCard extends React.Component {
    static Proptypes = {
        //KeryiCard组件卡片用户名
        userName: PropTypes.string,
        //KeryiCard组件卡片标题
        titile: PropTypes.string,
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
        this.state = {}
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
        //如果存在imageList图片组且imageList图片组的数量大于0,就渲染card图片组(最多三张);如果不存在,就渲染返回null
        if (imageList && imageList.length > 0) {
            //将imageList图片组截取三张
            let imagePartList = imageList.length > 3 ? imageList.slice(0, 3) : imageList;
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
                        src={imageItem["imageSrc"]}
                        title={imageItem["imageName"]}
                        alt={imageItem["imageName"]}
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
     * render渲染card主要内容
     */
    renderCardInfo() {
        const {
            //card主要内容头部
            renderCardHead,
            //card主要内容图片
            renderCardImage,
            //card加载更多图片区域
            renderCardImageMore
        } = this;
        const {
            //KeryiCard组件卡片上传图片数组
            imageList,
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
                    {/*card加载更多图片区域*/}
                    {imageList.length > 3 && renderCardImageMore.bind(this)()}
                </main>
            </section>
        )
    }

    render() {
        const {renderCardInfo} = this;
        return (
            <div className="keryi_barter_card">
                {renderCardInfo.bind(this)()}
            </div>
        )
    }
}