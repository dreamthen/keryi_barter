/**
 * author yinwk
 * createTime 2017/8/16 14:41
 * description clown laugh at you~
 */
import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {
    HeadPortrait
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
            <div className="keryi_barter_personal_shadow">

            </div>
        )
    }

    /**
     * render渲染keryi_barter个人信息页面背景和头像
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
            //render渲染个人信息页面背景和头像
            renderPersonalHeaderBackgroundAndPortrait
        } = this;
        const {
            //用户登录的用户名
            username
        } = this.state;
        return (
            <header
                className="keryi_barter_personal_head"
                style={{background: "url(/images/keryiBarter_login_bg.png) no-repeat center center / cover border-box content-box"}}
            >
                {/*render渲染个人信息页面头部阴影*/}
                {renderPersonalShadow.bind(this)()}
                {/*render渲染个人信息页面背景和头像*/}
                {renderPersonalHeaderBackgroundAndPortrait.bind(this)()}
            </header>
        )
    }

    /**
     * render渲染keryi_barter个人信息页面主要内容
     * @returns {XML}
     */
    render() {
        const {
            //render渲染个人信息页面头部
            renderPersonalHeader
        } = this;
        return (
            <div className="keryi_barter_personal_main_container">
                <section className="keryi_barter_personal_main_module">
                    {/*render渲染个人信息页面头部*/}
                    {renderPersonalHeader.bind(this)()}
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