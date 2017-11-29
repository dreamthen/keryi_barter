/**
 * author yinwk
 * createTime 2017/8/16 14:41
 * description clown laugh at you~
 */
import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {
    Button,
    FigureCarousel,
    HeadPortrait,
    Input,
    ItemCarousel,
    KeryiCard,
    Modal,
    Tag
} from "../keryi";
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
    //获取个人页资源详情
    getPersonalResourcesListViewDetails,
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
    uploadPersonalAvatarAction
} from "../actions/personalActions";
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
        //用户登录的个性签名
        motto: PropTypes.string,
        //获取个人页资源数据列表
        list: PropTypes.array,
        //个人页资源数据列表页码
        current: PropTypes.number,
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
            viewPersonalBarterVisible: false
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
            //dispatch获取资源数据列表
            dispatchPersonalResourceList,
            //dispatch获取个人信息
            dispatchPersonalInformation
        } = this.props;
        //获取到滚动条距离顶部的高度
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        //个人信息容器距离顶部的高度
        let mainInformationTop = this.refs["mainInformation"].getBoundingClientRect().top;
        //获取到个人信息容器距离顶部的绝对位置
        let absoluteTop = scrollTop + mainInformationTop;
        //滚动事件监听函数
        const {dispatchScrollEventListener} = this;
        this.setState({
            absoluteTop
        }, function absoluteToper() {
            dispatchPersonalResourceList.bind(this)();
            dispatchPersonalInformation.bind(this)();
            dispatchScrollEventListener.bind(this)();
        }.bind(this));
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
     * 滚动事件监听函数
     */
    dispatchScrollEventListener() {
        //监听窗口滚动事件,使个人信息页面主体信息随着窗口滚动而滚动
        const {personalInformationScrollHandler} = this.props;
        window.addEventListener("scroll", personalInformationScrollHandler.bind(this));
    }

    /**
     * 消除滚动事件监听函数
     */
    dispatchCloseScrollEventListener() {
        //监听窗口滚动事件,使个人信息页面主体信息随着窗口滚动而滚动
        const {personalInformationScrollHandler} = this.props;
        window.removeEventListener("scroll", personalInformationScrollHandler.bind(this));
    }

    /**
     * 将redux props转化为state
     * @param props
     */
    mapPropsToState(props = this.props) {
        this.setState({
            ...props
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
                    headPortrait={avatar ? api.GET_PERSONAL_AVATAR + "/" + userId + "/avatar" : "/images/keryiBarter_v.png"}
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
     * render渲染keryi_barter个人信息页面查看"以物换物"资源详情对话框主体介绍
     * @returns {XML}
     */
    renderModalIntroduce() {
        const {
            //个人页资源详情资源介绍
            viewDetailIntroduce
        } = this.props;
        return (
            <section className="keryi_barter_personal_view_details_introduce">
                <p className="keryi_barter_personal_view_details_introduce_content">
                    {viewDetailIntroduce}
                </p>
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
     * render渲染keryi_barter个人信息页面查看"以物换物"资源详情对话框
     * @returns {XML}
     */
    renderPersonalModal() {
        const {
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
            //render渲染keryi_barter个人信息页面查看"以物换物"资源详情对话框已交换的资源
            renderModalItemCarousel
        } = this;
        const {
            //控制Modal组件对话框显示、隐藏或者消失
            viewPersonalBarterVisible
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
                okText="资源交换"
                closeText="关闭"
                className="keryi_barter_personal_modal_view_details_container"
                onAsideSelect={viewPersonalKeryiBarterModalHandler.bind(this)}
                onBack={onBackHandler.bind(this)}
                onOk={onOkHandler.bind(this)}
                onClose={closePersonalBarterVisibleHandler.bind(this)}
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
                {/*keryi_barter个人信息页面查看"以物换物"资源详情对话框已交换的资源*/}
                {renderModalItemCarousel.bind(this)()}
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
                <main className="keryi_barter_personal_main_information keryi_barter_personal_main_barterList">
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
            <div className="keryi_barter_personal_main_container">
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
            dispatch(getPersonalResourcesListViewDetails.bind(this)(id));
            dispatch(getPersonalResourcesListViewDetailsItemList.bind(this)(itemCurrent, userId, id, true, false, exchangeStatus));
            dispatch(openPersonalViewDetailsItemClose());
            dispatch(openPersonalViewDetailsAside());
            dispatch(openPersonalViewDetailsItemHover());
            this.setState({
                viewPersonalBarterVisible: true
            });
            //取消冒泡
            e.nativeEvent.stopImmediatePropagation();
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
            this.setState({
                exchangeStatus: exchangeStatusConfig[0]["key"],
                exchangeStatusText: exchangeStatusConfig[0]["value"],
                isMatched: true
            }, function exchangerStatus() {
                const {
                    //个人信息资源详情资源交换列表状态切换标识
                    exchangeStatus
                } = this.state;
                dispatch(getPersonalResourcesListViewDetailsItemList.bind(this)(itemCurrent, userId, id, false, true, exchangeStatus));
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
                isMatched: false
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
                dispatch(havePersonalResourcesExchange.bind(this)({
                    initiativeResourceId: id,
                    passiveResourceId: matchedId,
                    initiativeUserId: userId,
                    passiveUserId: matchedUserId,
                    itemCurrent,
                    exchangeStatus
                }));
            }.bind(this));
        },
        /**
         * 控制Modal组件对话框隐藏并消失
         */
        closePersonalBarterVisibleHandler() {
            this.setState({
                viewPersonalBarterVisible: false
            }, () => {
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
                current
            } = this.props;
            const {
                //用户登录的id
                userId
            } = this.state;
            //获取个人页资源列表
            dispatch(getPersonalResourcesList.bind(this)(current, userId));
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
            dispatch(getPersonalInformation(userId));
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
            dispatch(saveUpdatePersonalInformation.bind(this)(userId, username, email, phone, motto, current));
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
            dispatch(deletePersonalResourcesExchange.bind(this)(exchangeId, userId, viewDetailKeryiCard["id"], itemCurrent, exchangeStatus));
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
                dispatch(selectPersonalResourceExchange.bind(this)(exchangeId, exchangeToStatus, userId, viewDetailKeryiCard["id"], itemCurrent));
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
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonalView);