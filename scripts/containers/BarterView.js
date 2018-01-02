/**
 * Created by yinwk on 2017/6/13.
 */
import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
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
const PAGE_SIZE = 10;
//设置moment时间地区语言
moment.locale('zh-cn');

class BarterView extends React.Component {
    static propTypes = {
        //获取资源数据列表
        list: PropTypes.array,
        //资源数据列表页码
        current: PropTypes.number,
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
                docHeight = this.refs["resourceListContainer"].clientHeight,
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
            //分页获取资源数据列表
            dispatchResourceListByPagination,
            //dispatch获取资源列表滚动条初始距离顶部高度
            getResourcesListPaginationBeforeOsTopHandler
        } = this.props;
        const {
            //下拉滚动条进行分页获取资源数据列表
            scrollGetResourceList
        } = this;
        //resourceListContainer元素距离顶部高度
        let docTop = this.refs["resourceListContainer"].getBoundingClientRect().top,
            //获取资源列表滚动条初始距离顶部高度
            beforeOsTop = document.documentElement.scrollTop || document.body.scrollTop;
        dispatchResourceList.bind(this)();
        getResourcesListPaginationBeforeOsTopHandler.bind(this)(beforeOsTop);
        window.onscroll = function scroll() {
            scrollGetResourceList.bind(this)(docTop).then(function resolve() {
                dispatchResourceListByPagination.bind(this)();
            }.bind(this), function reject() {

            }.bind(this));
        }.bind(this);
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
            <div
                ref="resourceListContainer"
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
            dispatch(getResourcesList(current))
                .then(function resolve(body) {
                    dispatch(getResourcesListAction(body));
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
                    dispatch(getResourcesListByPaginationAction(body));
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
         * 控制Modal组件对话框隐藏并消失
         */
        closeBarterVisibleHandler() {
            this.setState({
                viewBarterVisible: false
            }, () => {
                //FIXME 这里设置一个时间控制器,控制在Modal组件对话框隐藏动画并且消失之后再执行清除获取资源详情的数据,并将评论区域设置为消失状态,资源详情icon设置为评论icon
                setTimeout(() => {
                    dispatch(resetResourcesListViewDetailsAction());
                    this.setState({
                        commentAppear: false,
                        commentBlock: false,
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
         * 点击喜欢图标,更新喜欢数
         */
        onLikeHandler() {

        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BarterView);