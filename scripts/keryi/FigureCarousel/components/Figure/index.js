/**
 * Created by yinwk on 2017/7/16.
 */
import React, {PropTypes} from "react";
import figureConfig from "./configs/figureConfig";
import "./keryi_barter_figure.css";

//keryi_barter Figure图片组件
class Figure extends React.Component {
    static propTypes = {
        //Figure组件图片是否显示
        visible: PropTypes.bool,
        //Figure组件图片地址
        src: PropTypes.string
    };

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const {
            //图片是否显示
            src
        } = this.props;
        return (
            <figure
                className="keryi_barter_figureCarousel_figure"
                style={{background: "url(" + src + ") no-repeat center center/cover border-box content-box"}}
            >
                <i
                    className="iconfontKeryiBarter keryiBarter-close"
                >

                </i>
            </figure>
        )
    }
}

//导出keryi_barter Figure图片组件
export default Figure;