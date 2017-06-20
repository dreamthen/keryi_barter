/**
 * Created by yinwk on 2017/6/13.
 */
import React from "react";
import {connect} from "react-redux";
import {KeryiCard} from "../components/KeryiCard";
import {HeadPortrait} from "../components/HeadPortrait";
import "../../stylesheets/barter.css";

class BarterView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    /**
     * render渲染用户头像
     * @returns {XML}
     */
    renderHeadPortrait(headPortraitSrc) {
        return (
            <figure
                className="keryi_barter_head_portrait"
            >
                <HeadPortrait
                    headPortrait={headPortraitSrc}
                />
            </figure>
        )
    }

    /**
     * render渲染用户资源卡片
     * @returns {XML}
     */
    renderKeryiCard() {
        return (
            <KeryiCard
                userName="1000yardStyle"
                imageList={[{
                    src: "/images/description_bg.png",
                    name: "keryi介绍背景"
                }, {
                    src: "/images/login_bg.png",
                    name: "keryi登录背景"
                }, {
                    src: "/images/register_bg.png",
                    name: "keryi注册背景"
                }, {
                    src: "/images/login_bg.png",
                    name: "keryi登录背景"
                }]}
                title="today"
                introduce="react react-redux react-router-redux"
                tagList={[{
                    type: "primary",
                    content: ""
                }]}
            />
        )
    }

    /**
     * render渲染keryi_barter主页面主要内容
     * @returns {XML}
     */
    render() {
        const {
            //render渲染用户头像
            renderHeadPortrait,
            //render渲染用户资源卡片
            renderKeryiCard
        } = this;
        return (
            <div className="keryi_barter_main_container">
                <div className="keryi_barter_main_module keryi_barter_main_barterList">
                    <article className="keryi_barter_cardInfo">
                        {/*render渲染用户头像*/}
                        {renderHeadPortrait.bind(this)("/images/login_bg.png")}
                        {/*render渲染用户资源卡片*/}
                        {renderKeryiCard.bind(this)()}
                    </article>
                </div>
                <aside className="keryi_barter_main_module keryi_barter_main_aside">

                </aside>
            </div>
        )
    }
}

function select(state, ownProps) {
    return {}
}

export default connect(select)(BarterView);