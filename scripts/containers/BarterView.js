/**
 * Created by yinwk on 2017/6/13.
 */
import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {
    HeadPortrait,
    KeryiCard,
    Modal
} from "../keryi";
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
        this.state = {
            //控制Modal组件对话框显示、隐藏或者消失
            viewBarterVisible: false
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
        const {
            //dispatch获取资源数据列表
            dispatchResourceList
        } = this.props;
        dispatchResourceList.bind(this)();
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
        const {
            //控制Modal组件对话框显示
            viewKeryiBarterHandler
        } = this.props;
        return (
            <div
                className="keryi_barter_card_container"
            >
                <KeryiCard
                    userName="1000yardStyle"
                    imageList={eval("(" + keryiCard["imgUrls"] + ")")}
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
                    viewDetails="iconfontKeryiBarter keryiBarter-moreInformation"
                    onViewDetails={viewKeryiBarterHandler.bind(this)}
                />
            </div>
        )
    }

    /**
     * keryi_barter主页面查看"以物换物"资源对话框
     * @returns {XML}
     */
    renderModal() {
        const {
            //控制Modal组件对话框显示、隐藏或者消失
            viewBarterVisible
        } = this.state;
        const {
            //控制Modal组件对话框隐藏并消失
            closeBarterVisibleHandler
        } = this.props;
        return (
            <Modal
                visible={viewBarterVisible}
                closable
                onClose={closeBarterVisibleHandler.bind(this)}
            >
            </Modal>
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
            renderKeryiCard,
            //keryi_barter主页面查看"以物换物"资源对话框
            renderModal
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
                {/*keryi_barter主页面查看"以物换物"资源对话框*/}
                {renderModal.bind(this)()}
                <aside className="keryi_barter_main_module keryi_barter_main_aside">

                </aside>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        ...state.barterReducers
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        /**
         * 控制Modal组件对话框显示
         * @params e
         */
        viewKeryiBarterHandler(e) {
            this.setState({
                viewBarterVisible: true
            });
            //取消冒泡
            e.nativeEvent.stopImmediatePropagation();
        },
        /**
         * dispatch获取资源数据列表
         */
        dispatchResourceList() {
            const {current} = this.props;
            dispatch(getResourcesList(current));
        },
        /**
         * 控制Modal组件对话框隐藏并消失
         */
        closeBarterVisibleHandler() {
            this.setState({
                viewBarterVisible: false
            });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BarterView);