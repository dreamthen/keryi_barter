/**
 * author yinwk
 * createTime 2017/9/26 16:50
 * description clown laugh at you~
 */
import React, {PropTypes} from "react";
import ReactDOM from "react-dom";
import "./keryi_barter_loading.css";

/**
 * keryi_barter Loading请求加载组件
 */
class Loading extends React.Component {
    static propTypes = {};

    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidUpdate() {

    }

    //组件结束装载
    componentDidMount() {
        const {
            //Loading请求加载组件渲染
            _render
        } = this;
        this.loadingContainer = document.createElement("div");
        document.body.appendChild(this.loadingContainer);
        _render.bind(this)();
    }

    //keryi_barter Loading请求加载组件渲染
    _render() {
        ReactDOM.render(
            <section className="keryi_barter_loading_container">
                <div className="keryi_barter_loading_shadow">

                </div>
                <main className="keryi_barter_loading_main_holder">
                    <i className="iconfontKeryiBarter keryiBarter-keryiLogo">

                    </i>
                </main>
            </section>, this.loadingContainer)
    }

    render() {
        return null;
    }
}

//导出keryi_barter Loading请求加载组件
export default Loading;