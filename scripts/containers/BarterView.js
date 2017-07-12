/**
 * Created by yinwk on 2017/6/13.
 */
import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {KeryiCard, HeadPortrait} from "../keryi";
import {getResourcesList} from "../actions/barterActions";
import keryiCardDefaultConfig from "../configs/keryiCardDefaultConfig";
import "../../stylesheets/barter.css";

class BarterView extends React.Component {
    static propTypes = {
        //获取资源数据列表
        list: PropTypes.array,
        //资源数据列表页码
        current: PropTypes.number
    };

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
        const {dispatch, current} = this.props;
        dispatch(getResourcesList(current));
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
    renderKeryiCard(keryiCard) {
        return (
            <KeryiCard
                userName="1000yardStyle"
                imageList={[{
                    src: "/images/keryiBarter_description_bg.png",
                    name: "keryi介绍背景"
                }, {
                    src: "/images/keryiBarter_login_bg.png",
                    name: "keryi登录背景"
                }, {
                    src: "/images/keryiBarter_register_bg.png",
                    name: "keryi注册背景"
                }, {
                    src: "/images/keryiBarter_login_bg.png",
                    name: "keryi登录背景"
                }]}
                title={keryiCard["title"]}
                introduce={keryiCard["intro"]}
                tagList={[{
                    type: "primary",
                    content: "react"
                }, {
                    type: "primary",
                    content: "react-redux"
                }, {
                    type: "primary",
                    content: "react-router-redux"
                }]}
                needParty={keryiCard["price_worth"]}
            />
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
            renderKeryiCard
        } = this;
        return (
            <div className="keryi_barter_main_container">
                <div className="keryi_barter_main_module keryi_barter_main_barterList">
                    {
                        (list && list.length > 0) ? list.map(function lister(listItem, listIndex) {
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
                            }.bind(this)) : //获取资源数据列表出现异常时,前端呈现默认约定数据
                            <article className="keryi_barter_cardInfo">
                                {/*render渲染用户头像*/}
                                {renderHeadPortrait.bind(this)("/images/keryiBarter_login_bg.png")}
                                {/*render渲染用户资源卡片*/}
                                {renderKeryiCard.bind(this)(keryiCardDefaultConfig)}
                            </article>
                    }
                </div>
                <aside className="keryi_barter_main_module keryi_barter_main_aside">

                </aside>
            </div>
        )
    }
}

function select(state, ownProps) {
    return {
        ...state.barterReducers
    }
}

export default connect(select)(BarterView);