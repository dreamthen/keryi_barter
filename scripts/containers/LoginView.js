/**
 * Created by yinwk on 2017/6/1.
 */
import React from "react";
import {connect} from "react-redux";
import {Button} from "../components/Button";
import "../../stylesheets/login.css";

class LoginView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
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
     * render渲染login登录模块
     * @returns {XML}
     */
    renderDescription() {
        const {descriptiontoLogin} = this;
        return (
            <section className="keryi_barter_description">
                <div className="keryi_barter_description_shadow">
                </div>
                <div className="keryi_barter_description_module">
                    <div className="keryi_barter_description_head">
                        <span className="keryi_barter_description_head_title">壳艺</span>
                        <i className="iconfontKeryiBarter keryiBarter-keryiLogo">

                        </i>
                    </div>
                    <div className="keryi_barter_description_title">
                        Tumblr 用起来真是简单到难以解释。
                    </div>
                    <div className="keryi_barter_description_content">
                        我们让创建博客和随心所欲发布内容的过程变得真的非常非常简单。故事、图片、GIF
                        动图、电视剧、链接、俏皮话、冷笑话、不冷的笑话、Spotify的曲目、MP3、视频、时尚、艺术，以及有深度的内容。Tumblr 是 349 百万个不同的博客，实实在在地涵盖了所有内容。
                    </div>
                    <Button
                        size="large"
                        type="primary"
                        onClick={descriptiontoLogin.bind(this)()}
                    >
                        开始吧
                        <i className="iconfontKeryiBarter keryiBarter-keryiLogo">

                        </i>
                    </Button>
                </div>
            </section>
        )
    }

    descriptiontoLogin() {

    }

    /**
     * render渲染register注册模块
     * @returns {XML}
     */
    renderRegister() {
        return (
            <section className="keryi_barter_register">

            </section>
        )
    }

    render() {
        const {renderDescription, renderRegister} = this;
        return (
            //login页面副级容器
            <div className="keryi_barter_login_page_container">
                {/*login页面介绍模块*/}
                {renderDescription.bind(this)()}
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

