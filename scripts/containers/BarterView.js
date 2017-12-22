/**
 * Created by yinwk on 2017/6/13.
 */
import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {
    FigureCarousel,
    HeadPortrait,
    KeryiCard,
    Modal,
    Tag
} from "../keryi";
import {
    //获取资源列表Action
    getResourcesList,
    //获取资源详情
    getResourcesListViewDetails,
    //重置资源详情Action
    resetResourcesListViewDetailsAction,
    //重置资源数据列表和资源详情Action
    resetResourcesListViewListDetailsAction
} from "../actions/barterActions";
//导入接口API对象
import api from "../configs/api";
//获取资源数据列表出现异常时,前端呈现默认约定数据
import keryiCardDefaultConfig from "../configs/keryiCardDefaultConfig";
//资源统计静态Mode配置
import viewDetailsStatisticsConfig from "../configs/viewDetailsStatisticsConfig";
import "../../stylesheets/barter.css";
//"以物换物"评论区域消失样式表
const comment = "keryi_barter_view_details_comment";
//"以物换物"评论区域显示样式表
const commentAppearClass = "keryi_barter_view_details_comment keryi_barter_view_details_comment_block keryi_barter_view_details_comment_appear";
//"以物换物"评论区域隐藏样式表
const commentBlockClass = "keryi_barter_view_details_comment keryi_barter_view_details_comment_block";

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
        viewDetailNeedParty: PropTypes.number,
        //资源详情资源估值
        viewDetailPriceWorth: PropTypes.number,
        //资源详情喜欢数目
        viewDetailLike: PropTypes.number
    };

    constructor(props) {
        super(props);
        this.state = {
            //控制Modal组件对话框显示、隐藏或者消失
            viewBarterVisible: false,
            //控制"以物换物"资源详情评论区域显示或者隐藏
            commentAppear: false,
            //控制"以物换物"资源详情评论区域隐藏或者消失
            commentBlock: false,
            //控制"以物换物"资源详情评论区域或者资源详情区域的icon标识的显示和消失
            iconCommentOrInformation: false
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
     * 组件卸载
     */
    componentWillUnmount() {
        const {
            //重置资源详情
            resetResourcesListViewDetailsHandler
        } = this.props;
        resetResourcesListViewDetailsHandler.bind(this)();
    }

    /**
     * render渲染用户头像
     * @returns {XML}
     */
    renderHeadPortrait(keryiCard) {
        return (
            <figure
                className="keryi_barter_head_portrait"
            >
                <HeadPortrait
                    headPortrait={api.GET_PERSONAL_AVATAR + "/" + keryiCard["userId"] + "/avatar"}
                />
            </figure>
        )
    }

    /**
     * 处理Tag组件标签,添加type属性
     * @constructor
     * @returns {XML}
     */
    tagOrTargetTagListHandlerAddType(tags, type) {
        return tags.map(function tager(tagItem, tagIndex) {
            return tagItem["type"] = type;
        }.bind(this));
    }

    /**
     * render渲染用户资源卡片
     * @returns {XML}
     */
    renderKeryiCard(keryiCard) {
        const {
            //处理Tag组件标签,添加type属性
            tagOrTargetTagListHandlerAddType
        } = this;
        const {
            //控制Modal组件对话框显示
            viewKeryiBarterHandler,
            //点击喜欢图标,更新喜欢数
            onLikeHandler
        } = this.props;
        tagOrTargetTagListHandlerAddType.bind(this)(keryiCard["tags"], "primary");
        tagOrTargetTagListHandlerAddType.bind(this)(keryiCard["targetTags"], "info");
        return (
            <div
                className="keryi_barter_card_container"
            >
                <KeryiCard
                    userName={keryiCard["user"]["username"]}
                    imageList={eval("(" + keryiCard["imgUrls"] + ")")}
                    title={keryiCard["title"]}
                    introduce={keryiCard["intro"]}
                    tagList={keryiCard["tags"]}
                    targetTagList={keryiCard["targetTags"]}
                    like={keryiCard["likeCount"]}
                    onLike={onLikeHandler.bind(this)}
                    control={["like"]}
                    priceWorth={keryiCard["priceWorth"]}
                    viewDetails="iconfontKeryiBarter keryiBarter-moreInformation"
                    onViewDetails={viewKeryiBarterHandler.bind(this, keryiCard)}
                />
            </div>
        )
    }

    /**
     *  控制"以物换物"资源详情到评论区域
     */
    changeInformationToComment(event) {
        this.setState({
            iconCommentOrInformation: true,
            commentBlock: true
        }, () => {
            //FIXME 这里设置一个时间控制器,在设置"以物换物"评论区域由消失到隐藏之后，延迟100ms设置"以物换物"评论区域由隐藏到显示
            setTimeout(function timer() {
                this.setState({
                    commentAppear: true
                });
            }.bind(this), 100);
        });
        //取消冒泡事件
        event.nativeEvent.stopImmediatePropagation();
    }

    /**
     * 控制"以物换物"评论区域到资源详情
     */
    changeCommentToInformation(event) {
        this.setState({
            iconCommentOrInformation: false,
            commentAppear: false
        }, () => {
            //FIXME 这里设置一个时间控制器,在设置"以物换物"评论区域执行由显示到隐藏的动画之后，延迟200ms设置"以物换物"评论区域由隐藏到消失
            setTimeout(function timer() {
                this.setState({
                    commentBlock: false
                });
            }.bind(this), 200);
        });
        //取消冒泡事件
        event.nativeEvent.stopImmediatePropagation();
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
        const {
            //控制"以物换物"资源详情评论区域或者资源详情区域的icon标识的显示和消失
            iconCommentOrInformation
        } = this.state;
        const {
            //控制"以物换物"资源详情到评论区域
            changeInformationToComment,
            //控制"以物换物"评论区域到资源详情
            changeCommentToInformation
        } = this;
        return (
            <header className="keryi_barter_view_details_head">
                {
                    iconCommentOrInformation ? <i
                        className="iconfontKeryiBarter keryiBarter-moreInformation"
                        title="资源详情"
                        onClick={changeCommentToInformation.bind(this)}
                    >

                    </i> : <i
                        className="iconfontKeryiBarter keryiBarter-comment"
                        title="评论"
                        onClick={changeInformationToComment.bind(this)}
                    >

                    </i>
                }
                <figure
                    className="keryi_barter_view_details_head_portrait"
                >
                    <HeadPortrait
                        headPortrait={viewDetailHeadPortrait ? viewDetailHeadPortrait : "/images/keryiBarter_v.png"}
                    />
                </figure>
                <dfn className="keryi_barter_view_details_description">
                    <h1 className="keryi_barter_view_details_title">
                        {viewDetailTitle}
                    </h1>
                    <cite className="keryi_barter_view_details_userName">
                        资源由 <abbr className="keryi_barter_view_details_name">{viewDetailUserName}</abbr> 发布
                    </cite>
                </dfn>
            </header>
        )
    }

    /**
     * keryi_barter主页面查看"以物换物"资源详情对话框资源统计
     * @returns {XML}
     */
    renderModalStatistics() {
        return (
            <section className="keryi_barter_view_details_statistics">
                <ul className="keryi_barter_view_details_statistics_uiList">
                    {
                        viewDetailsStatisticsConfig.map(function configer(configItem, configIndex) {
                            return (
                                <li
                                    key={configIndex}
                                    title={this.props[configItem["key"]] + " " + configItem["title"]}
                                >
                                    <i
                                        className={configItem["className"]}
                                    >

                                    </i>
                                    <dfn className="keryi_barter_view_details_statistics_description">
                                        {this.props[configItem["key"]] + " " + configItem["title"]}
                                    </dfn>
                                </li>
                            )
                        }.bind(this))
                    }
                </ul>
            </section>
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
     * 设置资源详情资源介绍HTML文本
     * @returns {{__html: BarterView.props.viewDetailIntroduce}}
     */
    setInnerModalIntroduceHTML() {
        const {
            //资源详情资源介绍
            viewDetailIntroduce
        } = this.props;
        return {
            __html: viewDetailIntroduce
        }
    }

    /**
     * keryi_barter主页面查看"以物换物"资源详情对话框主体介绍
     * @returns {XML}
     */
    renderModalIntroduce() {
        const {
            //设置资源详情资源介绍HTML文本
            setInnerModalIntroduceHTML
        } = this;
        return (
            <section className="keryi_barter_view_details_introduce">
                <article
                    className="keryi_barter_view_details_introduce_content"
                    dangerouslySetInnerHTML={setInnerModalIntroduceHTML.bind(this)()}
                >
                </article>
                <hr className="keryi_barter_view_details_wire"/>
            </section>
        )
    }

    /**
     * keryi_barter主页面查看"以物换物"资源详情对话框资源标签
     * @returns {XML}
     */
    renderModalTag() {
        const {
            //资源详情资源标签
            viewDetailTagList
        } = this.props;
        const {
            //处理Tag组件标签,添加type属性
            tagOrTargetTagListHandlerAddType
        } = this;
        tagOrTargetTagListHandlerAddType.bind(this)(viewDetailTagList, "primary");
        return (
            <section className="keryi_barter_view_details_tag">
                <h2 className="keryi_barter_view_details_tag_title">资源类型</h2>
                {
                    viewDetailTagList.length > 0 && viewDetailTagList.map(function tager(tagItem, tagIndex) {
                        return (
                            <Tag
                                key={tagItem["id"]}
                                type={tagItem["type"]}
                            >
                                {"#" + tagItem["tag"]}
                            </Tag>
                        )
                    }.bind(this))
                }
                <hr className="keryi_barter_view_details_wire"/>
            </section>
        )
    }

    /**
     * keryi_barter主页面查看"以物换物"资源详情对话框目标资源标签
     * @returns {XML}
     */
    renderModalTargetTag() {
        const {
            //资源详情目标资源标签
            viewDetailTargetTagList
        } = this.props;
        const {
            //处理Tag组件标签,添加type属性
            tagOrTargetTagListHandlerAddType
        } = this;
        tagOrTargetTagListHandlerAddType.bind(this)(viewDetailTargetTagList, "info");
        return (
            <section className="keryi_barter_view_details_targetTag">
                <h2 className="keryi_barter_view_details_targetTag_title">目标资源类型</h2>
                {
                    viewDetailTargetTagList.length > 0 && viewDetailTargetTagList.map(function tager(targetTagItem, targetTagIndex) {
                        return (
                            <Tag
                                key={targetTagItem["id"]}
                                type={targetTagItem["type"]}
                            >
                                {"#" + targetTagItem["tag"]}
                            </Tag>
                        )
                    }.bind(this))
                }
            </section>
        )
    }

    /**
     * keryi_barter主页面查看"以物换物"资源详情
     * @returns {XML}
     */
    renderModalInformation() {
        const {
            //keryi_barter主页面查看"以物换物"资源详情对话框头部
            renderModalHeader,
            //keryi_barter主页面查看"以物换物"资源详情对话框资源统计
            renderModalStatistics,
            //keryi_barter主页面查看"以物换物"资源详情对话框图片轮播器
            renderModalFigureCarousel,
            //keryi_barter主页面查看"以物换物"资源详情对话框主体介绍
            renderModalIntroduce,
            //keryi_barter主页面查看"以物换物"资源详情对话框资源标签
            renderModalTag,
            //keryi_barter主页面查看"以物换物"资源详情对话框目标资源标签
            renderModalTargetTag,
            //keryi_barter主页面查看"以物换物"评论区域
            renderModalComment
        } = this;
        return (
            <main
                className="keryi_barter_view_details_information"
            >
                {/*keryi_barter主页面查看"以物换物"资源详情对话框头部*/}
                {renderModalHeader.bind(this)()}
                {/*keryi_barter主页面查看"以物换物"资源详情对话框资源统计*/}
                {renderModalStatistics.bind(this)()}
                {/*keryi_barter主页面查看"以物换物"资源详情对话框图片轮播器*/}
                {renderModalFigureCarousel.bind(this)()}
                {/*keryi_barter主页面查看"以物换物"资源详情对话框主体介绍*/}
                {renderModalIntroduce.bind(this)()}
                {/*keryi_barter主页面查看"以物换物"资源详情对话框资源标签*/}
                {renderModalTag.bind(this)()}
                {/*keryi_barter主页面查看"以物换物"资源详情对话框目标资源标签*/}
                {renderModalTargetTag.bind(this)()}
                {/*keryi_barter主页面查看"以物换物"评论区域*/}
                {renderModalComment.bind(this)()}
            </main>
        )
    }

    /**
     * 控制keryi_barter主页面查看"以物换物"评论区域显示、隐藏或者消失
     */
    modalCommentClassToClass() {
        const {
            //控制"以物换物"资源详情评论区域显示或者隐藏
            commentAppear,
            //控制"以物换物"资源详情评论区域隐藏或者消失
            commentBlock
        } = this.state;
        return commentAppear ? commentAppearClass : commentBlock ? commentBlockClass : comment;
    }

    /**
     * keryi_barter主页面查看"以物换物"评论区域
     * @returns {XML}
     */
    renderModalComment() {
        const {
            //控制查看"以物换物"评论区域显示、隐藏或者消失
            modalCommentClassToClass
        } = this;
        return (
            <main
                className={modalCommentClassToClass.bind(this)()}
            >

            </main>
        )
    }

    /**
     * keryi_barter主页面查看"以物换物"资源详情对话框
     * @returns {XML}
     */
    renderModal() {
        const {
            //keryi_barter主页面查看"以物换物"资源详情
            renderModalInformation
        } = this;
        const {
            //控制Modal组件对话框显示、隐藏或者消失
            viewBarterVisible
        } = this.state;
        const {
            //控制Modal组件对话框隐藏并消失
            closeBarterVisibleHandler
        } = this.props;
        return (
            <Modal
                visible={viewBarterVisible}
                width={660}
                aside={false}
                closable
                footer
                okText="资源交换"
                closeText="关闭"
                className="keryi_barter_modal_view_details_container"
                onClose={closeBarterVisibleHandler.bind(this)}
            >
                <section className="keryi_barter_modal_view_details">
                    {/*keryi_barter主页面查看"以物换物"资源详情*/}
                    {renderModalInformation.bind(this)()}
                </section>
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
                <section className="keryi_barter_main_module keryi_barter_main_barterList">
                    {
                        (list && list.length > 0) && list.map(function lister(listItem, listIndex) {
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
                        }.bind(this))
                        // : //获取资源数据列表出现异常时,前端呈现默认约定数据
                        // <article className="keryi_barter_cardInfo">
                        //     {/*render渲染用户头像*/}
                        //     {renderHeadPortrait.bind(this)(keryiCardDefaultConfig)}
                        //     {/*render渲染用户资源卡片*/}
                        //     {renderKeryiCard.bind(this)(keryiCardDefaultConfig)}
                        // </article>
                    }
                </section>
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
            let id = keryiCard["id"];
            dispatch(getResourcesListViewDetails.bind(this)(id));
            this.setState({
                viewBarterVisible: true
            });
            //取消冒泡
            e.nativeEvent.stopImmediatePropagation();
        },
        /**
         * dispatch获取资源数据列表
         */
        dispatchResourceList() {
            //资源数据列表页码
            const {current} = this.props;
            dispatch(getResourcesList(current));
        },
        /**
         * 控制Modal组件对话框隐藏并消失
         */
        closeBarterVisibleHandler() {
            this.setState({
                viewBarterVisible: false
            }, () => {
                //FIXME 这里设置一个时间控制器,控制在Modal组件对话框隐藏动画并且消失之后再执行清除获取资源详情的数据
                setTimeout(() => {
                    dispatch(resetResourcesListViewDetailsAction());
                }, 1000);
            });
        },
        /**
         * 重置资源详情
         */
        resetResourcesListViewDetailsHandler() {
            //重置资源数据列表和资源详情Action
            dispatch(resetResourcesListViewListDetailsAction());
        },
        /**
         * 点击喜欢图标,更新喜欢数
         */
        onLikeHandler() {

        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BarterView);