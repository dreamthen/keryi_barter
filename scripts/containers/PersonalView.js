/**
 * author yinwk
 * createTime 2017/8/16 14:41
 * description clown laugh at you~
 */
import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {
    Area,
    Button,
    FigureCarousel,
    HeadPortrait,
    Input,
    ItemCarousel,
    KeryiCard,
    Modal,
    Pagination,
    Tag
} from "../keryi";
import moment from "moment";
//接口API对象
import api from "../configs/api";
import Upload from "rc-upload";
//Upload组件上传文件配置
import uploadConfig from "../configs/uploadConfig";
//个人信息页面,根据不同的组件类型配置来设置组件
import personalComponentConfig from "../configs/personalComponentConfig";
//资源统计静态Mode配置
import viewDetailsStatisticsConfig from "../configs/viewDetailsStatisticsConfig";
//对话框匹配到的资源统计静态Mode配置
import statisticsConfig from "../configs/statisticsConfig";
//对话框资源交换列表交换状态静态Mode配置
import exchangeStatusConfig from "../configs/exchangeStatusConfig";
//对话框资源交换列表交换状态选择Mode配置
import exchangeStatusSelectConfig from "../configs/exchangeStatusSelectConfig";
//获取匹配到的资源数据列表出现异常时,前端呈现默认约定数据
import keryiModalDefaultConfig from "../configs/keryiModalDefaultConfig";
//校验字段undefined和null,进行处理
import {checkField} from "../configs/checkField";
import {
    //改变个人信息编辑状态,使得其可编辑
    changePersonalInformation,
    //获取个人信息
    getPersonalInformation,
    //更新、保存个人信息,并改变个人信息编辑状态,使得其不可编辑
    saveUpdatePersonalInformation,
    //改变个人信息编辑状态,使得其不可编辑
    closeChangePersonalInformation,
    //获取个人页资源列表
    getPersonalResourcesList,
    //获取个人页资源列表Action
    getPersonalResourcesListAction,
    //获取个人页资源详情
    getPersonalResourcesListViewDetails,
    //保存个人页资源详情Action
    rememberPersonalResourcesListViewDetails,
    //保存个人页资源详情资源交换列表Action
    rememberPersonalResourcesListViewDetailsItemListAction,
    //保存个人页资源详情匹配资源交换列表Action
    rememberPersonalResourcesListViewDetailsMatchedItemListAction,
    //个人信息页面发起资源交换
    havePersonalResourcesExchange,
    //获取个人页匹配列表资源详情Action
    getPersonalResourcesMatchedListViewDetailsAction,
    //获取个人页资源详情Action
    getPersonalResourcesListViewDetailsAction,
    //获取个人页资源详情资源交换列表
    getPersonalResourcesListViewDetailsItemList,
    //获取个人页资源详情资源交换列表Action
    getPersonalResourcesListViewDetailsItemListAction,
    //获取个人页资源详情用户头像Action
    getPersonalUserHeadPortraitViewDetail,
    //改变个人信息部分距离父级元素顶部的高度,使个人信息页面主体信息随着窗口滚动而滚动
    changePersonalInformationScrollTop,
    //重置个人页资源页面Action
    resetPersonalResourcesListViewDetailsAction,
    //重置个人页资源详情Action
    resetPersonalResourcesListViewDetailsContentAction,
    //个人信息页面删除资源交换列表
    deletePersonalResourcesExchange,
    //个人信息页面资源交换列表更换交换关系状态
    selectPersonalResourceExchange,
    //显示个人页资源详情对话框footer底部区域Action
    openPersonalViewDetailsFooter,
    //隐藏个人页资源详情对话框footer底部区域Action
    closePersonalViewDetailsFooter,
    //个人页资源详情资源交换列表显示可关闭标志位Action
    openPersonalViewDetailsItemClose,
    //个人页资源详情资源交换列表隐藏可关闭标志位Action
    closePersonalViewDetailsItemClose,
    //个人页资源详情匹配到的资源列表边栏显示Action
    openPersonalViewDetailsAside,
    //个人页资源详情匹配到的资源列表边栏隐藏Action
    closePersonalViewDetailsAside,
    //个人页资源详情资源交换列表显示描述浮层
    openPersonalViewDetailsItemHover,
    //个人页资源详情资源交换列表隐藏使描述浮层消失
    closePersonalViewDetailsItemHover,
    //使客户的头像和背景可编辑Action
    changePersonalEditAppearanceAction,
    //使客户的头像和背景不可编辑Action
    closePersonalEditAppearanceAction,
    //修改个人页头像成功Action
    uploadPersonalAvatarAction,
    //更新并保存个人信息Action
    saveChangePersonalInformation,
    //获取个人页资源详情评论列表
    getPersonalResourcesListViewDetailsCommentList,
    //改变"评论"富文本编辑器编辑框内容Action
    changePersonalResourcesListViewDetailsCommentAction,
    //插入个人资源详情评论
    doPersonalResourcesListViewDetailsComment,
    //获取个人资源详情评论列表Action
    getPersonalResourcesListViewDetailsCommentListAction,
    //获取个人资源列表滚动条初始距离顶部高度Action
    getPersonalResourcesListPaginationBeforeOsTopAction,
    //改变个人资源分页页码Action
    changePersonalResourcesListPaginationCurrentAction,
    //改变匹配资源"评论"富文本编辑器编辑框内容Action
    changePersonalMatchedResourcesListViewDetailsCommentAction
} from "../actions/personalActions";
import {
    paginationPlus,
    paginationMinus
} from "../reducers/personalReducers";
import "../../stylesheets/personal.css";
import "../../stylesheets/adapateConfig.css";

//个人信息可编辑组件类型
const componentType = ["input"];
//个人信息资源详情资源交换列表状态切换标识className样式表
const exchangeStatusClassName = ["keryi_barter_personal_view_details_item_carousel_checked", "keryi_barter_personal_view_details_item_carousel_unchecked"];
//用户编辑自己的头像和背景className样式表
const editAppearanceClassName = "keryi_barter_personal_edit_appearance";
//用户编辑自己的头像和背景时保存和取消部分className样式表
const editAppearanceSaveSomeClassName = "keryi_barter_personal_save_some";
//用户编辑自己的头像和背景动画渲染className样式表
const editAppearanceAnimationClassName = "keryi_barter_personal_edit_appearance keryi_barter_personal_edit_appearance_animation";
//用户编辑自己的头像和背景时保存和取消部分动画渲染className样式表
const editAppearanceAnimationSaveSomeClassName = "keryi_barter_personal_save_some keryi_barter_personal_save_some_animation";
//"以物换物"评论区域消失样式表
const comment = "keryi_barter_personal_view_details_comment";
//"以物换物"评论区域显示样式表
const commentAppearClass = "keryi_barter_personal_view_details_comment keryi_barter_personal_view_details_comment_block keryi_barter_personal_view_details_comment_appear";
//"以物换物"评论区域隐藏样式表
const commentBlockClass = "keryi_barter_personal_view_details_comment keryi_barter_personal_view_details_comment_block";
const PAGE_SIZE = 10;
//设置moment时间地区语言
moment.locale('zh-cn');

class PersonalView extends React.Component {
    static propTypes = {
        //用户登录的id
        userId: PropTypes.number,
        //确认进行资源交换的匹配资源的用户id
        matchedUserId: PropTypes.number,
        //确认进行资源交换的匹配资源id
        matchedId: PropTypes.number,
        //用户登录的用户名
        username: PropTypes.string,
        //用户登录的手机号
        phone: PropTypes.string,
        //用户登录的邮箱
        email: PropTypes.string,
        //用户登录的头像
        avatar: PropTypes.string,
        //用户是否可以对自己的头像和背景进行编辑的标识位
        editAppearance: PropTypes.bool,
        //是否首页选择交换匹配的匹配资源标识位
        isBrowserMatched: PropTypes.bool,
        //用户登录的个性签名
        motto: PropTypes.string,
        //获取个人页资源数据列表
        list: PropTypes.array,
        //个人页资源数据列表页码
        current: PropTypes.number,
        //分页防并发变量
        currentAsync: PropTypes.bool,
        //滚动条初始距离顶部高度
        beforeOsTop: PropTypes.number,
        //评论详情
        comment: PropTypes.string,
        //匹配资源评论详情
        commentMatched: PropTypes.string,
        //评论列表
        commentList: PropTypes.array,
        //匹配资源评论列表
        commentMatchedList: PropTypes.array,
        //评论列表页码
        commentCurrent: PropTypes.number,
        //匹配资源评论列表页码
        commentMatchedCurrent: PropTypes.number,
        //评论列表评论条数
        commentTotal: PropTypes.number,
        //匹配资源评论列表评论条数
        commentMatchedTotal: PropTypes.number,
        //个人页资源详情匹配到的资源列表边栏是否显示
        asideAble: PropTypes.bool,
        //个人页资源详情资源交换列表页码
        itemCurrent: PropTypes.number,
        //个人页资源详情资源交换列表是否可关闭标志位
        itemClose: PropTypes.bool,
        //个人信息部分距离父级元素顶部的高度
        top: PropTypes.number,
        //个人页资源详情对话框是否显示footer底部区域
        viewDetailFooter: PropTypes.bool,
        //个人页资源详情对象
        viewDetailKeryiCard: PropTypes.object,
        //资源ID
        viewDetailId: PropTypes.number,
        //个人页资源详情用户头像
        viewDetailHeadPortrait: PropTypes.string,
        //个人页资源详情用户名
        viewDetailUserName: PropTypes.string,
        //个人页资源详情上传图片数组
        viewDetailImageList: PropTypes.string,
        //个人页资源详情标题
        viewDetailTitle: PropTypes.string,
        //个人页资源详情资源介绍
        viewDetailIntroduce: PropTypes.string,
        //个人页资源详情被需要数目
        viewDetailNeedParty: PropTypes.number,
        //个人页资源详情资源估值
        viewDetailPriceWorth: PropTypes.number,
        //个人页资源详情喜欢数目
        viewDetailLike: PropTypes.number,
        //个人页资源详情资源标签
        viewDetailTagList: PropTypes.array,
        //个人页资源详情目标资源标签
        viewDetailTargetTagList: PropTypes.array,
        //判断个人信息是否可编辑
        personalInformationDisabled: PropTypes.bool,
        //个人页资源详情匹配到的所有的资源列表
        viewDetailMatchedResources: PropTypes.array,
        //个人页资源详情资源交换上传图片(第一张)以及标题内容列表
        viewDetailItemImageOrContentList: PropTypes.array,
        //个人页资源详情资源交换列表是否显示描述浮层
        viewDetailItemHover: PropTypes.bool,
        //个人页资源详情资源交换列表
        viewDetailItemExchange: PropTypes.object,
        //个人页资源详情匹配资源交换列表
        viewDetailMatchedItemExchange: PropTypes.object
    };

    constructor(props) {
        super(props);
        this.state = {
            //用户登录的id
            userId: 0,
            //判断个人信息资源详情是否是匹配资源
            isMatched: false,
            //获取到个人信息容器距离顶部的绝对位置
            absoluteTop: 0,
            //个人信息资源详情资源交换列表状态切换标识
            exchangeStatus: exchangeStatusConfig[0]["key"],
            //个人信息资源详情资源交换列表状态描述
            exchangeStatusText: exchangeStatusConfig[0]["value"],
            //用户是否可以对自己的头像和背景进行编辑的动画渲染标识位
            editAppearanceAnimation: false,
            //判断个人信息编辑动画是否可渲染
            personalInformationAnimationDisabled: false,
            //控制Modal组件对话框显示、隐藏或者消失
            viewPersonalBarterVisible: false,
            //控制"以物换物"资源详情评论区域显示或者隐藏
            commentAppear: false,
            //控制"以物换物"资源详情评论区域隐藏或者消失
            commentBlock: false,
            //控制"以物换物"资源详情评论区域或者资源详情区域的icon标识是否存在
            hasCommentIcon: false,
            //控制"以物换物"资源详情评论区域或者资源详情区域的icon标识的显示和消失
            iconCommentOrInformation: false
        };
    }

    /**
     * 组件开始装载
     */
    componentWillMount() {
        //将redux props转化为state
        const {mapPropsToState} = this;
        mapPropsToState.bind(this)();
    }

    componentWillReceiveProps(nextProps) {
        //将redux props转化为state
        const {mapPropsToState} = this;
        const {
            //判断个人信息是否可编辑
            personalInformationDisabled
        } = this.props;
        if (personalInformationDisabled !== nextProps.personalInformationDisabled) {
            //FIXME
            setTimeout(function timer() {
                this.setState({
                    personalInformationAnimationDisabled: nextProps.personalInformationDisabled
                });
            }.bind(this), 100);
        }
        mapPropsToState.bind(this)(nextProps);
    }

    /**
     * 组件结束装载
     */
    componentDidMount() {
        const {
            //获取资源数据列表、个人信息以及添加个人信息和个人资源分页滚动事件控制器
            getPersonalResourceInformationAndAddScrollEventGenerator
        } = this;
        const {
            //控制Modal组件对话框显示,获取个人信息页面资源详情
            viewPersonalKeryiBarterHandler
        } = this.props;
        //获取browserHistory传递过来的参数
        const keryiCard = this.props.location.state && this.props.location.state["keryiCard"];
        //获取到滚动条距离顶部的高度
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop,
            //个人信息容器距离顶部的高度
            mainInformationTop = this.refs["mainInformation"].getBoundingClientRect().top,
            //获取到个人信息容器距离顶部的绝对位置
            absoluteTop = scrollTop + mainInformationTop;
        this.setState({
            absoluteTop
        }, function absoluteToper() {
            let getPersonalResourceInformationAndAddScrollEvent = getPersonalResourceInformationAndAddScrollEventGenerator.bind(this)();
            let getPersonalResourceInformationAndAddScrollEventDone = getPersonalResourceInformationAndAddScrollEvent.next().done;
            while (!getPersonalResourceInformationAndAddScrollEventDone) {
                getPersonalResourceInformationAndAddScrollEventDone = getPersonalResourceInformationAndAddScrollEvent.next().done;
            }
        }.bind(this));
        if (keryiCard) {
            viewPersonalKeryiBarterHandler.bind(this)(keryiCard);
        }
    }

    /**
     * 获取资源数据列表、个人信息以及添加个人信息和个人资源分页滚动事件控制器
     */
    * getPersonalResourceInformationAndAddScrollEventGenerator() {
        const {
            //dispatch获取资源数据列表
            dispatchPersonalResourceList,
            //dispatch获取个人信息
            dispatchPersonalInformation
        } = this.props;
        const {
            //添加个人信息监听和个人资源分页滚动事件
            addScrollEventHandler
        } = this;
        yield dispatchPersonalResourceList.bind(this)().then(function resolve() {
            dispatchPersonalInformation.bind(this)();
        }.bind(this), function reject() {

        }.bind(this));
        yield addScrollEventHandler.bind(this)();
    }

    /**
     * 添加个人信息监听和个人资源分页滚动事件
     */
    addScrollEventHandler() {
        //滚动事件监听函数
        const {dispatchScrollEventListener} = this;
        //保存滚动条初始距离顶部高度脚手架
        const {saveBeforeOsTopHandler} = this.props;
        //滚动条初始距离顶部高度
        let beforeOsTop = document.documentElement.scrollTop || document.body.scrollTop;
        //获取个人信息页面主容器
        let mainPersonalBarter = this.refs["mainPersonalBarter"];
        //获取个人信息页面主容器距离顶部的高度
        let mainPersonalBarterTop = mainPersonalBarter.getBoundingClientRect().top;
        saveBeforeOsTopHandler.bind(this)(beforeOsTop);
        dispatchScrollEventListener.bind(this)(mainPersonalBarterTop);
    }

    /**
     * 组件卸载
     */
    componentWillUnmount() {
        const {
            //消除滚动事件监听函数
            dispatchCloseScrollEventListener
        } = this;
        const {
            //重置个人页资源详情
            resetPersonalResourceListViewDetailsHandler
        } = this.props;
        dispatchCloseScrollEventListener.bind(this)();
        resetPersonalResourceListViewDetailsHandler.bind(this)();
    }

    /**
     * 分页获取资源数据列表控制集成器
     * @param docTop
     */
    scrollGetPersonalResourceListByPagination(docTop) {
        const {
            //分页获取资源数据列表脚手架
            getPersonalResourceListByPaginationHandler,
            //dispatch获取个人页资源数据列表
            dispatchPersonalResourceList
        } = this.props;
        getPersonalResourceListByPaginationHandler.bind(this)(docTop).then(function resolve() {
            dispatchPersonalResourceList.bind(this)();
        }.bind(this), function reject() {

        }.bind(this));
    }

    /**
     * 滚动事件监听函数
     */
    dispatchScrollEventListener(docTop) {
        const {
            //分页获取资源数据列表控制集成器
            scrollGetPersonalResourceListByPagination
        } = this;
        const {
            //监听窗口滚动事件,使个人信息页面主体信息随着窗口滚动而滚动
            personalInformationScrollHandler
        } = this.props;
        window.addEventListener("scroll", personalInformationScrollHandler.bind(this));
        window.addEventListener("scroll", scrollGetPersonalResourceListByPagination.bind(this, docTop));
    }

    /**
     * 消除滚动事件监听函数
     */
    dispatchCloseScrollEventListener() {
        const {
            //分页获取资源数据列表控制集成器
            scrollGetPersonalResourceListByPagination
        } = this;
        const {
            //监听窗口滚动事件,使个人信息页面主体信息随着窗口滚动而滚动
            personalInformationScrollHandler
        } = this.props;
        window.removeEventListener("scroll", personalInformationScrollHandler.bind(this));
        window.removeEventListener("scroll", scrollGetPersonalResourceListByPagination.bind(this));
    }

    /**
     * 将redux props转化为state
     * @param props
     */
    mapPropsToState(props = this.props) {
        let userLoginInformation;
        if (localStorage) {
            userLoginInformation = JSON.parse(localStorage.getItem("userLoginInformation"));
        } else {
            return false;
        }
        this.setState({
            ...props,
            userId: checkField(userLoginInformation, "id")
        });
    }

    /**
     * render渲染keryi_barter个人信息页面头部阴影
     * @returns {XML}
     */
    renderPersonalShadow() {
        return (
            <div className="keryi_barter_personal_head_shadow">

            </div>
        )
    }

    /**
     * render渲染keryi_barter个人信息页面头部用户名
     * @returns {XML}
     */
    renderPersonalHeaderUsername() {
        const {
            //用户登录的用户名
            username
        } = this.props;
        return (
            <dfn className="keryi_barter_personal_head_username">
                {username}
            </dfn>
        )
    }

    /**
     * render渲染keryi_barter个人信息页面头部编辑外观按钮
     * @returns {XML}
     */
    renderPersonalUpdateSurface() {
        const {
            //点击编辑外观按钮,使客户的头像和背景可编辑
            changePersonalEditAppearance,
            //用户是否可以对自己的头像和背景进行编辑的标识位
            editAppearance
        } = this.props;
        return (
            <section className="keryi_barter_personal_head_update_surface">
                {
                    !editAppearance && <Button
                        size="default"
                        type="info"
                        className="keryi_barter_personal_head_update_surface_button"
                        onClick={changePersonalEditAppearance.bind(this)}
                    >
                        编辑外观
                    </Button>
                }
            </section>
        )
    }

    /**
     * 根据state editAppearanceAnimation来设置头像和背景的className样式表
     * @returns string
     */
    editAppearanceAnimationToClass() {
        const {
            //用户是否可以对自己的头像和背景进行编辑的动画渲染标识位
            editAppearanceAnimation
        } = this.state;
        return editAppearanceAnimation ? editAppearanceAnimationClassName : editAppearanceClassName;
    }

    /**
     * render渲染keryi_barter个人信息页面头部背景和头像
     * @returns {XML}
     */
    renderPersonalHeaderBackgroundAndPortrait() {
        const {
            //用户登录的id
            userId,
            //用户登录的头像
            avatar
        } = this.state;
        const {
            //根据state editAppearanceAnimation来设置头像和背景的className样式表
            editAppearanceAnimationToClass
        } = this;
        const {
            //用户是否可以对自己的头像和背景进行编辑的标识位
            editAppearance,
            //修改头像成功回调函数
            uploadPersonalAvatar
        } = this.props;
        return (
            <figure
                className="keryi_barter_personal_head_portrait"
            >
                {
                    editAppearance && <section className={editAppearanceAnimationToClass.bind(this)()}>
                        <Upload {...uploadConfig.bind(this)("file", api.UPDATE_PERSONAL_AVATAR + "/" + userId + "/avatar", {}, uploadPersonalAvatar.bind(this))}
                                className="keryi_barter_personal_upload">
                            <i className="iconfontKeryiBarter keryiBarter-updateAvatar">

                            </i>
                        </Upload>
                    </section>
                }
                <HeadPortrait
                    headPortrait={userId ? api.GET_PERSONAL_AVATAR + "/" + userId + "/avatar" : "/images/keryiBarter_v.png"}
                    borderJudgement={true}
                />
            </figure>
        )
    }

    /**
     * render渲染keryi_barter个人信息页面头部
     * @returns {XML}
     */
    renderPersonalHeader() {
        const {
            //render渲染个人信息页面头部阴影
            renderPersonalShadow,
            //render渲染个人信息页面头部用户名
            renderPersonalHeaderUsername,
            //render渲染个人信息页面头部编辑外观按钮
            renderPersonalUpdateSurface,
            //render渲染个人信息页面头部背景和头像
            renderPersonalHeaderBackgroundAndPortrait
        } = this;
        return (
            <header
                className="keryi_barter_personal_head"
                style={{background: "url(/images/keryiBarter_login_bg.png) no-repeat center center / cover border-box content-box"}}
            >
                {/*render渲染个人信息页面头部阴影*/}
                {renderPersonalShadow.bind(this)()}
                {/*render渲染个人信息页面头部用户名*/}
                {renderPersonalHeaderUsername.bind(this)()}
                {/*render渲染个人信息页面头部编辑外观按钮*/}
                {renderPersonalUpdateSurface.bind(this)()}
                {/*render渲染个人信息页面头部背景和头像*/}
                {renderPersonalHeaderBackgroundAndPortrait.bind(this)()}
            </header>
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
     * render渲染keryi_barter个人信息页面资源信息
     * @returns {XML}
     */
    renderPersonalInformationCard(keryiCard, key) {
        const {
            //处理Tag组件标签,添加type属性
            tagOrTargetTagListHandlerAddType
        } = this;
        const {
            //控制Modal组件对话框显示,获取个人信息页面资源详情
            viewPersonalKeryiBarterHandler
        } = this.props;
        tagOrTargetTagListHandlerAddType.bind(this)(keryiCard["tags"], "primary");
        tagOrTargetTagListHandlerAddType.bind(this)(keryiCard["targetTags"], "info");
        return (
            <section
                key={key}
                className="keryi_barter_personal_cardInfo"
            >
                <KeryiCard
                    userName={keryiCard["user"]["username"]}
                    title={keryiCard["title"]}
                    imageList={eval("(" + keryiCard["imgUrls"] + ")")}
                    introduce={keryiCard["intro"]}
                    tagList={keryiCard["tags"]}
                    targetTagList={keryiCard["targetTags"]}
                    priceWorth={keryiCard["priceWorth"]}
                    like={keryiCard["likeCount"]}
                    control={[]}
                    viewDetails="iconfontKeryiBarter keryiBarter-moreInformation"
                    onViewDetails={viewPersonalKeryiBarterHandler.bind(this, keryiCard)}
                />
            </section>
        )
    }

    /**
     * "以物换物"资源详情到评论区域控制器
     */
    * changeInformationToCommentHandler() {
        const {
            //资源ID
            viewDetailId,
            //获取资源详情评论列表脚手架
            getPersonalResourcesListViewDetailsCommentListHandler
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
        yield getPersonalResourcesListViewDetailsCommentListHandler.bind(this)(viewDetailId, userId, userId, commentCurrent);
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
     * render渲染keryi_barter个人信息页面查看控制"以物换物"资源详情评论区域或者资源详情区域的icon标识的显示和消失
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
     * render渲染keryi_barter个人信息页面查看"以物换物"资源详情对话框头部
     * @returns {XML}
     */
    renderModalHeader() {
        const {
            //个人页资源详情用户头像
            viewDetailHeadPortrait,
            //个人页资源详情用户名
            viewDetailUserName,
            //个人页资源详情标题
            viewDetailTitle
        } = this.props;
        return (
            <header className="keryi_barter_personal_view_details_head">
                <figure
                    className="keryi_barter_personal_view_details_head_portrait"
                >
                    <HeadPortrait
                        headPortrait={viewDetailHeadPortrait ? viewDetailHeadPortrait : "/images/keryiBarter_v.png"}
                    />
                </figure>
                <dfn className="keryi_barter_personal_view_details_description">
                    <h1 className="keryi_barter_personal_view_details_title">
                        {viewDetailTitle}
                    </h1>
                    <cite className="keryi_barter_personal_view_details_userName">
                        资源由 <abbr className="keryi_barter_personal_view_details_name">{viewDetailUserName}</abbr> 发布
                    </cite>
                </dfn>
            </header>
        )
    }

    /**
     * render渲染keryi_barter个人信息页面查看"以物换物"资源详情对话框资源统计
     * @returns {XML}
     */
    renderModalStatistics() {
        return (
            <section className="keryi_barter_personal_view_details_statistics">
                <ul className="keryi_barter_personal_view_details_statistics_ulList">
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
                                    <dfn className="keryi_barter_personal_view_details_statistics_description">
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
     * render渲染keryi_barter个人信息页面查看"以物换物"资源详情对话框图片轮播器
     * @returns {XML}
     */
    renderModalFigureCarousel() {
        const {
            //个人页资源详情上传图片数组
            viewDetailImageList
        } = this.props;
        return (
            <section className="keryi_barter_personal_view_details_figure_carousel">
                <FigureCarousel
                    close={false}
                    imageList={eval("(" + viewDetailImageList + ")")}
                />
            </section>
        )
    }

    /**
     * 设置个人信息页面资源详情资源介绍HTML文本
     * @returns {{__html: PersonalView.props.viewDetailIntroduce}}
     */
    setInnerPersonalModalIntroduceHTML() {
        const {
            //个人页资源详情资源介绍
            viewDetailIntroduce
        } = this.props;
        return {
            __html: viewDetailIntroduce
        }
    }

    /**
     * render渲染keryi_barter个人信息页面查看"以物换物"资源详情对话框主体介绍
     * @returns {XML}
     */
    renderModalIntroduce() {
        const {
            //设置个人信息页面资源详情资源介绍HTML文本
            setInnerPersonalModalIntroduceHTML
        } = this;
        return (
            <section className="keryi_barter_personal_view_details_introduce">
                <article
                    className="keryi_barter_personal_view_details_introduce_content"
                    dangerouslySetInnerHTML={setInnerPersonalModalIntroduceHTML.bind(this)()}
                >
                </article>
                <hr className="keryi_barter_personal_view_details_wire"/>
            </section>
        )
    }

    /**
     * render渲染keryi_barter个人信息页面查看"以物换物"资源详情对话框资源标签
     * @returns {XML}
     */
    renderModalTag() {
        const {
            //个人页资源详情资源标签
            viewDetailTagList
        } = this.props;
        const {
            //处理Tag组件标签,添加type属性
            tagOrTargetTagListHandlerAddType
        } = this;
        tagOrTargetTagListHandlerAddType.bind(this)(viewDetailTagList, "primary");
        return (
            <section className="keryi_barter_personal_view_details_tag">
                <h2 className="keryi_barter_personal_view_details_tag_title">资源类型</h2>
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
                <hr className="keryi_barter_personal_view_details_wire"/>
            </section>
        )
    }

    /**
     * render渲染keryi_barter个人信息页面查看"以物换物"资源详情对话框目标资源标签
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
            <section className="keryi_barter_personal_view_details_targetTag">
                <h2 className="keryi_barter_personal_view_details_targetTag_title">目标资源类型</h2>
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
                <hr className="keryi_barter_personal_view_details_wire"/>
            </section>
        )
    }

    /**
     * render渲染keryi_barter个人信息页面查看"以物换物"资源详情对话框已交换的资源
     * @returns {XML}
     */
    renderModalItemCarousel() {
        const {
            //个人信息资源详情资源交换列表状态切换标识
            exchangeStatus,
            //个人信息资源详情资源交换列表状态描述
            exchangeStatusText
        } = this.state;
        const {
            //个人页资源详情上传图片(第一张)以及标题内容列表
            viewDetailItemImageOrContentList,
            //个人页资源详情资源交换列表是否可关闭标志位
            itemClose,
            //个人页资源详情资源交换列表是否显示描述浮层
            viewDetailItemHover,
            //改变个人信息资源详情资源交换列表状态
            changeExchangeStatus,
            //改变个人信息资源详情资源交换列表元素个数
            onChangeExchangeItemListHandler,
            //改变个人信息资源详情资源交换列表更换交换关系状态
            onSelectExchangeItemListHandler
        } = this.props;
        return (
            <section className="keryi_barter_personal_view_details_item_carousel">
                <h2 className="keryi_barter_personal_view_details_item_carousel_title">
                    资源交换列表
                </h2>
                <ul className="keryi_barter_personal_view_details_item_carousel_menu">
                    {
                        exchangeStatusConfig.map(function exchanger(exchangeItem, exchangeIndex) {
                            return (
                                <li
                                    key={exchangeItem["key"]}
                                    className={exchangeItem["key"] === exchangeStatus ? exchangeStatusClassName[0] : exchangeStatusClassName[1]}
                                    onClick={changeExchangeStatus.bind(this, exchangeItem["key"], exchangeItem["value"])}
                                >
                                    <i className={exchangeItem["className"]}>

                                    </i>
                                    {exchangeItem["value"]}
                                    <hr className="keryi_barter_personal_view_details_item_carousel_wired"/>
                                </li>
                            )
                        }.bind(this))
                    }
                </ul>
                <main className="keryi_barter_personal_view_details_item_carousel_content">
                    <ItemCarousel
                        itemList={viewDetailItemImageOrContentList}
                        hover={viewDetailItemHover}
                        hoverStatisticsConfig={statisticsConfig}
                        exchangeStatusConfig={exchangeStatusConfig}
                        split={4}
                        close={itemClose}
                        noneAlert={"您还没有\"" + exchangeStatusText + "\"的资源交换记录~"}
                        className="keryi_barter_personal_view_details_itemCarousel"
                        onSelect={onSelectExchangeItemListHandler.bind(this)}
                        onChange={onChangeExchangeItemListHandler.bind(this)}
                    />
                </main>
            </section>
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
                    className="keryi_barter_personal_view_details_comment_list_itemSection">
                    <aside className="keryi_barter_personal_view_details_comment_list_itemAvatar">
                        <HeadPortrait
                            headPortrait={`${api.GET_PERSONAL_AVATAR}/${commentItem["fromUser"]["id"]}/avatar`}
                            borderJudgement={false}
                        />
                    </aside>
                    <article className="keryi_barter_personal_view_details_comment_list_itemContent">
                        <h5 className="keryi_barter_personal_view_details_comment_list_itemContent_title">
                            {commentItem["fromUser"]["username"]}
                        </h5>
                        <p
                            dangerouslySetInnerHTML={setCommentListItemContentInnerHTML.bind(this)(commentItem["comment"])}
                            className="keryi_barter_personal_view_details_comment_list_itemContent_pragraph"
                        >
                        </p>
                        <time className="keryi_barter_personal_view_details_comment_list_itemContent_time">
                            {moment(commentItem["createDate"]).fromNow()}
                        </time>
                    </article>
                    <hr className="keryi_barter_personal_view_details_comment_list_itemSection_wire"/>
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
            <main className="keryi_barter_personal_view_details_comment_list">
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
            <main className="keryi_barter_personal_view_details_comment_none">
                <section className="keryi_barter_personal_view_details_comment_none_container">
                    <i className="iconfontKeryiBarter keryiBarter-cry"> </i>
                    <dfn className="keryi_barter_personal_view_details_comment_none_content">此资源暂无评论</dfn>
                </section>
            </main>
        );
    }

    /**
     * render渲染keryi_barter个人信息页面查看"以物换物"评论区域
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
                    className="keryi_barter_personal_view_details_comment_area"
                    comment={true}
                    onChange={changeCommentHandler.bind(this)}
                />
                <section className="keryi_barter_personal_view_details_comment_submit">
                    <Button
                        title="评论"
                        size="default"
                        type="info"
                        className="keryi_barter_personal_view_details_comment_submit_button"
                        onClick={doCommentHandler.bind(this)}
                    >
                        评论
                    </Button>
                </section>
                <article className="keryi_barter_personal_view_details_comment_content">
                    <header className="keryi_barter_personal_view_details_comment_content_header"
                            data-comment-total={commentTotal}>
                    </header>
                    <section className="keryi_barter_personal_view_details_comment_clear">

                    </section>
                    <Pagination
                        current={commentCurrent}
                        className="keryi_barter_personal_view_details_comment_pagination"
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
     * keryi_barter主页面查看"以物换物"匹配资源评论区域评论列表项
     * @returns [{*}]
     */
    renderModalMatchedCommentListItem() {
        const {
            //匹配资源评论列表
            commentMatchedList
        } = this.props;
        const {
            //设置资源详情评论详情HTML文本
            setCommentListItemContentInnerHTML
        } = this;
        let commentMatchedList_length = commentMatchedList.length;
        return commentMatchedList.map(function commentMatchedListItem(commentMatchedItem, commentMatchedIndex) {
            return (
                <section
                    key={commentMatchedIndex}
                    className="keryi_barter_personal_view_details_matched_comment_list_itemSection">
                    <aside className="keryi_barter_personal_view_details_matched_comment_list_itemAvatar">
                        <HeadPortrait
                            headPortrait={`${api.GET_PERSONAL_AVATAR}/${commentMatchedItem["fromUser"]["id"]}/avatar`}
                            borderJudgement={false}
                        />
                    </aside>
                    <article className="keryi_barter_personal_view_details_matched_comment_list_itemContent">
                        <h5 className="keryi_barter_personal_view_details_matched_comment_list_itemContent_title">
                            {commentMatchedItem["fromUser"]["username"]}
                        </h5>
                        <p
                            dangerouslySetInnerHTML={setCommentListItemContentInnerHTML.bind(this)(commentMatchedItem["comment"])}
                            className="keryi_barter_personal_view_details_matched_comment_list_itemContent_pragraph"
                        >
                        </p>
                        <time className="keryi_barter_personal_view_details_matched_comment_list_itemContent_time">
                            {moment(commentMatchedItem["createDate"]).fromNow()}
                        </time>
                    </article>
                    {
                        commentMatchedIndex !== (commentMatchedList_length - 1) ?
                            <hr className="keryi_barter_personal_view_details_matched_comment_list_itemSection_wire"/> :
                            <hr className="keryi_barter_personal_view_details_matched_comment_list_itemSection_wireNone"/>
                    }
                </section>
            )
        });
    }

    /**
     * keryi_barter主页面查看"以物换物"匹配资源评论区域评论列表
     * @returns {*}
     */
    renderModalMatchedCommentList() {
        const {
            //查看"以物换物"匹配资源评论区域评论列表项
            renderModalMatchedCommentListItem
        } = this;
        return (
            <main className="keryi_barter_personal_view_details_matched_comment_list">
                {renderModalMatchedCommentListItem.bind(this)()}
            </main>
        );
    }

    /**
     * keryi_barter主页面查看"以物换物"匹配资源评论区域评论为空时的界面
     * @returns {*}
     */
    renderModalMatchedCommentNone() {
        return (
            <main className="keryi_barter_personal_view_details_matched_comment_none">
                <section className="keryi_barter_personal_view_details_matched_comment_none_container">
                    <i className="iconfontKeryiBarter keryiBarter-cry"> </i>
                    <dfn className="keryi_barter_personal_view_details_matched_comment_none_content">此资源暂无评论</dfn>
                </section>
            </main>
        );
    }

    /**
     * render渲染keryi_barter个人信息页面匹配到的资源列表"以物换物"评论区域
     * @returns {XML}
     */
    renderMatchedModalComment() {
        const {
            //查看"以物换物"匹配资源评论区域评论列表
            renderModalMatchedCommentList,
            //查看"以物换物"匹配资源评论区域评论为空时的界面
            renderModalMatchedCommentNone
        } = this;
        const {
            //匹配资源评论详情
            commentMatched,
            //匹配资源评论列表
            commentMatchedList,
            //匹配资源评论列表页码
            commentMatchedCurrent,
            //匹配资源评论列表评论条数
            commentMatchedTotal,
            //改变匹配资源"评论"富文本编辑器编辑框内容
            changeMatchedCommentHandler,
            //匹配资源"评论"富文本编辑器编辑框添加评论
            doMatchedCommentHandler,
            //点击匹配资源"评论"系统分页方法
            loadMatchedPageMore
        } = this.props;
        return (
            <section className="keryi_barter_personal_view_details_matched_comment">
                <h2 className="keryi_barter_personal_view_details_matched_comment_title">
                    评论
                </h2>
                <Area
                    value={commentMatched}
                    size="large"
                    placeholder="请输入您对此资源的评论~"
                    className="keryi_barter_personal_view_details_matched_comment_area"
                    comment={true}
                    onChange={changeMatchedCommentHandler.bind(this)}
                />
                <section className="keryi_barter_personal_view_details_matched_comment_submit">
                    <Button
                        title="评论"
                        size="default"
                        type="info"
                        className="keryi_barter_personal_view_details_matched_comment_submit_button"
                        onClick={doMatchedCommentHandler.bind(this)}
                    >
                        评论
                    </Button>
                </section>
                <article className="keryi_barter_personal_view_details_matched_comment_content">
                    <header className="keryi_barter_personal_view_details_matched_comment_content_header"
                            data-matched-comment-total={commentMatchedTotal}>
                    </header>
                    <section className="keryi_barter_personal_view_details_matched_comment_clear">

                    </section>
                    <Pagination
                        current={commentMatchedCurrent}
                        className="keryi_barter_personal_view_details_matched_comment_pagination"
                        onChange={loadMatchedPageMore.bind(this)}
                        pageSize={PAGE_SIZE}
                        showQuickJumper
                        showTotal={total => `共 ${total} 条评论`}
                        total={commentMatchedTotal}
                    />
                    {
                        (commentMatchedList && commentMatchedList.length > 0) ? renderModalMatchedCommentList.bind(this)() : renderModalMatchedCommentNone.bind(this)()
                    }
                </article>
            </section>
        )
    }

    /**
     * render渲染keryi_barter个人信息页面查看"以物换物"资源详情对话框
     * @returns {XML}
     */
    renderPersonalModal() {
        const {
            //render渲染个人信息页面查看控制"以物换物"资源详情评论区域或者资源详情区域的icon标识的显示和消失
            renderModalIconOrInformationComment,
            //render渲染个人信息页面查看"以物换物"资源详情对话框头部
            renderModalHeader,
            //render渲染个人信息页面查看"以物换物"资源详情对话框资源统计
            renderModalStatistics,
            //render渲染个人信息页面查看"以物换物"资源详情对话框图片轮播器
            renderModalFigureCarousel,
            //render渲染个人信息页面查看"以物换物"资源详情对话框主体介绍
            renderModalIntroduce,
            //render渲染个人信息页面查看"以物换物"资源详情对话框资源标签
            renderModalTag,
            //render渲染个人信息页面查看"以物换物"资源详情对话框目标资源标签
            renderModalTargetTag,
            //render渲染个人信息页面查看"以物换物"资源详情对话框已交换的资源
            renderModalItemCarousel,
            //render渲染个人信息页面查看"以物换物"评论区域
            renderModalComment,
            //render渲染个人信息页面匹配到的资源列表"以物换物"评论区域
            renderMatchedModalComment
        } = this;
        const {
            //控制Modal组件对话框显示、隐藏或者消失
            viewPersonalBarterVisible,
            //控制"以物换物"资源详情评论区域或者资源详情区域的icon标识是否存在
            hasCommentIcon,
            //判断个人信息资源详情是否是匹配资源
            isMatched
        } = this.state;
        const {
            //个人页资源详情匹配到的所有的资源列表
            viewDetailMatchedResources,
            //个人页资源详情对话框是否显示footer底部区域
            viewDetailFooter,
            //个人页资源详情匹配到的资源列表边栏是否显示
            asideAble,
            //控制Modal组件对话框隐藏并消失
            closePersonalBarterVisibleHandler,
            //点击个人信息页面资源详情匹配资源列表,更新个人信息页面资源详情
            viewPersonalKeryiBarterModalHandler,
            //点击个人信息页面资源详情返回"我的资源",更新个人信息页面资源详情
            onBackHandler,
            //点击个人信息页面资源详情返回"资源交换",发起与其他用户的资源交换请求
            onOkHandler
        } = this.props;
        return (
            <Modal
                visible={viewPersonalBarterVisible}
                width={660}
                aside={asideAble}
                asideWidth={300}
                asideTitle="匹配到的资源列表"
                asideDataSource={(viewDetailMatchedResources && viewDetailMatchedResources.length > 0) ? viewDetailMatchedResources : keryiModalDefaultConfig}
                asideStatisticsConfig={statisticsConfig}
                asideClassName="keryi_barter_personal_modal_view_details_asideMain"
                backDfn="我的资源"
                closable
                footer={viewDetailFooter}
                showOk
                okText="资源交换"
                showClose
                closeText="关闭"
                className="keryi_barter_personal_modal_view_details_container"
                onAsideSelect={viewPersonalKeryiBarterModalHandler.bind(this)}
                onBack={onBackHandler.bind(this)}
                onOk={onOkHandler.bind(this)}
                onClose={closePersonalBarterVisibleHandler.bind(this)}
            >
                {/*keryi_barter个人信息页面查看控制"以物换物"资源详情评论区域或者资源详情区域的icon标识的显示和消失*/}
                {hasCommentIcon && renderModalIconOrInformationComment.bind(this)()}
                <section className="keryi_barter_personal_modal_view_details">
                    {/*keryi_barter个人信息页面查看"以物换物"资源详情对话框头部*/}
                    {renderModalHeader.bind(this)()}
                    {/*keryi_barter个人信息页面查看"以物换物"资源详情对话框资源统计*/}
                    {renderModalStatistics.bind(this)()}
                    {/*keryi_barter个人信息页面查看"以物换物"资源详情对话框图片轮播器*/}
                    {renderModalFigureCarousel.bind(this)()}
                    {/*keryi_barter个人信息页面查看"以物换物"资源详情对话框主体介绍*/}
                    {renderModalIntroduce.bind(this)()}
                    {/*keryi_barter个人信息页面查看"以物换物"资源详情对话框资源标签*/}
                    {renderModalTag.bind(this)()}
                    {/*keryi_barter个人信息页面查看"以物换物"资源详情对话框目标资源标签*/}
                    {renderModalTargetTag.bind(this)()}
                    {/*keryi_barter个人信息页面查看"以物换物"资源详情对话框已交换的资源*/}
                    {renderModalItemCarousel.bind(this)()}
                    {/*keryi_barter个人信息页面查看"以物换物"评论区域*/}
                    {renderModalComment.bind(this)()}
                    {/*keryi_barter个人信息页面匹配到的资源列表"以物换物"评论区域*/}
                    {isMatched && renderMatchedModalComment.bind(this)()}
                </section>
            </Modal>
        )
    }

    /**
     * render渲染keryi_barter个人信息页面主体用户名
     * @returns {XML}
     */
    renderPersonalMainUserName() {
        const {
            //用户登录的座右铭
            motto
        } = this.props;
        return (
            <section className="keryi_barter_personal_main_username">
                <h1 className="keryi_barter_personal_main_username_title">
                    {motto}
                </h1>
            </section>
        )
    }

    /**
     * 改变Input输入框中的内容方法函数
     * @param key
     * @param e
     */
    onChangeInputHandler(key, e) {
        this.setState({
            [key]: e.target.value
        });
    }

    /**
     * 根据不同的组件类型配置来设置组件
     * @param key
     * @param value
     * @param include
     * @param size
     * @param type
     * @param className
     * @param disabled
     * @returns {XML}
     */
    renderPersonalMainInformationAreaItem(key, value, include, size, type, className, disabled) {
        const {
            //改变Input输入框中的内容方法函数
            onChangeInputHandler
        } = this;
        switch (include) {
            case componentType[0]:
                return (
                    <main className="keryi_barter_personal_main_information_personalMain">
                        <dfn className="keryi_barter_personal_main_information_personalMain_title">
                            {value}
                        </dfn>
                        <Input
                            value={this.state[key]}
                            size={size}
                            type={type}
                            className={className}
                            disabled={!this.props[disabled]}
                            onChange={onChangeInputHandler.bind(this, key)}
                        />
                    </main>
                )
        }
    }

    /**
     * render渲染keryi_barter个人信息页面主体信息主要内容部分
     * @returns {[XML]}
     */
    renderPersonalMainInformationArea() {
        const {
            //根据不同的组件类型配置来设置组件
            renderPersonalMainInformationAreaItem
        } = this;
        return personalComponentConfig.map(function personaler(personalItem, personalIndex) {
            return (
                <section
                    ref="mainInformationContent"
                    key={personalItem["key"]}
                    className="keryi_barter_personal_main_information_content"
                >
                    {/*根据不同的组件类型配置来设置组件*/}
                    {renderPersonalMainInformationAreaItem.bind(this)(
                        personalItem["key"],
                        personalItem["value"],
                        personalItem["include"],
                        personalItem["size"],
                        personalItem["type"],
                        personalItem["className"],
                        personalItem["disabled"]
                    )}
                </section>
            )
        }.bind(this))
    }

    /**
     * 根据state personalInformationAnimationDisabled来设置个人信息页面主体信息编辑图标className样式表
     * @returns string
     */
    updateClassToClass() {
        //判断个人信息编辑动画是否可渲染
        const {personalInformationAnimationDisabled} = this.state;
        return !personalInformationAnimationDisabled ? "keryi_barter_personal_main_information_update_container keryi_barter_personal_main_information_updateAnimation" : "keryi_barter_personal_main_information_update_container";
    }

    /**
     * render渲染keryi_barter个人信息页面主体信息编辑图标
     * @returns {XML}
     */
    renderPersonalMainInformationUpdate() {
        const {
            //根据state personalInformationAnimationDisabled来设置个人信息页面主体信息编辑图标className样式表
            updateClassToClass
        } = this;
        const {
            //点击编辑图标,使个人信息页面主体信息可编辑
            changePersonalInformationHandler
        } = this.props;
        return (
            <section className={updateClassToClass.bind(this)()}>
                <i
                    className="iconfontKeryiBarter keryiBarter-update"
                    onClick={changePersonalInformationHandler.bind(this)}
                >

                </i>
            </section>
        )
    }

    /**
     * 根据state personalInformationAnimationDisabled来设置个人信息页面主体信息底部按钮className样式表
     * @returns string
     */
    footerClassToClass() {
        //判断个人信息编辑动画是否可渲染
        const {personalInformationAnimationDisabled} = this.state;
        return personalInformationAnimationDisabled ? "keryi_barter_personal_main_information_footer keryi_barter_personal_main_information_footerAnimation" : "keryi_barter_personal_main_information_footer";
    }

    /**
     * render渲染keryi_barter个人信息页面主体信息底部按钮
     * @returns {XML}
     */
    renderPersonalMainInformationFooter() {
        const {
            //根据state personalInformationAnimationDisabled来设置个人信息页面主体信息底部按钮className样式表
            footerClassToClass
        } = this;
        const {
            //点击取消按钮,使个人信息页面主体信息不可编辑
            closeChangePersonalInformationHandler,
            //点击保存按钮,更新个人信息页面主体信息
            saveChangePersonalInformationHandler
        } = this.props;
        return (
            <section className={footerClassToClass.bind(this)()}>
                <Button
                    type="default"
                    size="large"
                    onClick={closeChangePersonalInformationHandler.bind(this)}
                    className="keryi_barter_personal_main_information_footer_button keryi_barter_personal_main_information_footer_cancel_button"
                >
                    取消
                </Button>
                <Button
                    type="primary"
                    size="large"
                    onClick={saveChangePersonalInformationHandler.bind(this)}
                    className="keryi_barter_personal_main_information_footer_button keryi_barter_personal_main_information_footer_save_button"
                >
                    保存
                </Button>
            </section>
        )
    }

    /**
     * render渲染keryi_barter个人信息页面主体信息部分
     * @returns {XML}
     */
    renderPersonalMainInformation() {
        const {
            //render渲染个人信息页面资源信息
            renderPersonalInformationCard,
            //render渲染个人信息页面主体信息主要内容部分
            renderPersonalMainInformationArea,
            //render渲染个人信息页面主体信息编辑图标
            renderPersonalMainInformationUpdate,
            //render渲染个人信息页面主体信息底部按钮
            renderPersonalMainInformationFooter
        } = this;
        const {
            //获取个人页资源数据列表
            list,
            //个人信息部分距离父级元素顶部的高度
            top,
            //判断个人信息是否可编辑
            personalInformationDisabled
        } = this.props;
        return (
            <section className="keryi_barter_personal_main_information_container">
                <main
                    className="keryi_barter_personal_main_information keryi_barter_personal_main_barterList"
                >
                    {
                        (list && list.length > 0) && list.map(function lister(listItem, listIndex) {
                            //render渲染个人信息页面资源信息
                            return renderPersonalInformationCard.bind(this)(listItem, listIndex);
                        }.bind(this))
                        //: renderPersonalInformationCard.bind(this)(keryiCardDefaultConfig, "default")
                    }
                </main>
                <aside
                    ref="mainInformation"
                    className="keryi_barter_personal_main_information keryi_barter_personal_main_personalInformation"
                    style={{top}}
                >
                    <section className="keryi_barter_personal_main_information_fixedContent">
                        <h2
                            ref="mainInformationTitle"
                            className="keryi_barter_personal_main_information_title"
                        >
                            个人信息
                        </h2>
                        {/*render渲染个人信息页面主体信息主要内容部分*/}
                        {renderPersonalMainInformationArea.bind(this)()}
                        {/*render渲染个人信息页面主体信息编辑图标*/}
                        {!personalInformationDisabled && renderPersonalMainInformationUpdate.bind(this)()}
                        {/*render渲染个人信息页面主体信息底部按钮*/}
                        {personalInformationDisabled && renderPersonalMainInformationFooter.bind(this)()}
                    </section>
                </aside>
            </section>
        )
    }

    /**
     * 根据state editAppearanceAnimation来设置头像和背景时保存和取消部分的className样式表
     * @returns string
     */
    editAppearanceAnimationSaveSomeToClass() {
        const {
            //用户是否可以对自己的头像和背景进行编辑的动画渲染标识位
            editAppearanceAnimation
        } = this.state;
        return editAppearanceAnimation ? editAppearanceAnimationSaveSomeClassName : editAppearanceSaveSomeClassName;
    }

    /**
     * render渲染个人信息页面保存头像和背景部分
     * @returns {XML}
     */
    renderPersonalSaveSome() {
        const {
            //根据state editAppearanceAnimation来设置头像和背景时保存和取消部分的className样式表
            editAppearanceAnimationSaveSomeToClass
        } = this;
        const {
            //点击修改个人页背景或者头像部分的保存或者取消,改变编辑标识位
            uploadPersonalBgImageOrAvatarSaveOrCancel
        } = this.props;
        return (
            <section className={editAppearanceAnimationSaveSomeToClass.bind(this)()}>
                <Button
                    type="primary"
                    size="large"
                    className="keryi_barter_personal_save_some_button keryi_barter_personal_save_some_button_save"
                    onClick={uploadPersonalBgImageOrAvatarSaveOrCancel.bind(this)}
                >
                    保存
                </Button>
            </section>
        )
    }

    /**
     * render渲染keryi_barter个人信息页面主体部分
     * @returns {XML}
     */
    renderPersonalMain() {
        const {
            //render渲染个人信息页面主体用户名
            renderPersonalMainUserName,
            //render渲染个人信息页面主体信息部分
            renderPersonalMainInformation
        } = this;
        return (
            <main className="keryi_barter_personal_main">
                {/*render渲染个人信息页面主体用户名*/}
                {renderPersonalMainUserName.bind(this)()}
                {/*render渲染个人信息页面主体信息部分*/}
                {renderPersonalMainInformation.bind(this)()}
            </main>
        )
    }

    /**
     * render渲染keryi_barter个人信息页面主要内容
     * @returns {XML}
     */
    render() {
        const {
            //render渲染个人信息页面查看"以物换物"资源详情对话框
            renderPersonalModal,
            //render渲染个人信息页面头部
            renderPersonalHeader,
            //render渲染个人信息页面保存头像和背景部分
            renderPersonalSaveSome,
            //render渲染个人信息页面主体部分
            renderPersonalMain
        } = this;
        const {
            //用户是否可以对自己的头像和背景进行编辑的标识位
            editAppearance
        } = this.props;
        return (
            <div
                ref="mainPersonalBarter"
                className="keryi_barter_personal_main_container"
            >
                <section className="keryi_barter_personal_main_module">
                    {/*render渲染个人信息页面头部*/}
                    {renderPersonalHeader.bind(this)()}
                    {/*render渲染个人信息页面保存头像和背景部分*/}
                    {
                        editAppearance && renderPersonalSaveSome.bind(this)()
                    }
                    {/*render渲染个人信息页面主体部分*/}
                    {renderPersonalMain.bind(this)()}
                </section>
                {/*render渲染个人信息页面查看"以物换物"资源详情对话框*/}
                {renderPersonalModal.bind(this)()}
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        ...state.personalReducers
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        /**
         * 控制Modal组件对话框显示,获取个人信息页面资源详情
         * @params e
         */
        viewPersonalKeryiBarterHandler(keryiCard, e) {
            let id = keryiCard["id"];
            const {
                //用户登录的id
                userId,
                //个人信息资源详情资源交换列表状态切换标识
                exchangeStatus
            } = this.state;
            const {
                //个人页资源详情资源交换列表页码
                itemCurrent
            } = this.props;
            dispatch(getPersonalResourcesListViewDetails(id)).then(function resolve(body) {
                document.body.style["overflow"] = "hidden";
                this.setState({
                    hasCommentIcon: true
                });
                dispatch(rememberPersonalResourcesListViewDetails(body));
                dispatch(getPersonalUserHeadPortraitViewDetail(body));
                dispatch(getPersonalResourcesListViewDetailsAction(body));
            }.bind(this), function reject() {

            }.bind(this));
            dispatch(getPersonalResourcesListViewDetailsItemList(itemCurrent, userId, id))
                .then(function resolve(body) {
                    dispatch(getPersonalResourcesListViewDetailsItemListAction.bind(this)(body, false, exchangeStatus));
                    dispatch(rememberPersonalResourcesListViewDetailsItemListAction(body));
                    dispatch(openPersonalViewDetailsItemClose());
                    dispatch(openPersonalViewDetailsAside());
                    dispatch(openPersonalViewDetailsItemHover());
                    this.setState({
                        viewPersonalBarterVisible: true
                    });
                }.bind(this), function reject() {

                }.bind(this));
            //取消冒泡
            e && e.nativeEvent.stopImmediatePropagation();
        },
        /**
         * 点击个人信息页面匹配资源列表,更新个人信息页面资源详情
         */
        viewPersonalKeryiBarterModalHandler(keryiCard, e) {
            let id = keryiCard["id"],
                userId = keryiCard["userId"];
            const {
                //个人页资源详情资源交换列表页码
                itemCurrent
            } = this.props;
            const {
                userId: commentFrom
            } = this.state;
            this.setState({
                exchangeStatus: exchangeStatusConfig[0]["key"],
                exchangeStatusText: exchangeStatusConfig[0]["value"],
                isMatched: true,
                hasCommentIcon: false,
                iconCommentOrInformation: false,
                commentAppear: false
            }, function exchangerStatus() {
                const {
                    //个人信息资源详情资源交换列表状态切换标识
                    exchangeStatus
                } = this.state;
                //匹配资源评论列表页码设置为1
                const commentMatchedCurrent = 1;
                dispatch(getPersonalResourcesListViewDetailsItemList(itemCurrent, userId, id))
                    .then(function resolve(body) {
                        dispatch(getPersonalResourcesListViewDetailsItemListAction(body, true, exchangeStatus));
                        dispatch(rememberPersonalResourcesListViewDetailsMatchedItemListAction(body));
                    }, function reject() {

                    });
                dispatch(getPersonalResourcesListViewDetailsCommentList(id, commentFrom, userId, commentMatchedCurrent))
                    .then(function resolve(getComment) {
                        dispatch(getPersonalResourcesListViewDetailsCommentListAction({
                            commentMatchedList: getComment["list"],
                            commentMatchedTotal: getComment["commentTotal"],
                            commentMatched: "",
                            commentMatchedCurrent
                        }));
                    }, function reject() {

                    });
                //FIXME 这里设置一个时间控制器,在设置"以物换物"评论区域执行由显示到隐藏的动画之后，延迟200ms设置"以物换物"评论区域由隐藏到消失
                setTimeout(function timer() {
                    this.setState({
                        commentBlock: false
                    });
                }.bind(this), 200);
            }.bind(this));
            dispatch(getPersonalUserHeadPortraitViewDetail(keryiCard));
            dispatch(getPersonalResourcesMatchedListViewDetailsAction(keryiCard));
            dispatch(openPersonalViewDetailsFooter());
            dispatch(closePersonalViewDetailsItemClose());
            dispatch(closePersonalViewDetailsAside());
            //取消冒泡
            e.nativeEvent.stopImmediatePropagation();
        },
        /**
         * 点击个人信息页面资源详情返回"我的资源",更新个人信息页面资源详情
         */
        onBackHandler(e) {
            const {
                //个人页资源详情对象
                viewDetailKeryiCard,
                //个人页资源详情资源交换列表
                viewDetailItemExchange
            } = this.props;
            this.setState({
                exchangeStatus: exchangeStatusConfig[0]["key"],
                exchangeStatusText: exchangeStatusConfig[0]["value"],
                isMatched: false,
                hasCommentIcon: true
            }, function exchangerStatus() {
                const {
                    //个人信息资源详情资源交换列表状态切换标识
                    exchangeStatus
                } = this.state;
                dispatch(getPersonalResourcesListViewDetailsItemListAction(viewDetailItemExchange, false, exchangeStatus));
            }.bind(this));
            dispatch(getPersonalUserHeadPortraitViewDetail(viewDetailKeryiCard));
            dispatch(getPersonalResourcesListViewDetailsAction(viewDetailKeryiCard));
            dispatch(closePersonalViewDetailsFooter());
            dispatch(openPersonalViewDetailsItemClose());
            dispatch(openPersonalViewDetailsAside());
            //取消冒泡
            e.nativeEvent.stopImmediatePropagation();
        },
        /**
         * 点击个人信息页面资源详情返回"资源交换",发起与其他用户的资源交换请求
         */
        onOkHandler() {
            const {
                //个人页资源详情对象
                viewDetailKeryiCard,
                //确认进行资源交换的匹配资源的用户id
                matchedUserId,
                //确认进行资源交换的匹配资源id
                matchedId,
                //个人页资源详情资源交换列表页码
                itemCurrent
            } = this.props;
            const {
                //用户登录的id
                userId
            } = this.state;
            let id = viewDetailKeryiCard["id"];
            this.setState({
                exchangeStatus: exchangeStatusConfig[0]["key"],
                exchangeStatusText: exchangeStatusConfig[0]["value"],
                isMatched: false
            }, function exchangerStatus() {
                const {
                    //个人信息资源详情资源交换列表状态切换标识
                    exchangeStatus
                } = this.state;
                dispatch(havePersonalResourcesExchange({
                    initiativeResourceId: id,
                    passiveResourceId: matchedId,
                    initiativeUserId: userId,
                    passiveUserId: matchedUserId,
                    itemCurrent
                })).then(function resolve() {
                    dispatch(closePersonalViewDetailsFooter());
                    dispatch(getPersonalResourcesListViewDetails(id)).then(function resolve(body) {
                        dispatch(getPersonalResourcesListAction(body));
                    }, function reject() {

                    });
                    dispatch(getPersonalResourcesListViewDetailsItemList(itemCurrent, userId, id))
                        .then(function resolve(body) {
                            dispatch(getPersonalResourcesListViewDetailsItemListAction.bind(this)(body, false, exchangeStatus));
                            dispatch(rememberPersonalResourcesListViewDetailsItemListAction(body));
                        }, function reject() {

                        });
                    dispatch(openPersonalViewDetailsItemClose());
                    dispatch(openPersonalViewDetailsAside());
                }, function reject() {

                });
            }.bind(this));
        },
        /**
         * 控制Modal组件对话框隐藏并消失
         */
        closePersonalBarterVisibleHandler() {
            this.setState({
                viewPersonalBarterVisible: false
            }, () => {
                document.body.style["overflow"] = "auto";
                //FIXME 这里设置一个时间控制器,控制在Modal组件对话框隐藏动画并且消失之后再执行清除个人页面资源详情的数据
                setTimeout(() => {
                    dispatch(closePersonalViewDetailsAside());
                    dispatch(closePersonalViewDetailsFooter());
                    dispatch(closePersonalViewDetailsItemClose());
                    dispatch(closePersonalViewDetailsItemHover());
                    dispatch(resetPersonalResourcesListViewDetailsContentAction());
                }, 1000);
            });
        },
        /**
         * dispatch获取个人页资源数据列表
         */
        dispatchPersonalResourceList() {
            const {
                //个人页资源数据列表页码
                current,
                //改变个人资源分页页码
                changePersonalResourcesListPaginationCurrentHandler
            } = this.props;
            const {
                //用户登录的id
                userId
            } = this.state;
            return new Promise(function promise(resolve, reject) {
                //获取个人页资源列表
                dispatch(getPersonalResourcesList(current, userId))
                    .then(function resolve(body) {
                        dispatch(getPersonalResourcesListAction(body));
                    }.bind(this), function reject() {
                        changePersonalResourcesListPaginationCurrentHandler.bind(this)(paginationMinus);
                    }.bind(this));
                resolve();
            }.bind(this));
        },
        /**
         * dispatch获取个人信息
         */
        dispatchPersonalInformation() {
            const {
                //用户登录的id
                userId
            } = this.state;
            //获取个人信息
            dispatch(getPersonalInformation(userId)).then(function resolve(body) {
                //更新并保存个人信息
                dispatch(saveChangePersonalInformation({
                    username: body["username"],
                    email: body["email"],
                    phone: body["phone"],
                    motto: body["motto"]
                }));
            }, function reject() {

            });
        },
        /**
         * 点击编辑图标,使个人信息页面主体信息可编辑
         */
        changePersonalInformationHandler() {
            //改变个人信息编辑状态,使得其可编辑
            dispatch(changePersonalInformation());
        },
        /**
         * 点击保存按钮,更新个人信息页面主体信息
         */
        saveChangePersonalInformationHandler() {
            const {
                //个人页资源数据列表页码
                current
            } = this.props;
            const {
                //用户登录的id
                userId,
                //用户登录的用户名
                username,
                //用户登录的手机号
                phone,
                //用户登录的邮箱
                email,
                //用户登录的个性签名
                motto
            } = this.state;
            //更新、保存个人信息,并改变个人信息编辑状态,使得其不可编辑
            dispatch(saveUpdatePersonalInformation(userId, username, email, phone, motto))
                .then(function resolve() {
                    //控制Modal组件对话框隐藏并消失
                    this.setState({
                        viewPersonalBarterVisible: false
                    });
                    //更新并保存个人信息
                    dispatch(saveChangePersonalInformation({
                        username,
                        email,
                        phone,
                        motto
                    }));
                    //改变个人信息编辑状态,使得其不可编辑
                    dispatch(closeChangePersonalInformation());
                    //获取个人页资源列表
                    dispatch(getPersonalResourcesList.bind(this)(current, userId))
                        .then(function resolve(body) {
                            dispatch(getPersonalResourcesListAction(body));
                        }, function reject() {

                        });
                }.bind(this), function reject() {

                }.bind(this));
        },
        /**
         * 点击取消按钮,使个人信息页面主体信息不可编辑
         */
        closeChangePersonalInformationHandler() {
            //改变个人信息编辑状态,使得其不可编辑
            dispatch(closeChangePersonalInformation());
        },
        /**
         *点击编辑外观按钮,使客户的头像和背景可编辑
         */
        changePersonalEditAppearance() {
            //改变头像和背景编辑状态,使客户的头像和背景可编辑
            dispatch(changePersonalEditAppearanceAction());
            //FIXME 这里设置一个时间控制器,在使客户的头像和背景可编辑100ms之后,再实现编辑的动画渲染
            setTimeout(function timer() {
                this.setState({
                    editAppearanceAnimation: true
                });
            }.bind(this), 100);
        },
        /**
         * 监听窗口滚动事件,使个人信息页面主体信息随着窗口滚动而滚动
         */
        personalInformationScrollHandler() {
            const {absoluteTop} = this.state;
            //获取到滚动条距离顶部的高度
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            //个人信息部分标题高度
            let titleHeight = this.refs["mainInformationTitle"] && this.refs["mainInformationTitle"].clientHeight;
            //个人信息部分内容用户名部分高度
            let contentHeight = this.refs["mainInformationContent"] && this.refs["mainInformationContent"].clientHeight;
            //获取到个人信息容器上外边距
            let marginTop = this.refs["mainInformation"] && (window.getComputedStyle(this.refs["mainInformation"]) ? window.getComputedStyle(this.refs["mainInformation"]).marginTop : this.refs["mainInformation"].currentStyle.marginTop);
            //个人信息部分标题和内容用户名部分总高度
            let totalHeight = this.refs["mainInformation"] && (titleHeight + contentHeight + parseInt(marginTop.slice(0, -2)));
            //改变个人信息部分距离父级元素顶部的高度,使个人信息页面主体信息随着窗口滚动而滚动
            this.refs["mainInformation"] && (scrollTop >= (absoluteTop - totalHeight) ? dispatch(changePersonalInformationScrollTop(scrollTop - absoluteTop + totalHeight)) : dispatch(changePersonalInformationScrollTop(0)));
        },
        /**
         * 重置个人页资源页面
         */
        resetPersonalResourceListViewDetailsHandler() {
            //重置个人页资源页面Action
            dispatch(resetPersonalResourcesListViewDetailsAction());
        },
        /**
         * 改变个人信息资源详情资源交换列表状态
         * @param key
         * @param value
         */
        changeExchangeStatus(key, value) {
            const {
                //判断个人信息资源详情是否是匹配资源
                isMatched
            } = this.state;
            const {
                //个人页资源详情资源交换列表
                viewDetailItemExchange,
                //个人页资源详情匹配资源交换列表
                viewDetailMatchedItemExchange
            } = this.props;
            this.setState({
                exchangeStatus: key,
                exchangeStatusText: value
            }, function exchangerStatus() {
                const {
                    //个人信息资源详情资源交换列表状态切换标识
                    exchangeStatus
                } = this.state;
                !isMatched ? dispatch(getPersonalResourcesListViewDetailsItemListAction.bind(this)(viewDetailItemExchange, isMatched, exchangeStatus)) : dispatch(getPersonalResourcesListViewDetailsItemListAction.bind(this)(viewDetailMatchedItemExchange, isMatched, exchangeStatus));
            }.bind(this));
        },
        /**
         * 改变个人信息资源详情资源交换列表元素个数
         * @param exchangeId
         */
        onChangeExchangeItemListHandler(exchangeId) {
            const {
                //用户登录的id
                userId,
                //个人信息资源详情资源交换列表状态切换标识
                exchangeStatus
            } = this.state;
            const {
                //个人页资源详情对象
                viewDetailKeryiCard,
                //个人页资源详情资源交换列表页码
                itemCurrent
            } = this.props;
            dispatch(deletePersonalResourcesExchange(exchangeId, userId, viewDetailKeryiCard["id"], itemCurrent))
                .then(function resolve() {
                    dispatch(getPersonalResourcesListViewDetailsItemList.bind(this)(itemCurrent, userId, viewDetailKeryiCard["id"]))
                        .then(function resolve(body) {
                            dispatch(getPersonalResourcesListViewDetailsItemListAction.bind(this)(body, false, exchangeStatus));
                            dispatch(rememberPersonalResourcesListViewDetailsItemListAction(body));
                        }, function reject() {

                        });
                }, function reject() {

                });
        },
        /**
         * 改变个人信息资源详情资源交换列表更换交换关系状态
         * @param exchangeId
         * @param exchangeToStatus
         */
        onSelectExchangeItemListHandler(exchangeId, exchangeToStatus) {
            const {
                //用户登录的id
                userId
            } = this.state;
            const {
                //个人页资源详情对象
                viewDetailKeryiCard,
                //个人页资源详情资源交换列表页码
                itemCurrent
            } = this.props;
            this.setState({
                exchangeStatus: exchangeToStatus,
                exchangeStatusText: exchangeStatusSelectConfig[exchangeToStatus],
                isMatched: false
            }, function exchangerStatus() {
                dispatch(selectPersonalResourceExchange(exchangeId, exchangeToStatus, userId, viewDetailKeryiCard["id"], itemCurrent))
                    .then(function resolve() {
                        dispatch(getPersonalResourcesListViewDetailsItemList(itemCurrent, userId, viewDetailKeryiCard["id"]))
                            .then(function resolve(body) {
                                dispatch(getPersonalResourcesListViewDetailsItemListAction.bind(this)(body, false, exchangeToStatus));
                                dispatch(rememberPersonalResourcesListViewDetailsItemListAction(body));
                            }, function reject() {

                            });
                    }, function reject() {

                    });
            });
        },
        /**
         * 修改个人页头像成功
         * @param data
         */
        uploadPersonalAvatar(data) {
            //先将个人页头像置空,引起HeadPortrait组件状态变化,再替换成最新上传的个人头像
            dispatch(uploadPersonalAvatarAction(""));
            dispatch(uploadPersonalAvatarAction(data));
        },
        /**
         * 点击修改个人页背景或者头像部分的保存或者取消,改变编辑标识位
         */
        uploadPersonalBgImageOrAvatarSaveOrCancel() {
            this.setState({
                editAppearanceAnimation: false
            });
            //FIXME 这里设置一个时间控制器,在使客户的头像和背景动画渲染隐藏300ms之后,再实现不可编辑
            setTimeout(function timer() {
                //改变头像和背景编辑状态,使客户的头像和背景不可编辑
                dispatch(closePersonalEditAppearanceAction());
            }.bind(this), 300);
        },
        /**
         * 改变"评论"富文本编辑器编辑框内容
         * @param e
         */
        changeCommentHandler(e) {
            let value = e.target.value;
            dispatch(changePersonalResourcesListViewDetailsCommentAction(value));
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
                viewDetailId
            } = this.props;
            const {
                //用户登录的id
                userId
            } = this.state;
            //评论列表页码设置为1
            const commentCurrent = 1;
            dispatch(doPersonalResourcesListViewDetailsComment(viewDetailId, userId, userId, comment))
                .then(function resolve() {
                    return dispatch(getPersonalResourcesListViewDetailsCommentList(viewDetailId, userId, userId, commentCurrent));
                })
                .then(function resolve(getComment) {
                    dispatch(getPersonalResourcesListViewDetailsCommentListAction({
                        commentList: getComment["list"],
                        commentTotal: getComment["commentTotal"],
                        comment: "",
                        commentCurrent
                    }));
                });
        },
        /**
         * 获取个人页资源详情评论列表脚手架
         * @param resourceId
         * @param commentFrom
         * @param commentTo
         * @param pageNum
         */
        getPersonalResourcesListViewDetailsCommentListHandler(resourceId, commentFrom, commentTo, pageNum) {
            dispatch(getPersonalResourcesListViewDetailsCommentList(resourceId, commentFrom, commentTo, pageNum))
                .then(function resolve(getComment) {
                    dispatch(getPersonalResourcesListViewDetailsCommentListAction({
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
                viewDetailId
            } = this.props;
            const {
                //用户登录的id
                userId
            } = this.state;
            dispatch(getPersonalResourcesListViewDetailsCommentList(viewDetailId, userId, userId, page))
                .then(function resolve(getComment) {
                    dispatch(getPersonalResourcesListViewDetailsCommentListAction({
                        commentList: getComment["list"],
                        commentTotal: getComment["commentTotal"],
                        comment: "",
                        commentCurrent: page
                    }));
                });
        },
        /**
         * 保存滚动条初始距离顶部高度脚手架
         */
        saveBeforeOsTopHandler(beforeOsTop) {
            dispatch(getPersonalResourcesListPaginationBeforeOsTopAction(beforeOsTop));
        },
        /**
         * 改变个人资源分页页码
         */
        changePersonalResourcesListPaginationCurrentHandler(pagination) {
            dispatch(changePersonalResourcesListPaginationCurrentAction(pagination));
        },
        /**
         * 分页获取资源数据列表脚手架
         */
        getPersonalResourceListByPaginationHandler(docTop) {
            return new Promise(function promise(resolve, reject) {
                const {
                    //滚动条初始距离顶部高度
                    beforeOsTop,
                    //分页防并发变量
                    currentAsync,
                    //保存滚动条初始距离顶部高度脚手架
                    saveBeforeOsTopHandler,
                    //改变个人资源分页页码
                    changePersonalResourcesListPaginationCurrentHandler
                } = this.props;
                //获取个人信息页面主容器
                let mainPersonalBarter = this.refs["mainPersonalBarter"],
                    //获取个人信息页面主容器高度
                    mainPersonalBarterHeight = mainPersonalBarter.clientHeight,
                    //个人信息页面高度
                    docHeight = docTop + mainPersonalBarterHeight,
                    //获取到滚动条距离顶部的高度
                    afterOsTop = document.documentElement.scrollTop || document.body.scrollTop,
                    //获取屏幕的高度
                    screenHeight = window.innerHeight,
                    //获取到滚动条距离底部的高度
                    betweenOsTop = afterOsTop - beforeOsTop;
                saveBeforeOsTopHandler.bind(this)(afterOsTop);
                if (((docHeight - afterOsTop - screenHeight) / docHeight <= 0.05) && currentAsync && betweenOsTop > 0) {
                    changePersonalResourcesListPaginationCurrentHandler.bind(this)(paginationPlus);
                    resolve();
                }
            }.bind(this));
        },
        /**
         * 改变匹配资源"评论"富文本编辑器编辑框内容
         * @param e
         */
        changeMatchedCommentHandler(e) {
            let value = e.target.value;
            dispatch(changePersonalMatchedResourcesListViewDetailsCommentAction(value));
        },
        /**
         * 匹配资源"评论"富文本编辑器编辑框添加评论
         * @param e
         */
        doMatchedCommentHandler(e) {
            const {
                //确认进行资源交换的匹配资源的用户id
                matchedUserId: userId,
                //确认进行资源交换的匹配资源id
                matchedId: id,
                //匹配资源评论详情
                commentMatched
            } = this.props;
            const {
                //用户登录的id
                userId: commentFrom
            } = this.state;
            //匹配资源评论列表页码设置为1
            const commentMatchedCurrent = 1;
            dispatch(doPersonalResourcesListViewDetailsComment(id, commentFrom, userId, commentMatched))
                .then(function resolve() {
                    dispatch(getPersonalResourcesListViewDetailsCommentList(id, commentFrom, userId, commentMatchedCurrent))
                        .then(function resolve(getComment) {
                            dispatch(getPersonalResourcesListViewDetailsCommentListAction({
                                commentMatchedList: getComment["list"],
                                commentMatchedTotal: getComment["commentTotal"],
                                commentMatched: "",
                                commentMatchedCurrent
                            }));
                        }, function reject() {

                        });
                }, function reject() {

                });
        },
        /**
         * 点击匹配资源"评论"系统分页方法
         * @param page
         * @param pageSize
         */
        loadMatchedPageMore(page, pageSize) {
            const {
                //确认进行资源交换的匹配资源的用户id
                matchedUserId: userId,
                //确认进行资源交换的匹配资源id
                matchedId: id
            } = this.props;
            const {
                //用户登录的id
                userId: commentFrom
            } = this.state;
            dispatch(getPersonalResourcesListViewDetailsCommentList(id, commentFrom, userId, page))
                .then(function resolve(getComment) {
                    dispatch(getPersonalResourcesListViewDetailsCommentListAction({
                        commentMatchedList: getComment["list"],
                        commentMatchedTotal: getComment["commentTotal"],
                        commentMatched: "",
                        commentMatchedCurrent: page
                    }));
                }, function reject() {

                });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonalView);