/**
 * author yinwk
 * createTime 2017/8/16 14:41
 * description clown laugh at you~
 */
import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {
    Button,
    HeadPortrait,
    Input
} from "../keryi";
//个人信息页面,根据不同的组件类型配置来设置组件
import personalComponentConfig from "../configs/personalComponentConfig";
import {
    //改变个人信息编辑状态,使得其可编辑
    changePersonalInformation,
    //改变个人信息编辑状态,使得其不可编辑
    closeChangePersonalInformation
} from "../actions/personalActions";
import "../../stylesheets/personal.css";

//个人信息可编辑组件类型
const componentType = ["input"];

class PersonalView extends React.Component {
    static propTypes = {
        //判断个人信息是否可编辑
        personalInformationDisabled: PropTypes.bool
    };

    constructor(props) {
        super(props);
        this.state = {    //用户登录的id
            userId: 0,
            //用户登录的用户名
            username: "",
            //用户登录的手机号
            phone: "",
            //用户登录的邮箱
            email: "",
            //用户登录的头像
            avatar: "",
            //判断个人信息编辑动画是否可渲染
            personalInformationAnimationDisabled: false
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
        const {
            //判断个人信息是否可编辑
            personalInformationDisabled
        } = this.props;
        if (personalInformationDisabled !== nextProps.personalInformationDisabled) {
            setTimeout(function timer() {
                this.setState({
                    personalInformationAnimationDisabled: nextProps.personalInformationDisabled
                });
            }.bind(this), 100);
        }
    }

    /**
     * 组件结束装载
     */
    componentDidMount() {

    }

    /**
     * 将redux props转化为state
     */
    mapPropsToState() {
        const {props} = this;
        let userLoginInformation;
        if (localStorage) {
            userLoginInformation = JSON.parse(localStorage.getItem("userLoginInformation"));
        } else {
            return false;
        }
        this.setState({
            ...props,
            userId: userLoginInformation["id"],
            username: userLoginInformation["username"],
            phone: userLoginInformation["phone"],
            email: userLoginInformation["email"],
            avatar: userLoginInformation["avatar"]
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
        } = this.state;
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
     * render渲染keryi_barter个人信息页面主体用户名
     * @returns {XML}
     */
    renderPersonalMainUserName() {
        const {
            //用户登录的用户名
            username
        } = this.state;
        return (
            <section className="keryi_barter_personal_main_username">
                <h1 className="keryi_barter_personal_main_username_title">
                    {username}
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
        return personalComponentConfig.map(function personaler(personalItem, personIndex) {
            return (
                <section
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
            closeChangePersonalInformationHandler
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
            //render渲染个人信息页面主体信息主要内容部分
            renderPersonalMainInformationArea,
            //render渲染个人信息页面主体信息编辑图标
            renderPersonalMainInformationUpdate,
            //render渲染个人信息页面主体信息底部按钮
            renderPersonalMainInformationFooter
        } = this;
        const {
            //判断个人信息是否可编辑
            personalInformationDisabled
        } = this.props;
        return (
            <section className="keryi_barter_personal_main_information_container">
                <main className="keryi_barter_personal_main_information keryi_barter_personal_main_barterList">

                </main>
                <aside
                    className="keryi_barter_personal_main_information keryi_barter_personal_main_personalInformation">
                    <h2 className="keryi_barter_personal_main_information_title">
                        个人信息
                    </h2>
                    {/*render渲染个人信息页面主体信息主要内容部分*/}
                    {renderPersonalMainInformationArea.bind(this)()}
                    {/*render渲染个人信息页面主体信息编辑图标*/}
                    {!personalInformationDisabled && renderPersonalMainInformationUpdate.bind(this)()}
                    {/*render渲染个人信息页面主体信息底部按钮*/}
                    {personalInformationDisabled && renderPersonalMainInformationFooter.bind(this)()}
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
        //点击编辑图标,使个人信息页面主体信息可编辑
        changePersonalInformationHandler() {
            //改变个人信息编辑状态,使得其可编辑
            dispatch(changePersonalInformation());
        },
        //点击取消按钮,使个人信息页面主体信息不可编辑
        closeChangePersonalInformationHandler() {
            //改变个人信息编辑状态,使得其不可编辑
            dispatch(closeChangePersonalInformation());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonalView);