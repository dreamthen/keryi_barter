/**
 * Created by yinwk on 2017/6/1.
 */
import React from "react";
import {connect} from "react-redux";
import {Button} from "../components/Button";
import {Input} from "../components/Input";
import {Prompt} from "../components/Prompt";
import loginComponentConfig from "../configs/loginComponentConfig";
import registerComponentConfig from "../configs/registerComponentConfig";
import "../../stylesheets/login.css";

//组件类型
const componentType = ["input"];

class LoginView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //login页面副级容器距离页面最上方的长度
            top: 0,
            //login页面副级容器距离页面最左方的长度
            left: 0,
            //login页面副级容器登录模块距离页面最上方的长度
            loginTop: 0,
            //login页面副级容器登录模块距离页面最左方的长度
            loginLeft: 0,
            //login页面副级容器注册模块距离页面最上方的长度
            registerTop: "-100%",
            //login页面副级容器注册模块距离页面最左方的长度
            registerLeft: "100%",
            //Input输入框电子邮件内容
            inputValue: "",
            //Input输入框密码内容
            inputPassword: "",
            //错误提示状态
            isError: false,
            //错误提示语
            errorPrompt: "",
            //警告提示状态
            isWarn: false,
            //警告提示语
            warnPrompt: "",
            //成功提示状态
            isSuccess: false,
            //成功提示语
            successPrompt: ""
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

    }

    /**
     * 初始化login页面登录模块和注册模块输入框数据
     */
    initLogin() {
        this.setState({
            inputValue: "",
            inputPassword: ""
        });
    }

    /**
     * render渲染description介绍模块
     * @returns {XML}
     */
    renderDescription() {
        const {descriptionToLogin} = this;
        return (
            //login页面副级容器介绍模块
            <section className="keryi_barter_login_page_module keryi_barter_description">
                {/*login页面渐变阴影遮罩*/}
                <div className="keryi_barter_shadow">
                </div>
                {/*login页面介绍模块主要介绍内容*/}
                <div className="keryi_barter_all_module keryi_barter_description_module">
                    {/*login页面介绍模块主要介绍内容头部*/}
                    <div className="keryi_barter_description_head">
                        <i className="iconfontKeryiBarter keryiBarter-keryiLogo">

                        </i>
                        <sub className="keryi_barter_description_head_title">壳艺</sub>
                    </div>
                    {/*login页面介绍模块主要介绍内容标题*/}
                    <div className="keryi_barter_description_title">
                        壳艺市场，越过cash，直达资源
                    </div>
                    {/*login页面介绍模块主要介绍内容描述*/}
                    <div className="keryi_barter_description_content">
                        我们力图使生产力的生产过程摆脱资金链的压力，使现实市场跳出空间的局限；我们力图改变国内网站呆板的设计，尝试将艺术与商业结合，给用户带来便利的同时，尽享独特美感。
                    </div>
                    {/*login页面介绍模块"开始吧"按钮动画过渡到login登录模块*/}
                    <Button
                        size="large"
                        type="primary"
                        onClick={descriptionToLogin.bind(this)}
                        className="keryi_barter_description_start"
                    >
                        开始吧
                        <i className="iconfontKeryiBarter keryiBarter-keryiLogo">

                        </i>
                    </Button>
                    {/*login页面介绍模块向下箭头动画过渡到login登录模块*/}
                    <div className="keryi_barter_description_to_login">
                        <i
                            className="iconfontKeryiBarter keryiBarter-downward"
                            onClick={descriptionToLogin.bind(this)}
                        >

                        </i>
                    </div>
                </div>
            </section>
        )
    }

    /**
     * 从description介绍模块动画过渡到login登录模块
     */
    descriptionToLogin() {
        const {initLogin} = this;
        //将login页面副级容器距离页面最上方的长度设置为100%
        this.setState({
            top: "-100%"
        });
        //初始化login页面登录模块和注册模块输入框数据
        initLogin.bind(this)();
    }

    /**
     * 根据不同的组件类型配置来设置组件
     * @param key
     * @param include
     * @param type
     * @param placeholder
     * @param className
     * @returns {XML}
     */
    renderComponentConfig(key, include, type, placeholder, className) {
        const {inputChangeHandler} = this;
        switch (include) {
            case componentType[0]:
                return (
                    <Input
                        key={key}
                        value={this.state[key]}
                        type={type ? type : "text"}
                        placeholder={placeholder}
                        className={className}
                        onChange={inputChangeHandler.bind(this, key)}
                    />
                );
            default:
                break;
        }
    }

    /**
     * render渲染根据需求配置完成的组件
     * @returns {Array}
     */
    renderComponent(ComponentConfig) {
        const {renderComponentConfig} = this;
        return ComponentConfig.map(function componentConfig(configItem, index) {
            return renderComponentConfig.bind(this)(
                configItem["key"],
                configItem["include"],
                configItem["type"],
                configItem["placeholder"],
                configItem["className"]
            );
        }.bind(this));
    }

    renderPrompt() {
        const {isError, errorPrompt, isWarn, warnPrompt, isSuccess, successPrompt} = this.state;
        return (
            <div className="keryi_barter_prompt_container">
                {isError && <Prompt size="default" type="error" message={errorPrompt} showIcon/>}
                {isWarn && <Prompt size="default" type="warning" message={warnPrompt} showIcon/>}
                {isSuccess && <Prompt size="default" type="success" message={successPrompt} showIcon/>}
            </div>
        )
    }

    /**
     *
     * @param ComponentConfig
     * @returns {boolean}
     */
    onCheck(ComponentConfig) {

        ComponentConfig.forEach(function componentConfig(configItem, index) {
            if (this.state[configItem["key"]] === "") {
                return false;
            }
        }.bind(this));
        return true;
    }

    /**
     * render渲染login登录模块
     * @returns {XML}
     */
    renderLogin() {
        const {loginLeft, loginTop} = this.state;
        const {
            renderComponent,
            renderPrompt,
            loginChangeRegister
        } = this;
        return (
            //login页面副级容器登录模块
            <section
                className="keryi_barter_login_page_module keryi_barter_login"
                style={{top: loginTop, left: loginLeft}}
            >
                {/*login页面渐变阴影遮罩*/}
                <div className="keryi_barter_shadow keryi_barter_loginOrRegister_shadow">
                </div>
                {/*login页面登录模块头部*/}
                <div className="keryi_barter_upside">
                    <nav className="keryi_barter_mainUpside">
                        <div className="keryi_barter_logo">
                            <i className="iconfontKeryiBarter keryiBarter-keryiLogo">

                            </i>
                            <sub className="keryi_barter_login_title">
                                壳艺
                            </sub>
                        </div>
                        <div className="keryi_barter_button_transform">
                            <Button
                                type="primary"
                                size="small"
                                className="keryi_barter_button_toLogin"
                                onClick={loginChangeRegister.bind(this, "-100%", 0)}
                            >
                                注 册
                            </Button>
                        </div>
                    </nav>
                </div>
                {/*login页面登录模块主要介绍内容*/}
                <div className="keryi_barter_all_module keryi_barter_loginOrRegister_module">
                    {/*login页面登录模块主要介绍内容头部*/}
                    <div className="keryi_barter_loginOrRegister_head">
                        <h2 className="keryi_barter_loginOrRegister_head_title">
                            登录
                        </h2>
                        <h3 className="keryi_barter_loginOrRegister_head_title_en">
                            Login
                        </h3>
                    </div>
                    <div className="keryi_barter_loginOrRegister_main">
                        {/*login页面登录模块提示语模块*/}
                        {renderPrompt.bind(this)()}
                        {/*render渲染根据Login需求配置完成的组件*/}
                        {renderComponent.bind(this)(loginComponentConfig)}
                        <Button
                            type="primary"
                            size="large"
                            className="keryi_barter_loginOrRegister_button"
                        >
                            登录
                        </Button>
                    </div>
                </div>
            </section>
        )
    }

    /**
     * Input输入框内容改变事件
     * @param key
     * @param e
     */
    inputChangeHandler(key, e) {
        //利用setState将Input输入框内容改变
        this.setState({
            [key]: e.target.value
        });
        //取消冒泡
        e.nativeEvent.stopImmediatePropagation();
    }

    /**
     * 从login登录模块动画过渡到register注册模块或者从register注册模块动画过渡到login登录模块
     * @param loginLeft
     * @param registerLeft
     */
    loginChangeRegister(loginLeft, registerLeft) {
        const {initLogin} = this;
        //将login登录模块的内容距离屏幕最左边设置为-100%;login注册模块的内容距离屏幕最左边设置为0
        this.setState({
            loginLeft,
            registerLeft
        });
        //初始化login页面登录模块和注册模块输入框数据
        initLogin.bind(this)();
    }

    /**
     * render渲染register注册模块
     * @returns {XML}
     */
    renderRegister() {
        const {registerLeft, registerTop} = this.state;
        const {
            renderComponent,
            renderPrompt,
            loginChangeRegister
        } = this;
        return (
            <section
                className="keryi_barter_login_page_module keryi_barter_register"
                style={{
                    top: registerTop,
                    left: registerLeft
                }}
            >
                {/*login页面渐变阴影遮罩*/}
                <div className="keryi_barter_shadow keryi_barter_loginOrRegister_shadow">
                </div>
                {/*login页面登录模块头部*/}
                <div className="keryi_barter_upside">
                    <nav className="keryi_barter_mainUpside">
                        <div className="keryi_barter_logo">
                            <i className="iconfontKeryiBarter keryiBarter-keryiLogo">

                            </i>
                            <sub className="keryi_barter_logo_title">
                                壳艺
                            </sub>
                        </div>
                        <div className="keryi_barter_button_transform">
                            <Button
                                type="primary"
                                size="small"
                                className="keryi_barter_button_toLogin"
                                onClick={loginChangeRegister.bind(this, 0, "100%")}
                            >
                                登 录
                            </Button>
                        </div>
                    </nav>
                </div>
                {/*login页面注册模块主要介绍内容*/}
                <div className="keryi_barter_all_module keryi_barter_loginOrRegister_module">
                    {/*login页面注册模块主要介绍内容头部*/}
                    <div className="keryi_barter_loginOrRegister_head">
                        <h2 className="keryi_barter_loginOrRegister_head_title">
                            注册
                        </h2>
                        <h3 className="keryi_barter_loginOrRegister_head_title_en">
                            Register
                        </h3>
                    </div>
                    <div className="keryi_barter_loginOrRegister_main">
                        {/*login页面注册模块提示语模块*/}
                        {renderPrompt.bind(this)()}
                        {/*render渲染根据Register需求配置完成的组件*/}
                        {renderComponent.bind(this)(registerComponentConfig)}
                        <Button
                            type="primary"
                            size="large"
                            className="keryi_barter_loginOrRegister_button"
                        >
                            注册
                        </Button>
                    </div>
                </div>
            </section>
        )
    }

    render() {
        const {top, left} = this.state;
        const {renderDescription, renderLogin, renderRegister} = this;
        return (
            //login页面副级容器
            <div
                className="keryi_barter_login_page_container"
                style={{top, left}}
            >
                {/*login页面介绍模块*/}
                {renderDescription.bind(this)()}
                {/*login页面登录模块*/}
                {renderLogin.bind(this)()}
                {/*login页面注册模块*/}
                {renderRegister.bind(this)()}
            </div>
        )
    }
}

function select(state, ownProps) {
    return {}
}

export default connect(select)(LoginView);

