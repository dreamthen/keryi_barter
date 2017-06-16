/**
 * Created by yinwk on 2017/6/16.
 */
import React, {PropTypes} from "react";
import "./keryi_barter_spinAnimation.css";
//SpinAnimation动态加载尺寸设置
import sizeConfig from "./configs/sizeConfig";
//在不传入动画加载尺寸size、size为空或者size类型错误时,SpinAnimation组件动态加载className样式表用默认长宽为20px
const defaultSize = "default";

export class SpinAnimation extends React.Component {
    static Proptypes = {
        //SpinAnimation组件动画加载尺寸:small,default和large,默认为default
        size: PropTypes.string,
        //SpinAnimation组件动画加载className,外部传入样式表
        className: PropTypes.string
    };

    constructor(props) {
        super(props);
        this.state = {}
    }

    /**
     * 根据外部传入的props size来设置SpinAnimation组件动画加载className样式表
     * @returns {*}
     */
    sizeToClass() {
        const {size} = this.props;
        //在传入动画加载尺寸size且size类型为string时,SpinAnimation组件动态加载用sizeConfig中的指定className样式表长宽尺寸;在不传入动画加载尺寸size、size为空或者size类型错误时,SpinAnimation组件动态加载className样式表用默认长宽为20px
        return size ? sizeConfig[size] : sizeConfig[defaultSize];
    }

    render() {
        const {
            sizeToClass
        } = this;
        return (
            <section className={sizeToClass.bind(this)()}>
                <div className="keryi_barter_spinAnimation_container">

                </div>
            </section>
        )
    }
}