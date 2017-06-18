/**
 * Created by yinwk on 2017/6/16.
 */
import React, {PropTypes} from "react";
import "./keryi_barter_spinAnimatioon_animation.css";
import "./keryi_barter_spinAnimation.css";
//SpinAnimation动态加载尺寸设置
import sizeConfig from "./configs/sizeConfig";
//SpinAnimation动态加载样式表设置
import spinAnimationConfig from "./configs/spinAnimationConfig";
//SpinAnimation动态加载内部旋转圆设置
import innerIConfig from "./configs/innerIConfig";
//在不传入动画加载尺寸size、size为空或者size类型错误时,SpinAnimation组件动态加载className样式表用默认长宽为20px
const defaultSize = "default";
const spinAnimation = "spin_animation";
const spinAnimationAction = "spin_animation_action";
const spinAnimationArea = "spin_animation_area";
const spinAnimationAreaAction = "spin_animation_area_action";
const spinAnimationInnerI = "spin_animation_innerI";
const spinAnimationInnerIAction = "spin_animation_innerI_action";
const spinAnimationDescription = "spin_animation_description";
const spinAnimationDescriptionAction = "spin_animation_description_action";

export class SpinAnimation extends React.Component {
    static Proptypes = {
        //SpinAnimation组件动画加载尺寸:small,default和large,默认为default
        size: PropTypes.string,
        //SpinAnimation组件动画加载className,外部传入样式表
        className: PropTypes.string
    };

    constructor(props) {
        super(props);
        this.state = {
            //是否执行icon旋转动画加载
            actionAnimation: false,
            //是否执行description左移动画加载
            moveAnimation: false
        }
    }

    /**
     * render渲染SpinAnimation内部
     * @returns {Array}
     */
    renderInnerI() {
        const {actionAnimation} = this.state;
        return innerIConfig.map(function innerI(innerIItem, innerIIndex) {
            return (
                <i
                    className={actionAnimation ? spinAnimationConfig[spinAnimationInnerIAction] : spinAnimationConfig[spinAnimationInnerI]}
                    key={innerIIndex}
                >

                </i>
            )
        })
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

    /**
     * 点击按钮执行动画加载
     * @param e
     */
    clickToAnimation(e) {
        this.setState({
            moveAnimation: true
        });
        setTimeout(function timer() {
            this.setState({
                actionAnimation: true
            });
        }.bind(this), 1000);
        //取消冒泡
        e.nativeEvent.stopImmediatePropagation();
    }

    render() {
        const {
            //根据外部传入的props size来设置SpinAnimation组件动画加载className样式表
            sizeToClass,
            //点击按钮执行动画加载
            clickToAnimation,
            renderInnerI
        } = this;
        const {
            actionAnimation,
            moveAnimation
        } = this.state;
        return (
            <section
                onClick={clickToAnimation.bind(this)}
                className={sizeToClass.bind(this)()}
            >
                <div
                    className={moveAnimation ? spinAnimationConfig[spinAnimationAreaAction] : spinAnimationConfig[spinAnimationArea]}>
                    <div
                        className={actionAnimation ? spinAnimationConfig[spinAnimationAction] : spinAnimationConfig[spinAnimation]}>
                        {renderInnerI.bind(this)()}
                    </div>
                </div>
                <dfn
                    className={moveAnimation ? spinAnimationConfig[spinAnimationDescriptionAction] : spinAnimationConfig[spinAnimationDescription]}>
                    更多图片
                </dfn>
            </section>
        )
    }
}