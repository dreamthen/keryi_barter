/**
 * Created by yinwk on 2017/6/13.
 */
import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {browserHistory} from "react-router";
import {
    Area,
    Button,
    FigureCarousel,
    HeadPortrait,
    KeryiCard,
    Modal,
    Pagination,
    Tag
} from "../keryi";
import moment from "moment";
import {
    //获取资源列表Action
    getResourcesList,
    //获取个人匹配资源列表
    getPersonalMatchedResourceList,
    //获取个人匹配资源列表Action
    getPersonalMatchedResourceListAction,
    //获取资源列表Action
    getResourcesListAction,
    //分页获取资源列表Action
    getResourcesListByPaginationAction,
    //改变资源列表分页页码Action
    changeResourcesListPaginationCurrentAction,
    //获取资源列表滚动条初始距离顶部高度
    getResourcesListPaginationBeforeOsTopAction,
    //获取资源详情
    getResourcesListViewDetails,
    //插入资源详情评论
    doResourcesListViewDetailsComment,
    //获取资源详情评论列表
    getResourcesListViewDetailsCommentList,
    //重置资源详情Action
    resetResourcesListViewDetailsAction,
    //重置资源数据列表和资源详情Action
    resetResourcesListViewListDetailsAction,
    //改变"评论"富文本编辑器编辑框内容Action
    changeResourcesListViewDetailsCommentAction,
    //获取资源详情评论列表Action
    getResourcesListViewDetailsCommentListAction
} from "../actions/barterActions";
import {
    //个人信息页面发起资源交换
    havePersonalResourcesExchange
} from "../actions/personalActions";
import {
    //校验字段undefined和null,进行处理
    checkField
} from "../configs/checkField";
//导入接口API对象
import api from "../configs/api";
import {
    //改变资源列表分页页码:分页+1
    paginationPlus,
    //改变资源列表分页页码:分页-1
    paginationMinus
} from "../reducers/barterReducers";
//资源统计静态Mode配置
import viewDetailsStatisticsConfig from "../configs/viewDetailsStatisticsConfig";
import "../../stylesheets/barter.css";

//"以物换物"评论区域消失样式表
const comment = "keryi_barter_view_details_comment";
//"以物换物"评论区域显示样式表
const commentAppearClass = "keryi_barter_view_details_comment keryi_barter_view_details_comment_block keryi_barter_view_details_comment_appear";
//"以物换物"评论区域隐藏样式表
const commentBlockClass = "keryi_barter_view_details_comment keryi_barter_view_details_comment_block";
//进行资源交换，显示匹配的资源列表页面消失样式表
const matchedResourceList = "keryi_barter_view_details_matched_resource_list";
//进行资源交换，显示匹配的资源列表页面显示样式表
const matchedResourceListAppearClass = "keryi_barter_view_details_matched_resource_list keryi_barter_view_details_matched_resource_list_block keryi_barter_view_details_matched_resource_list_appear";
//进行资源交换，显示匹配的资源列表页面隐藏样式表
const matchedResourceListBlockClass = "keryi_barter_view_details_matched_resource_list keryi_barter_view_details_matched_resource_list_block";
const PAGE_SIZE = 10;
//设置moment时间地区语言
moment.locale('zh-cn');

class BarterView extends React.Component {
    static propTypes = {
        //获取资源数据列表
        list: PropTypes.array,
        //获取个人匹配资源列表
        matchedList: PropTypes.array,
        //资源数据列表页码
        current: PropTypes.number,
        //个人匹配资源列表页码
        matchedCurrent: PropTypes.number,
        //个人匹配资源列表资源条数
        matchedTotal: PropTypes.number,
        //资源数据列表下拉分页防并发变量
        currentAsync: PropTypes.bool,
        //评论详情
        comment: PropTypes.string,
        //评论列表
        commentList: PropTypes.array,
        //评论列表页码
        commentCurrent: PropTypes.number,
        //评论列表评论条数
        commentTotal: PropTypes.number,
        //滚动条初始距离顶部高度
        beforeOsTop: PropTypes.number,
        //资源ID
        viewDetailId: PropTypes.number,
        //资源发起人ID
        viewDetailUserId: PropTypes.number,
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
            //用户登录的id
            userId: 0,
            //控制Modal组件对话框显示、隐藏或者消失
            viewBarterVisible: false,
            //控制"以物换物"资源详情评论区域显示或者隐藏
            commentAppear: false,
            //控制"以物换物"资源详情评论区域隐藏或者消失
            commentBlock: false,
            //控制进行资源交换，显示匹配的资源列表页面显示或者隐藏
            matchedResourceListAppear: false,
            //控制进行资源交换，显示匹配的资源列表页面隐藏或者消失
            matchedResourceListBlock: false,
            //控制"以物换物"资源详情评论区域或者资源详情区域的icon标识的显示和消失
            iconCommentOrInformation: false
        }
    }

    /**
     * 组件开始装载
     */
    componentWillMount() {
        const {
            //获取存入localStorage里面的用户信息
            getLoginUserInformation
        } = this;
        getLoginUserInformation.bind(this)();
    }

    /**
     *  获取存入localStorage里面的用户信息
     */
    getLoginUserInformation() {
        let userLoginInformation;
        if (localStorage) {
            userLoginInformation = JSON.parse(localStorage.getItem("userLoginInformation"));
        } else {
            return false;
        }
        this.setState({
            userId: checkField(userLoginInformation, "id")
        });
    }

    /**
     * 下拉滚动条进行分页获取资源数据列表
     * @params docTop
     */
    scrollGetResourceList(docTop) {
        const {
            //改变资源列表分页页码
            changeResourcesListPaginationCurrentHandler,
            //dispatch获取资源列表滚动条初始距离顶部高度
            getResourcesListPaginationBeforeOsTopHandler,
            //滚动条初始距离顶部高度
            beforeOsTop,
            //资源数据列表下拉分页防并发变量
            currentAsync
        } = this.props;
        return new Promise(function promise(resolve, reject) {
            //滚动条距离顶部高度
            let afterOsTop = document.documentElement.scrollTop || document.body.scrollTop,
                //resourceListContainer元素高度
                docHeight = this._resourceListContainer.clientHeight,
                //屏幕高度
                screenHeight = window.innerHeight,
                //整个文档高度
                docTotalHeight = docHeight + docTop,
                //滚动条滚动之后的高度距离上一次滚动条所在位置高度之差
                betweenOsTop = afterOsTop - beforeOsTop;
            getResourcesListPaginationBeforeOsTopHandler.bind(this)(afterOsTop);
            if (((docTotalHeight - screenHeight - afterOsTop) / docTotalHeight <= 0.05) && currentAsync && betweenOsTop > 0) {
                changeResourcesListPaginationCurrentHandler.bind(this)(paginationPlus);
                resolve();
            }
        }.bind(this));
    }

    /**
     * 组件结束装载
     */
    componentDidMount() {
        const {
            //获取资源数据列表
            dispatchResourceList,
            //dispatch获取资源列表滚动条初始距离顶部高度
            getResourcesListPaginationBeforeOsTopHandler
        } = this.props;
        const {
            //分页获取资源数据列表控制集成器
            scrollGetResourceListByPagination
        } = this;
        //resourceListContainer元素距离顶部高度
        let docTop = this._resourceListContainer.getBoundingClientRect().top,
            //获取资源列表滚动条初始距离顶部高度
            beforeOsTop = document.documentElement.scrollTop || document.body.scrollTop;
        dispatchResourceList.bind(this)();
        getResourcesListPaginationBeforeOsTopHandler.bind(this)(beforeOsTop);
        window.addEventListener("scroll", scrollGetResourceListByPagination.bind(this, docTop));
    }

    /**
     * 组件卸载
     */
    componentWillUnmount() {
        const {
            //重置资源详情
            resetResourcesListViewDetailsHandler
        } = this.props;
        const {
            //分页获取资源数据列表控制集成器
            scrollGetResourceListByPagination
        } = this;
        window.removeEventListener("scroll", scrollGetResourceListByPagination.bind(this));
        resetResourcesListViewDetailsHandler.bind(this)();
    }

    /**
     * 分页获取资源数据列表控制集成器
     * @param docTop
     */
    scrollGetResourceListByPagination(docTop) {
        const {
            //分页获取资源数据列表
            dispatchResourceListByPagination
        } = this.props;
        const {
            //下拉滚动条进行分页获取资源数据列表
            scrollGetResourceList
        } = this;
        scrollGetResourceList.bind(this)(docTop).then(function resolve() {
            dispatchResourceListByPagination.bind(this)();
        }.bind(this), function reject() {

        }.bind(this));
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
                    headPortrait={keryiCard["userId"] ? `${api.GET_PERSONAL_AVATAR}/${keryiCard["userId"]}/avatar` : "/images/keryiBarter_v.png"}
                    style={{border: "1px solid transparent"}}
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
     * "以物换物"资源详情到评论区域控制器
     */
    * changeInformationToCommentHandler() {
        const {
            //资源ID
            viewDetailId,
            //资源发起人ID
            viewDetailUserId,
            //获取资源详情评论列表脚手架
            getResourcesListViewDetailsCommentListHandler
        } = this.props;
        const {
            //用户登录的id
            userId
        } = this.state;
        //评论列表页码设置为1
        const commentCurrent = 1;
        yield this.setState({
            iconCommentOrInformation: true,
            commentBlock: true
        });
        yield getResourcesListViewDetailsCommentListHandler.bind(this)(viewDetailId, userId, viewDetailUserId, commentCurrent);
        //FIXME 这里设置一个时间控制器,在设置"以物换物"评论区域由消失到隐藏之后，延迟100ms设置"以物换物"评论区域由隐藏到显示
        yield setTimeout(function timer() {
            this.setState({
                commentAppear: true
            });
        }.bind(this), 100);
    }

    /**
     *  控制"以物换物"资源详情到评论区域
     */
    changeInformationToComment(event) {
        const {
            //"以物换物"资源详情到评论区域控制器
            changeInformationToCommentHandler
        } = this;
        let informationToCommentHandler = changeInformationToCommentHandler.bind(this)(),
            informationToCommentHandlerDone = informationToCommentHandler.next().done;
        while (!informationToCommentHandlerDone) {
            informationToCommentHandlerDone = informationToCommentHandler.next().done;
        }
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
     * keryi_barter主页面查看控制"以物换物"资源详情评论区域或者资源详情区域的icon标识的显示和消失
     * @returns {*}
     */
    renderModalIconOrInformationComment() {
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
        return iconCommentOrInformation ? <i
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

    /**
     * keryi_barter主页面查看"以物换物"资源详情对话框头部
     * @returns {XML}
     */
    renderModalHeader() {
        const {
            //资源详情用户头像
            viewDetailUserId,
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
                        headPortrait={viewDetailUserId ? `${api.GET_PERSONAL_AVATAR}/${viewDetailUserId}/avatar` : "/images/keryiBarter_v.png"}
                        style={{border: "1px solid transparent"}}
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
            renderModalComment,
            //keryi_barter主页面进行资源交换，显示匹配的资源列表页面
            renderModalMatchedResourceList
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
                {/*keryi_barter主页面进行资源交换，显示匹配的资源列表页面*/}
                {renderModalMatchedResourceList.bind(this)()}
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
     * 设置资源详情评论详情HTML文本
     * @param commentListItemContent
     * @returns {{__html: *}}
     */
    setCommentListItemContentInnerHTML(commentListItemContent) {
        return {
            __html: commentListItemContent
        }
    }

    /**
     * keryi_barter主页面查看"以物换物"评论区域评论列表项
     * @returns [{*}]
     */
    renderModalCommentListItem() {
        const {
            //评论列表
            commentList
        } = this.props;
        const {
            //设置资源详情评论详情HTML文本
            setCommentListItemContentInnerHTML
        } = this;
        return commentList.map(function commentListItem(commentItem, commentIndex) {
            return (
                <section
                    key={commentIndex}
                    className="keryi_barter_view_details_comment_list_itemSection">
                    <aside className="keryi_barter_view_details_comment_list_itemAvatar">
                        <HeadPortrait
                            headPortrait={api.GET_PERSONAL_AVATAR + "/" + commentItem["fromUser"]["id"] + "/avatar"}
                            borderJudgement={false}
                        />
                    </aside>
                    <article className="keryi_barter_view_details_comment_list_itemContent">
                        <h5 className="keryi_barter_view_details_comment_list_itemContent_title">
                            {commentItem["fromUser"]["username"]}
                        </h5>
                        <p
                            dangerouslySetInnerHTML={setCommentListItemContentInnerHTML.bind(this)(commentItem["comment"])}
                            className="keryi_barter_view_details_comment_list_itemContent_pragraph"
                        >
                        </p>
                        <time className="keryi_barter_view_details_comment_list_itemContent_time">
                            {moment(commentItem["createDate"]).fromNow()}
                        </time>
                    </article>
                    <hr className="keryi_barter_view_details_comment_list_itemSection_wire"/>
                </section>
            )
        });
    }

    /**
     * keryi_barter主页面查看"以物换物"评论区域评论列表
     * @returns {*}
     */
    renderModalCommentList() {
        const {
            //查看"以物换物"评论区域评论列表项
            renderModalCommentListItem
        } = this;
        return (
            <main className="keryi_barter_view_details_comment_list">
                {renderModalCommentListItem.bind(this)()}
            </main>
        );
    }

    /**
     * keryi_barter主页面查看"以物换物"评论区域评论为空时的界面
     * @returns {*}
     */
    renderModalCommentNone() {
        return (
            <main className="keryi_barter_view_details_comment_none">
                <section className="keryi_barter_view_details_comment_none_container">
                    <i className="iconfontKeryiBarter keryiBarter-cry"> </i>
                    <dfn className="keryi_barter_view_details_comment_none_content">此资源暂无评论</dfn>
                </section>
            </main>
        );
    }

    /**
     * keryi_barter主页面查看"以物换物"评论区域
     * @returns {XML}
     */
    renderModalComment() {
        const {
            //评论详情
            comment,
            //评论列表评论条数
            commentTotal,
            //评论列表页码
            commentCurrent,
            //评论列表
            commentList,
            //改变"评论"富文本编辑器编辑框内容
            changeCommentHandler,
            //"评论"富文本编辑器编辑框添加评论
            doCommentHandler,
            //点击"评论"系统分页方法
            loadPageMore
        } = this.props;
        const {
            //控制查看"以物换物"评论区域显示、隐藏或者消失
            modalCommentClassToClass,
            //查看"以物换物"评论区域评论列表
            renderModalCommentList,
            //查看"以物换物"评论区域评论为空时的界面
            renderModalCommentNone
        } = this;
        return (
            <main
                className={modalCommentClassToClass.bind(this)()}
            >
                <Area
                    value={comment}
                    size="large"
                    placeholder="请输入您对此资源的评论~"
                    className="keryi_barter_view_details_comment_area"
                    comment={true}
                    onChange={changeCommentHandler.bind(this)}
                />
                <section className="keryi_barter_view_details_comment_submit">
                    <Button
                        title="评论"
                        size="default"
                        type="info"
                        className="keryi_barter_view_details_comment_submit_button"
                        onClick={doCommentHandler.bind(this)}
                    >
                        评论
                    </Button>
                </section>
                <article className="keryi_barter_view_details_comment_content">
                    <header className="keryi_barter_view_details_comment_content_header"
                            data-comment-total={commentTotal}>
                    </header>
                    <section className="keryi_barter_view_details_comment_clear">

                    </section>
                    <Pagination
                        current={commentCurrent}
                        className="keryi_barter_view_details_comment_pagination"
                        onChange={loadPageMore.bind(this)}
                        pageSize={PAGE_SIZE}
                        showQuickJumper
                        showTotal={total => `共 ${total} 条评论`}
                        total={commentTotal}
                    />
                    {
                        (commentList && commentList.length > 0) ? renderModalCommentList.bind(this)() : renderModalCommentNone.bind(this)()
                    }
                </article>
            </main>
        );
    }

    /**
     * keryi_barter主页面进行资源交换，显示匹配的资源列表页面显示、隐藏或者消失
     */
    modalMatchedResourceListClassToClass() {
        const {
            //控制进行资源交换，显示匹配的资源列表页面显示或者隐藏
            matchedResourceListAppear,
            //控制进行资源交换，显示匹配的资源列表页面隐藏或者消失
            matchedResourceListBlock
        } = this.state;
        return matchedResourceListAppear ? matchedResourceListAppearClass : matchedResourceListBlock ? matchedResourceListBlockClass : matchedResourceList;
    }

    /**
     * keryi_barter主页面显示匹配的资源列表项
     * @param item
     * @param index
     * @returns {XML}
     */
    renderModalMatchedResourceListItem(item, index) {
        const {
            //用户登录的id
            userId
        } = this.state;
        const {
            //选择用户匹配的资源进行资源交换
            chooseMatchedResourceChange
        } = this.props;
        return (
            <section
                key={index}
                className="keryi_barter_modal_view_details_matched_resource_listItem"
            >
                <header className="keryi_barter_modal_view_details_matched_resource_listItem_header">
                    <figure className="keryi_barter_modal_view_details_matched_resource_listItem_avatarArea">
                        <HeadPortrait
                            type="square"
                            headPortrait={`${api.GET_PERSONAL_AVATAR}/${userId}/avatar`}
                            borderJudgement={false}
                        />
                    </figure>
                    <section className="keryi_barter_modal_view_details_matched_resource_listItem_nav">
                        <h3 className="keryi_barter_modal_view_details_matched_resource_listItem_userName">
                            {item["user"]["username"]}
                        </h3>
                        <ul className="keryi_barter_modal_view_details_matched_resource_listItem_uiList">
                            {
                                viewDetailsStatisticsConfig.map((statisticsItem, statisticsIndex) => {
                                    return (
                                        <li key={statisticsItem["key"]}>
                                            <i data-description={`${item[statisticsItem["source"]]} ${statisticsItem["title"]}`}
                                               className={statisticsItem["className"]}
                                            >
                                            </i>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                        <aside className="keryi_barter_modal_view_details_matched_resource_buttonArea">
                            <Button
                                type="info"
                                size="default"
                                className="keryi_barter_modal_view_details_matched_resource_button"
                                onClick={chooseMatchedResourceChange.bind(this, item)}
                            >
                                选择交换
                            </Button>
                        </aside>
                    </section>
                </header>
                <main className="keryi_barter_modal_view_details_matched_resource_listItem_content">
                    <h4 title={item["title"]}
                        className="keryi_barter_modal_view_details_matched_resource_listItem_content_title"
                    >
                        {item["title"]}
                    </h4>
                    <p title={item["intro"]}
                       className="keryi_barter_modal_view_details_matched_resource_listItem_content_paragraph"
                    >
                        {item["intro"]}
                    </p>
                    <figure
                        className="keryi_barter_modal_view_details_matched_resource_listItem_content_imagesArea"
                        style={{background: `url(${eval(item["imgUrls"])[0]["src"]}) no-repeat center center / 100% border-box content-box`}}
                    >

                    </figure>
                </main>
            </section>
        )
    }

    /**
     * keryi_barter主页面进行资源交换，显示匹配的资源列表页面
     * @returns {XML}
     */
    renderModalMatchedResourceList() {
        const {
            //keryi_barter主页面进行资源交换，显示匹配的资源列表页面显示、隐藏或者消失
            modalMatchedResourceListClassToClass,
            //keryi_barter主页面显示匹配的资源列表项
            renderModalMatchedResourceListItem
        } = this;
        const {
            //获取个人匹配资源列表
            matchedList
        } = this.props;
        return (
            <section className={modalMatchedResourceListClassToClass.bind(this)()}>
                {
                    (matchedList && matchedList.length > 0) ? matchedList.map(function matched(matchedItem, matchedIndex) {
                        return renderModalMatchedResourceListItem.bind(this)(matchedItem, matchedIndex);
                    }.bind(this)) : ""
                }
            </section>
        )
    }

    /**
     * 点击资源交换按钮，获取用户个人的资源匹配列表控制器
     */
    * changeOkBarterMatchedListGenerator() {
        const {
            //点击资源交换按钮，获取用户个人的资源匹配列表
            okBarterMatchedListHandler
        } = this.props;
        yield this.setState({
            matchedResourceListBlock: true
        });
        yield okBarterMatchedListHandler.bind(this)();
        //FIXME 这里设置一个时间控制器,在设置进行资源交换，显示匹配的资源列表页面由消失到隐藏之后，延迟100ms设置进行资源交换，显示匹配的资源列表页面由隐藏到显示
        yield setTimeout(function timer() {
            this.setState({
                matchedResourceListAppear: true
            });
        }.bind(this), 100);
    }

    /**
     * 控制点击资源交换按钮，获取用户个人的资源匹配列表
     */
    changeOkBarterMatchedList() {
        const {
            //点击资源交换按钮，获取用户个人的资源匹配列表控制器
            changeOkBarterMatchedListGenerator
        } = this;
        let barterMatchedListGenerator = changeOkBarterMatchedListGenerator.bind(this)();
        let barterMatchedListGeneratorDone = barterMatchedListGenerator.next().done;
        while (!barterMatchedListGeneratorDone) {
            barterMatchedListGeneratorDone = barterMatchedListGenerator.next().done;
        }
    }

    /**
     * 点击返回按钮,返回到资源详情页面
     */
    backToBarterListDetail() {
        this.setState({
            iconCommentOrInformation: false,
            commentAppear: false,
            matchedResourceListAppear: false
        }, () => {
            //FIXME 这里设置一个时间控制器,在设置进行资源交换，显示匹配的资源列表页面执行由显示到隐藏的动画之后，延迟200ms设置进行资源交换，显示匹配的资源列表页面由隐藏到消失，在设置"以物换物"评论区域执行由显示到隐藏的动画之后，延迟200ms设置"以物换物"评论区域由隐藏到消失
            setTimeout(function timer() {
                this.setState({
                    commentBlock: false,
                    matchedResourceListBlock: false
                });
            }.bind(this), 200);
        });
    }

    /**
     * keryi_barter主页面查看控制点击资源交换按钮，获取用户个人的资源匹配列表的icon显示和消失
     * @returns {XML}
     */
    renderModalIconMatchedResourceList() {
        const {
            backToBarterListDetail
        } = this;
        return <i
            className="iconfontKeryiBarter keryiBarter-back"
            title="返回"
            onClick={backToBarterListDetail.bind(this)}
        >

        </i>
    }

    /**
     * keryi_barter主页面用户个人的资源匹配列表分页系统
     * @returns {*}
     */
    renderModalMatchedResourceListPagination() {
        const {
            //个人匹配资源列表页码
            matchedCurrent,
            //个人匹配资源列表资源条数
            matchedTotal,
            //点击用户个人的资源匹配列表分页方法
            loadMatchedPageMore
        } = this.props;
        return (
            <section className="keryi_barter_view_details_matched_resource_list_paginationContainer">
                <Pagination
                    current={matchedCurrent}
                    className="keryi_barter_view_details_matched_resource_list_pagination"
                    onChange={loadMatchedPageMore.bind(this)}
                    pageSize={PAGE_SIZE}
                    showQuickJumper
                    showTotal={total => `共 ${total} 条资源`}
                    total={matchedTotal}
                />
            </section>
        )
    }

    /**
     * keryi_barter主页面查看"以物换物"资源详情对话框
     * @returns {XML}
     */
    renderModal() {
        const {
            //keryi_barter主页面查看"以物换物"资源详情
            renderModalInformation,
            //keryi_barter主页面用户个人的资源匹配列表分页系统
            renderModalMatchedResourceListPagination,
            //keryi_barter主页面查看控制"以物换物"资源详情评论区域或者资源详情区域的icon标识的显示和消失
            renderModalIconOrInformationComment,
            //keryi_barter主页面查看控制点击资源交换按钮，获取用户个人的资源匹配列表的icon显示和消失
            renderModalIconMatchedResourceList,
            //控制点击资源交换按钮，获取用户个人的资源匹配列表
            changeOkBarterMatchedList
        } = this;
        const {
            //控制Modal组件对话框显示、隐藏或者消失
            viewBarterVisible,
            //控制进行资源交换，显示匹配的资源列表页面隐藏或者消失
            matchedResourceListBlock
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
                showOk={!matchedResourceListBlock}
                okText="资源交换"
                showClose
                closeText="关闭"
                className="keryi_barter_modal_view_details_container"
                onOk={changeOkBarterMatchedList.bind(this)}
                onClose={closeBarterVisibleHandler.bind(this)}
            >
                {/*keryi_barter主页面查看控制"以物换物"资源详情评论区域或者资源详情区域的icon标识的显示和消失*/}
                {!matchedResourceListBlock ? renderModalIconOrInformationComment.bind(this)() : renderModalIconMatchedResourceList.bind(this)()}
                <section className="keryi_barter_modal_view_details">
                    {/*keryi_barter主页面查看"以物换物"资源详情*/}
                    {renderModalInformation.bind(this)()}
                </section>
                {/*keryi_barter主页面用户个人的资源匹配列表分页系统*/}
                {matchedResourceListBlock && renderModalMatchedResourceListPagination.bind(this)()}
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
            <div
                ref={resourceListContainer => this._resourceListContainer = resourceListContainer}
                className="keryi_barter_main_container"
            >
                <section
                    className="keryi_barter_main_module keryi_barter_main_barterList"
                >
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
            dispatch(getResourcesListViewDetails.bind(this)(id)).then(function resolve() {
                this.setState({
                    viewBarterVisible: true
                });
                document.body.style["overflow"] = "hidden";
            }.bind(this));
            // 取消冒泡
            e.nativeEvent.stopImmediatePropagation();
        },
        /**
         * dispatch获取资源数据列表
         */
        dispatchResourceList() {
            //资源数据列表页码
            const {current} = this.props;
            dispatch(getResourcesList(current))
                .then(function resolve(body) {
                    //资源列表数组
                    let resourcesList = body.list;
                    resourcesList && resourcesList.length > 0 && dispatch(getResourcesListAction(resourcesList));
                }.bind(this), function reject() {

                }.bind(this));
        },
        /**
         * dispatch分页获取资源数据列表
         */
        dispatchResourceListByPagination() {
            const {
                //资源数据列表页码
                current,
                //改变资源列表分页页码
                changeResourcesListPaginationCurrentHandler
            } = this.props;
            dispatch(getResourcesList(current))
                .then(function resolve(body) {
                    //资源列表数组
                    let resourcesList = body.list;
                    resourcesList && resourcesList.length > 0 && dispatch(getResourcesListByPaginationAction(body));
                }.bind(this), function reject() {
                    changeResourcesListPaginationCurrentHandler.bind(this)(paginationMinus);
                }.bind(this));
        },
        /**
         * 改变资源列表分页页码
         */
        changeResourcesListPaginationCurrentHandler(command) {
            dispatch(changeResourcesListPaginationCurrentAction(command));
        },
        /**
         * dispatch获取资源列表滚动条初始距离顶部高度
         */
        getResourcesListPaginationBeforeOsTopHandler(beforeOsTop) {
            dispatch(getResourcesListPaginationBeforeOsTopAction(beforeOsTop));
        },
        /**
         * 点击资源交换按钮，获取用户个人的资源匹配列表
         */
        okBarterMatchedListHandler() {
            const {
                //用户登录的id
                userId
            } = this.state;
            //设置个人匹配资源列表页码为1
            const matchedCurrent = 1;
            dispatch(getPersonalMatchedResourceList(matchedCurrent, userId))
                .then(function resolve(body) {
                    //获取个人匹配资源列表数组
                    const personalMatchedResourcesList = body["list"],
                          //获取个人匹配资源列表条数
                          personalMatchedTotal = body["total"];
                    dispatch(getPersonalMatchedResourceListAction({
                        matchedList: personalMatchedResourcesList,
                        matchedCurrent,
                        matchedTotal: personalMatchedTotal
                    }));
                }, function reject() {

                });
        },
        /**
         * 控制Modal组件对话框隐藏并消失
         */
        closeBarterVisibleHandler() {
            this.setState({
                viewBarterVisible: false
            }, () => {
                document.body.style["overflow"] = "auto";
                //FIXME 这里设置一个时间控制器,控制在Modal组件对话框隐藏动画并且消失之后再执行清除获取资源详情的数据,并将评论区域设置为消失状态,资源详情icon设置为评论icon
                setTimeout(() => {
                    dispatch(resetResourcesListViewDetailsAction());
                    this.setState({
                        commentAppear: false,
                        commentBlock: false,
                        matchedResourceListAppear: false,
                        matchedResourceListBlock: false,
                        iconCommentOrInformation: false
                    });
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
         * 改变"评论"富文本编辑器编辑框内容
         * @param e
         */
        changeCommentHandler(e) {
            let value = e.target.value;
            dispatch(changeResourcesListViewDetailsCommentAction(value));
        },
        /**
         * "评论"富文本编辑器编辑框添加评论
         * @param e
         */
        doCommentHandler(e) {
            const {
                //评论详情
                comment,
                //资源ID
                viewDetailId,
                //资源发起人ID
                viewDetailUserId
            } = this.props;
            const {
                //用户登录的id
                userId
            } = this.state;
            //评论列表页码设置为1
            const commentCurrent = 1;
            dispatch(doResourcesListViewDetailsComment(viewDetailId, userId, viewDetailUserId, comment))
                .then(function resolve() {
                    return dispatch(getResourcesListViewDetailsCommentList(viewDetailId, userId, viewDetailUserId, commentCurrent));
                })
                .then(function resolve(getComment) {
                    dispatch(getResourcesListViewDetailsCommentListAction({
                        commentList: getComment["list"],
                        commentTotal: getComment["commentTotal"],
                        comment: "",
                        commentCurrent
                    }));
                });
        },
        /**
         * 获取资源详情评论列表脚手架
         * @param resourceId
         * @param commentFrom
         * @param commentTo
         * @param pageNum
         */
        getResourcesListViewDetailsCommentListHandler(resourceId, commentFrom, commentTo, pageNum) {
            dispatch(getResourcesListViewDetailsCommentList(resourceId, commentFrom, commentTo, pageNum))
                .then(function resolve(getComment) {
                    dispatch(getResourcesListViewDetailsCommentListAction({
                        commentList: getComment["list"],
                        commentTotal: getComment["commentTotal"],
                        comment: "",
                        commentCurrent: pageNum
                    }));
                });
        },
        /**
         * 点击"评论"系统分页方法
         * @param page
         * @param pageSize
         */
        loadPageMore(page, pageSize) {
            const {
                //资源ID
                viewDetailId,
                //资源发起人ID
                viewDetailUserId
            } = this.props;
            const {
                //用户登录的id
                userId
            } = this.state;
            dispatch(getResourcesListViewDetailsCommentList(viewDetailId, userId, viewDetailUserId, page))
                .then(function resolve(getComment) {
                    dispatch(getResourcesListViewDetailsCommentListAction({
                        commentList: getComment["list"],
                        commentTotal: getComment["commentTotal"],
                        comment: "",
                        commentCurrent: page
                    }));
                });
        },
        /**
         * 点击用户个人的资源匹配列表分页方法
         * @param page
         * @param pageSize
         */
        loadMatchedPageMore(page, pageSize) {
            const {
                //用户登录的id
                userId
            } = this.state;
            dispatch(getPersonalMatchedResourceList(page, userId))
                .then(function resolve(body) {
                    //获取个人匹配资源列表数组
                    const personalMatchedResourcesList = body["list"],
                        //获取个人匹配资源列表条数
                        personalMatchedTotal = body["total"];
                    dispatch(getPersonalMatchedResourceListAction({
                        matchedList: personalMatchedResourcesList,
                        matchedCurrent: page,
                        matchedTotal: personalMatchedTotal
                    }));
                }, function reject() {

                });
        },
        /**
         * 点击喜欢图标,更新喜欢数
         */
        onLikeHandler() {

        },
        /**
         * 选择用户匹配的资源进行资源交换
         * @param keryiCard
         * @param e
         */
        chooseMatchedResourceChange(keryiCard, e) {
            const {
                //用户登录的id
                userId
            } = this.state;
            const {
                //资源ID
                viewDetailId,
                //资源发起人ID
                viewDetailUserId
            } = this.props;
            dispatch(havePersonalResourcesExchange({
                initiativeResourceId: keryiCard["id"],
                passiveResourceId: viewDetailId,
                initiativeUserId: userId,
                passiveUserId: viewDetailUserId
            })).then(function resolve() {
                localStorage && localStorage.setItem("keryiCard", JSON.stringify(keryiCard));
                browserHistory.push({
                    pathname: "personal"
                });
            }.bind(this), function reject() {

            }.bind(this));
            //取消冒泡
            e && e.nativeEvent.stopImmediatePropagation();
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BarterView);