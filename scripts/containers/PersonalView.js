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
import "../../stylesheets/personal.css";

class PersonalView extends React.Component {
    static propTypes = {};

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
            avatar: ""
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
    renderMainUserName() {
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
     * render渲染keryi_barter个人信息页面主体部分
     * @returns {XML}
     */
    renderPersonalMain() {
        const {
            renderMainUserName
        } = this;
        return (
            <main className="keryi_barter_personal_main">
                {renderMainUserName.bind(this)()}
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
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonalView);