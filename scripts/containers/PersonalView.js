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
    KeryiCard,
    Modal,
    Tag
} from "../keryi";
//个人信息页面,根据不同的组件类型配置来设置组件
import personalComponentConfig from "../configs/personalComponentConfig";
//资源统计静态Mode配置
import viewDetailsStatisticsConfig from "../configs/viewDetailsStatisticsConfig";
//获取资源数据列表出现异常时,前端呈现默认约定数据
import keryiCardDefaultConfig from "../configs/keryiCardDefaultConfig";
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
    //获取个人页资源详情Action
    getPersonalResourcesListViewDetailsAction,
    //获取个人页资源详情用户头像Action
    getPersonalUserHeadPortraitViewDetail,
    //改变个人信息部分距离父级元素顶部的高度,使个人信息页面主体信息随着窗口滚动而滚动
    changePersonalInformationScrollTop,
    //重置个人页资源详情Action
    resetPersonalResourceListViewDetailsAction
} from "../actions/personalActions";
import "../../stylesheets/personal.css";

//个人信息可编辑组件类型
const componentType = ["input"];

class PersonalView extends React.Component {
    static propTypes = {
        //用户登录的id
        userId: PropTypes.number,
        //用户登录的用户名
        username: PropTypes.string,
        //用户登录的手机号
        phone: PropTypes.string,
        //用户登录的邮箱
        email: PropTypes.string,
        //用户登录的头像
        avatar: PropTypes.string,
        //用户登录的个性签名
        motto: PropTypes.string,
        //获取个人页资源数据列表
        list: PropTypes.array,
        //个人页资源数据列表页码
        current: PropTypes.number,
        //个人信息部分距离父级元素顶部的高度
        top: PropTypes.number,
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
        //判断个人信息是否可编辑
        personalInformationDisabled: PropTypes.bool
    };

    constructor(props) {
        super(props);
        this.state = {
            //获取到个人信息容器距离顶部的绝对位置
            absoluteTop: 0,
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
        return (
            <section className="keryi_barter_personal_head_update_surface">
                <Button
                    size="default"
                    type="info"
                    className="keryi_barter_personal_head_update_surface_button"
                >
                    编辑外观
                </Button>
            </section>
        )
    }

    /**
     * render渲染keryi_barter个人信息页面头部背景和头像
     * @returns {XML}
     */
    renderPersonalHeaderBackgroundAndPortrait() {
        const {
            //用户登录的头像
            avatar
        } = this.state;
        return (
            <figure
                className="keryi_barter_personal_head_portrait"
            >
                <HeadPortrait
                    headPortrait={avatar ? avatar : "/images/keryiBarter_v.png"}
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
            //控制Modal组件对话框显示
            viewPersonalKeryiBarterHandler
        } = this.props;
        tagOrTargetTagListHandlerAddType.bind(this)(keryiCard["tags"], "primary");
        tagOrTargetTagListHandlerAddType.bind(this)(keryiCard["targetTags"], "info");
        return (
            <KeryiCard
                key={key}
                userName={keryiCard["user"]["username"]}
                title={keryiCard["title"]}
                imageList={eval("(" + keryiCard["imgUrls"] + ")")}
                introduce={keryiCard["intro"]}
                tagList={keryiCard["tags"]}
                targetTagList={keryiCard["targetTags"]}
                priceWorth={keryiCard["priceWorth"]}
                like={keryiCard["likeCount"]}
                control={["exchange"]}
                viewDetails="iconfontKeryiBarter keryiBarter-moreInformation"
                onViewDetails={viewPersonalKeryiBarterHandler.bind(this, keryiCard)}
            />
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
                <ul className="keryi_barter_personal_view_details_statistics_uiList">
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
            renderModalTargetTag
        } = this;
        const {
            //控制Modal组件对话框显示、隐藏或者消失
            viewPersonalBarterVisible
        } = this.state;
        const {
            //控制Modal组件对话框隐藏并消失
            closePersonalBarterVisibleHandler
        } = this.props;
        return (
            <Modal
                visible={viewPersonalBarterVisible}
                width={660}
                closable
                className="keryi_barter_personal_modal_view_details_container"
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
                        (list && list.length > 0) ? list.map(function lister(listItem, listIndex) {
                            //render渲染个人信息页面资源信息
                            return renderPersonalInformationCard.bind(this)(listItem, listIndex);
                        }.bind(this)) : renderPersonalInformationCard.bind(this)(keryiCardDefaultConfig, "default")
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
            //render渲染个人信息页面主体部分
            renderPersonalMain
        } = this;
        return (
            <div className="keryi_barter_personal_main_container">
                <section className="keryi_barter_personal_main_module">
                    {/*render渲染个人信息页面头部*/}
                    {renderPersonalHeader.bind(this)()}
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
         * 控制Modal组件对话框显示
         * @params e
         */
        viewPersonalKeryiBarterHandler(keryiCard, e) {
            this.setState({
                viewPersonalBarterVisible: true
            });
            dispatch(getPersonalUserHeadPortraitViewDetail(keryiCard));
            dispatch(getPersonalResourcesListViewDetailsAction(keryiCard));
            //取消冒泡
            e.nativeEvent.stopImmediatePropagation();
        },
        /**
         * 控制Modal组件对话框隐藏并消失
         */
        closePersonalBarterVisibleHandler() {
            this.setState({
                viewPersonalBarterVisible: false
            });
        },
        /**
         * dispatch获取个人页资源数据列表
         */
        dispatchPersonalResourceList() {
            const {
                //个人页资源数据列表页码
                current,
                //用户登录的id
                userId
            } = this.props;
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
            } = this.props;
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
         * 监听窗口滚动事件,使个人信息页面主体信息随着窗口滚动而滚动
         */
        personalInformationScrollHandler() {
            const {absoluteTop} = this.state;
            //获取到滚动条距离顶部的高度
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            //个人信息部分标题高度
            let titleHeight = this.refs["mainInformationTitle"].clientHeight;
            //个人信息部分内容用户名部分高度
            let contentHeight = this.refs["mainInformationContent"].clientHeight;
            //获取到个人信息容器上外边距
            let marginTop = window.getComputedStyle(this.refs["mainInformation"]) ? window.getComputedStyle(this.refs["mainInformation"]).marginTop : this.refs["mainInformation"].currentStyle.marginTop;
            //个人信息部分标题和内容用户名部分总高度
            let totalHeight = titleHeight + contentHeight + parseInt(marginTop.slice(0, -2));
            //改变个人信息部分距离父级元素顶部的高度,使个人信息页面主体信息随着窗口滚动而滚动
            scrollTop >= (absoluteTop - totalHeight) ? dispatch(changePersonalInformationScrollTop(scrollTop - absoluteTop + totalHeight)) : dispatch(changePersonalInformationScrollTop(0));
        },
        /**
         * 重置个人页资源详情
         */
        resetPersonalResourceListViewDetailsHandler() {
            //重置个人页资源详情Action
            dispatch(resetPersonalResourceListViewDetailsAction());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonalView);