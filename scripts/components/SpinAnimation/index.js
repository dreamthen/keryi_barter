/**
 * Created by yinwk on 2017/6/16.
 */
import React, {PropTypes} from "react";
import "./keryi_barter_spinAnimatioon_animation.css";
import "./keryi_barter_spinAnimation.css";
//SpinAnimation组件动态加载尺寸设置
import sizeConfig from "./configs/sizeConfig";
//SpinAnimation组件动态加载样式表设置
import spinAnimationConfig from "./configs/spinAnimationConfig";
//SpinAnimation内部旋转圆数量配置
import innerIConfig from "./configs/innerIConfig";
//在不传入动画加载尺寸size、size为空或者size类型错误时,SpinAnimation组件动态加载className样式表用默认长宽为20px
const defaultSize = "default";
//还没点击时,内部旋转圆容器样式表设置
const spinAnimation = "spin_animation";
//点击之后,胶片图标和"更多图片"描述左移右移动画加载之后,内部旋转圆容器旋转动画样式表设置
const spinAnimationAction = "spin_animation_action";
//还没点击时,胶片图标容器样式表设置
const spinAnimationArea = "spin_animation_area";
//点击之后,胶片图标容器右移动画样式表设置
const spinAnimationAreaAction = "spin_animation_area_action";
//还没点击时,内部旋转圆样式表设置
const spinAnimationInnerI = "spin_animation_innerI";
//点击之后,胶片图标和"更多图片"描述左移右移动画加载之后,内部旋转圆透明度和背景颜色动态替换样式表设置
const spinAnimationInnerIAction = "spin_animation_innerI_action";
//还没点击时,"更多图片"描述容器样式表设置
const spinAnimationDescription = "spin_animation_description";
//还没点击时,"更多图片"描述容器左移样式表设置
const spinAnimationDescriptionAction = "spin_animation_description_action";

export class SpinAnimation extends React.Component {
    static Proptypes = {
        //SpinAnimation组件动画加载尺寸:small,default和large,默认为default
        size: PropTypes.string,
        //SpinAnimation组件动画加载className,外部传入样式表
        className: PropTypes.string,
        //SSpinAnimation组件动画加载回调函数
        onClick: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            //是否执行icon旋转动画加载
            actionAnimation: false,
            //是否执行胶片图标和"更多图片"描述左移右移动画加载
            moveAnimation: false
        }
    }

    /**
     * render渲染SpinAnimation内部旋转圆,
     * 还没点击时,内部旋转圆样式表;
     * 点击之后,胶片图标和"更多图片"描述左移右移动画加载之后,内部旋转圆透明度和背景颜色动态替换样式表
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
        const {onClick} = this.props;
        this.setState({
            moveAnimation: true
        });
        //FIXME 这里设置一个时间控制器,在胶片图标和"更多图片"描述左移右移动画加载之后,内部旋转圆动态旋转并且透明度和背景颜色动态替换样式表
        setTimeout(function timer() {
            this.setState({
                actionAnimation: true
            });
            onClick();
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
            //SpinAnimation内部旋转圆,还没点击时,内部旋转圆样式表;点击之后,胶片图标和"更多图片"描述左移右移动画加载之后,内部旋转圆透明度和背景颜色动态替换样式表
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
                {/*还没点击时,胶片图标容器样式表;点击之后,胶片图标容器右移动画样式表*/}
                <div
                    className={moveAnimation ? spinAnimationConfig[spinAnimationAreaAction] : spinAnimationConfig[spinAnimationArea]}>
                    {/*还没点击时,内部旋转圆样式表;点击之后,胶片图标和"更多图片"描述左移右移动画加载之后,内部旋转圆动态旋转并且透明度和背景颜色动态替换样式表*/}
                    <div
                        className={actionAnimation ? spinAnimationConfig[spinAnimationAction] : spinAnimationConfig[spinAnimation]}>
                        {renderInnerI.bind(this)()}
                    </div>
                </div>
                {/*还没点击时,"更多图片"描述容器样式表;点击之后,"更多图片"描述容器左移样式表*/}
                <dfn
                    className={moveAnimation ? spinAnimationConfig[spinAnimationDescriptionAction] : spinAnimationConfig[spinAnimationDescription]}>
                    更多图片
                </dfn>
            </section>
        )
    }
}