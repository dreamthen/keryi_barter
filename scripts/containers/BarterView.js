/**
 * Created by yinwk on 2017/6/13.
 */
import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {
    FigureCarousel,
    HeadPortrait,
    KeryiCard,
    Modal
} from "../keryi";
import {
    //获取资源列表Action
    getResourcesList,
    //获取资源详情Action
    getResourcesListViewDetailsAction,
    //获取资源详情用户头像Action
    getUserHeadPortraitViewDetail
} from "../actions/barterActions";
import keryiCardDefaultConfig from "../configs/keryiCardDefaultConfig";
import "../../stylesheets/barter.css";

class BarterView extends React.Component {
    static propTypes = {
        //获取资源数据列表
        list: PropTypes.array,
        //资源数据列表页码
        current: PropTypes.number,
        //资源详情用户头像
        viewDetailHeadPortrait: PropTypes.string,
        //资源详情用户名
        viewDetailUserName: PropTypes.string,
        //资源详情上传图片数组
        viewDetailImageList: PropTypes.string,
        //资源详情标题
        viewDetailTitle: PropTypes.string,
        //资源详情资源介绍
        viewDetailIntroduce: PropTypes.string,
        //资源详情被需要数目
        viewDetailNeedParty: PropTypes.number
    };

    constructor(props) {
        super(props);
        this.state = {
            //控制Modal组件对话框显示、隐藏或者消失
            viewBarterVisible: false
        }
    }

    /**
     * 组件开始装载
     */
    componentWillMount() {
    }

    /**
     * 组件结束装载
     */
    componentDidMount() {
        const {
            //dispatch获取资源数据列表
            dispatchResourceList
        } = this.props;
        dispatchResourceList.bind(this)();
    }

    /**
     * render渲染用户头像
     * @returns {XML}
     */
    renderHeadPortrait(headPortraitSrc) {
        return (
            <figure
                className="keryi_barter_head_portrait"
            >
                <HeadPortrait
                    headPortrait={headPortraitSrc}
                />
            </figure>
        )
    }

    /**
     * render渲染用户资源卡片
     * @returns {XML}
     */
    renderKeryiCard(keryiCard) {
        const {
            //控制Modal组件对话框显示
            viewKeryiBarterHandler
        } = this.props;
        return (
            <div
                className="keryi_barter_card_container"
            >
                <KeryiCard
                    userName="1000yardStyle"
                    imageList={eval("(" + keryiCard["imgUrls"] + ")")}
                    title={keryiCard["title"]}
                    introduce={keryiCard["intro"]}
                    tagList={[{
                        type: "primary",
                        content: "react"
                    }, {
                        type: "primary",
                        content: "react-redux"
                    }, {
                        type: "primary",
                        content: "react-router-redux"
                    }]}
                    needParty={keryiCard["price_worth"]}
                    viewDetails="iconfontKeryiBarter keryiBarter-moreInformation"
                    onViewDetails={viewKeryiBarterHandler.bind(this, keryiCard)}
                />
            </div>
        )
    }

    /**
     * keryi_barter主页面查看"以物换物"资源详情对话框头部
     * @returns {XML}
     */
    renderModalHeader() {
        const {
            //资源详情用户头像
            viewDetailHeadPortrait,
            //资源详情用户名
            viewDetailUserName,
            //资源详情标题
            viewDetailTitle
        } = this.props;
        return (
            <header className="keryi_barter_view_details_head">
                <figure
                    className="keryi_barter_view_details_head_portrait"
                >
                    <HeadPortrait
                        headPortrait={viewDetailHeadPortrait}
                    />
                </figure>
                <dfn className="keryi_barter_view_details_description">
                    <h3 className="keryi_barter_view_details_title">
                        {viewDetailTitle}
                    </h3>
                    <cite className="keryi_barter_view_details_userName">
                        资源由 <abbr className="keryi_barter_view_details_name">{viewDetailUserName}</abbr> 发布
                    </cite>
                </dfn>
            </header>
        )
    }

    /**
     * keryi_barter主页面查看"以物换物"资源详情对话框图片轮播器
     * @returns {XML}
     */
    renderModalFigureCarousel() {
        const {
            //资源详情上传图片数组
            viewDetailImageList
        } = this.props;
        return (
            <section className="keryi_barter_view_details_figure_carousel">
                <FigureCarousel
                    close={false}
                    imageList={eval("(" + viewDetailImageList + ")")}
                />
            </section>
        )
    }

    /**
     * keryi_barter主页面查看"以物换物"资源详情对话框主体介绍
     * @returns {XML}
     */
    renderModalIntroduce(){
        const {
            //资源详情资源介绍
            viewDetailIntroduce
        } = this.props;
        return (
            <section className="keryi_barter_view_details_introduce">
                <p className="keryi_barter_view_details_introduce_content">
                    {viewDetailIntroduce}
                </p>
            </section>
        )
    }

    /**
     * keryi_barter主页面查看"以物换物"资源详情对话框
     * @returns {XML}
     */
    renderModal() {
        const {
            //keryi_barter主页面查看"以物换物"资源详情对话框头部
            renderModalHeader,
            //keryi_barter主页面查看"以物换物"资源详情对话框图片轮播器
            renderModalFigureCarousel,
            //keryi_barter主页面查看"以物换物"资源详情对话框主体介绍
            renderModalIntroduce
        } = this;
        const {
            //控制Modal组件对话框显示、隐藏或者消失
            viewBarterVisible
        } = this.state;
        const {
            //资源详情被需要数目
            viewDetailNeedParty,
            //控制Modal组件对话框隐藏并消失
            closeBarterVisibleHandler
        } = this.props;
        return (
            <Modal
                visible={viewBarterVisible}
                width={660}
                closable
                className="keryi_barter_modal_view_details_container"
                onClose={closeBarterVisibleHandler.bind(this)}
            >
                {/*keryi_barter主页面查看"以物换物"资源详情对话框头部*/}
                {renderModalHeader.bind(this)()}
                {/*keryi_barter主页面查看"以物换物"资源详情对话框图片轮播器*/}
                {renderModalFigureCarousel.bind(this)()}
                {/*keryi_barter主页面查看"以物换物"资源详情对话框主体介绍*/}
                {renderModalIntroduce.bind(this)()}
            </Modal>
        )
    }

    /**
     * render渲染keryi_barter主页面主要内容
     * @returns {XML}
     */
    render() {
        const {
            //获取资源数据列表
            list
        } = this.props;
        const {
            //render渲染用户头像
            renderHeadPortrait,
            //render渲染用户资源卡片
            renderKeryiCard,
            //keryi_barter主页面查看"以物换物"资源详情对话框
            renderModal
        } = this;
        return (
            <div className="keryi_barter_main_container">
                <div className="keryi_barter_main_module keryi_barter_main_barterList">
                    {
                        (list && list.length > 0) ? list.map(function lister(listItem, listIndex) {
                                return (
                                    <article
                                        key={listIndex}
                                        className="keryi_barter_cardInfo"
                                    >
                                        {/*render渲染用户头像*/}
                                        {renderHeadPortrait.bind(this)(listItem)}
                                        {/*render渲染用户资源卡片*/}
                                        {renderKeryiCard.bind(this)(listItem)}
                                    </article>
                                )
                            }.bind(this)) : //获取资源数据列表出现异常时,前端呈现默认约定数据
                            <article className="keryi_barter_cardInfo">
                                {/*render渲染用户头像*/}
                                {renderHeadPortrait.bind(this)("/images/keryiBarter_login_bg.png")}
                                {/*render渲染用户资源卡片*/}
                                {renderKeryiCard.bind(this)(keryiCardDefaultConfig)}
                            </article>
                    }
                </div>
                {/*keryi_barter主页面查看"以物换物"资源详情对话框*/}
                {renderModal.bind(this)()}
                <aside className="keryi_barter_main_module keryi_barter_main_aside">

                </aside>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        ...state.barterReducers
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        /**
         * 控制Modal组件对话框显示
         * @params e
         */
        viewKeryiBarterHandler(keryiCard, e) {
            this.setState({
                viewBarterVisible: true
            });
            dispatch(getUserHeadPortraitViewDetail("/images/keryiBarter_login_bg.png"));
            dispatch(getResourcesListViewDetailsAction(keryiCard));
            //取消冒泡
            e.nativeEvent.stopImmediatePropagation();
        },
        /**
         * dispatch获取资源数据列表
         */
        dispatchResourceList() {
            const {current} = this.props;
            dispatch(getResourcesList(current));
        },
        /**
         * 控制Modal组件对话框隐藏并消失
         */
        closeBarterVisibleHandler() {
            this.setState({
                viewBarterVisible: false
            });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BarterView);