/**
 * author yinwk
 * createTime 2017/9/26 16:50
 * description clown laugh at you~
 */
import React, {PropTypes} from "react";
import ReactDOM from "react-dom";
import loadingConfig from "./configs/loadingConfig";
import "./keryi_barter_loading_animation.css";
import "./keryi_barter_loading.css";
//Loading组件请求加载显示样式表配置
const loadingVisibleShow = "loadingVisibleShow";
//Loading组件请求加载隐藏样式表配置
const loadingVisibleDisappear = "loadingVisibleDisappear";
//Loading组件请求加载消失样式表配置
const loadingVisibleNone = "loadingVisibleNone";

/**
 * keryi_barter Loading请求加载组件
 */
class Loading extends React.Component {
    static propTypes = {
        //Loading组件请求加载是否显示
        loadingVisible: PropTypes.bool,
        //Loading组件请求加载描述文本
        loadingText: PropTypes.string,
        //Loading组件请求加载描述标题
        loadingTitle: PropTypes.string,
        //Loading组件请求加载Icon className样式表,外部传入
        loadingIconClassName: PropTypes.string,
        //Loading组件请求加载className样式表,外部传入
        wrapperClassName: PropTypes.string
    };

    constructor(props) {
        super(props);
        this.state = {
            //Loading组件请求加载隐藏或者消失判断标志位
            loadingAnimationVisible: false,
            //Loading组件请求加载显示或者隐藏判断标志位
            loadingAnimationShowVisible: false
        }
    }

    //组件开始装载
    componentWillMount() {
        const {
            //Loading组件请求加载是否显示
            loadingVisible
        } = this.props;
        //当外部传入Loading组件请求加载是否显示属性为true时,Loading组件请求加载先从消失变为隐藏,然后时间控制器控制在Loading组件请求加载取消消失100ms之后从隐藏变为显示
        loadingVisible ? this.setState({
            loadingAnimationVisible: loadingVisible
        }, function visibler() {
            //FIXME 在这里设置一个时间控制器,Loading组件请求加载取消消失100ms之后,从隐藏到显示的过程
            setTimeout(function timer() {
                this.setState({
                    loadingAnimationShowVisible: loadingVisible
                });
            }.bind(this), 100);
            //当外部传入Loading组件请求加载是否显示属性为false时,Loading组件请求加载先从显示变为隐藏,然后时间控制器控制在Loading组件请求加载从显示到隐藏这个过程动画1s之后,将Loading组件请求加载消失
        }.bind(this)) : this.setState({
            loadingAnimationShowVisible: loadingVisible
        }, function disVisibler() {
            //FIXME 在这里设置一个时间控制器,Loading组件请求加载从显示到隐藏这个过程动画1s之后,将Loading组件请求加载消失
            setTimeout(function timer() {
                this.setState({
                    loadingAnimationVisible: loadingVisible
                });
            }.bind(this), 1000);
        }.bind(this));
    }

    componentWillReceiveProps(nextProps) {
        //当外部传入Loading组件请求加载是否显示属性为true时,Loading组件请求加载先从消失变为隐藏,然后时间控制器控制在Loading组件请求加载取消消失100ms之后从隐藏变为显示
        (this.props.loadingVisible !== nextProps.loadingVisible && nextProps.loadingVisible) &&
        this.setState({
            loadingAnimationVisible: nextProps.loadingVisible
        }, function visibler() {
            //FIXME 在这里设置一个时间控制器,Loading组件请求加载取消消失100ms之后,从隐藏到显示的过程
            setTimeout(function timer() {
                this.setState({
                    loadingAnimationShowVisible: nextProps.loadingVisible
                });
            }.bind(this), 100);
        }.bind(this));
        //当外部传入Loading组件请求加载是否显示属性为false时,Loading组件请求加载先从显示变为隐藏,然后时间控制器控制在Loading组件请求加载从显示到隐藏这个过程动画1s之后,将Loading组件请求加载消失
        (this.props.loadingVisible !== nextProps.loadingVisible && !nextProps.loadingVisible) &&
        this.setState({
            loadingAnimationShowVisible: nextProps.loadingVisible
        }, function disVisibler() {
            //FIXME 在这里设置一个时间控制器,Loading组件请求加载从显示到隐藏这个过程动画1s之后,将Loading组件请求加载消失
            setTimeout(function timer() {
                this.setState({
                    loadingAnimationVisible: nextProps.loadingVisible
                });
            }.bind(this), 1000);
        }.bind(this));
    }

    componentDidUpdate() {
        const {
            //Loading组件请求加载渲染
            _render
        } = this;
        _render.bind(this)();
    }

    //组件结束装载
    componentDidMount() {
        const {
            //Loading组件请求加载渲染
            _render
        } = this;
        this.loadingContainer = document.createElement("div");
        document.body.appendChild(this.loadingContainer);
        _render.bind(this)();
    }

    /**
     * 根据state loadingAnimationVisible来设置Loading组件请求加载容器className样式表
     * @returns {string}
     */
    loadingAnimationVisibleToClass() {
        const {
            //Loading组件请求加载隐藏或者消失判断标志位
            loadingAnimationVisible
        } = this.state;
        //在Loading组件请求加载隐藏或者消失判断标志位为true时,Loading组件请求加载用loadingConfig中的指定className样式表隐藏;在Loading组件请求加载隐藏或者消失判断标志位为false时,Loading组件请求加载className样式表消失
        return loadingAnimationVisible ? "" : " " + loadingConfig[loadingVisibleNone];
    }

    /**
     * 根据state loadingAnimationShowVisible来设置Loading组件请求加载容器className样式表
     * @returns {string}
     */
    loadingAnimationAppearToClass() {
        const {
            //Loading组件请求加载显示或者隐藏判断标志位
            loadingAnimationShowVisible
        } = this.state;
        //在Loading组件请求加载显示或者隐藏判断标志位为true时,Loading组件请求加载用loadingConfig中的指定className样式表显示;在Loading组件请求加载隐藏或者消失判断标志位为false时,Loading组件请求加载className样式表隐藏
        return loadingAnimationShowVisible ? loadingConfig[loadingVisibleShow] : loadingConfig[loadingVisibleDisappear];
    }

    /**
     *  根据props wrapperClassName来设置Loading组件请求加载容器的className样式表
     *  @returns {string}
     */
    outClassToClass() {
        const {
            //Loading组件请求加载className样式表,外部传入
            wrapperClassName
        } = this.props;
        return wrapperClassName ? " " + wrapperClassName : "";
    }

    //keryi_barter Loading组件请求加载渲染
    _render() {
        const {
            //Loading组件请求加载描述文本
            loadingText,
            //Loading组件请求加载描述标题
            loadingTitle,
            //Loading组件请求加载Icon className样式表
            loadingIconClassName
        } = this.props;
        const {
            //根据state loadingAnimationVisible来设置Loading组件请求加载容器className样式表
            loadingAnimationVisibleToClass,
            //根据state loadingAnimationShowVisible来设置Loading组件请求加载容器className样式表
            loadingAnimationAppearToClass,
            //根据props wrapperClassName来设置Loading组件请求加载容器的className样式表
            outClassToClass
        } = this;
        ReactDOM.render(
            <section
                tabIndex="-1"
                className={loadingAnimationAppearToClass.bind(this)() + loadingAnimationVisibleToClass.bind(this)() + outClassToClass.bind(this)()}>
                <div className="keryi_barter_loading_shadow">

                </div>
                <main className="keryi_barter_loading_main_holder">
                    <div className="keryi_barter_loading_loadingAnimation">
                        <i className={loadingIconClassName}>

                        </i>
                        <sub className="keryi_barter_loading_loadingAnimation_title">
                            {loadingTitle}
                        </sub>
                    </div>
                    <dfn className="keryi_barter_loading_description">
                        {loadingText}
                    </dfn>
                </main>
            </section>, this.loadingContainer)
    }

    render() {
        return null;
    }
}

//导出keryi_barter Loading请求加载组件
export default Loading;