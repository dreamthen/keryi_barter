/**
 * Created by yinwk on 2017/6/17.
 */
//SpinAnimation组件动态加载样式表设置
const spinAnimationConfig = {
    //还没点击时,内部旋转圆容器样式表设置
    spin_animation: "keryi_barter_spinAnimation_container",
    //点击之后,胶片图标和"更多图片"描述左移右移动画加载之后,内部旋转圆容器旋转动画样式表设置
    spin_animation_action: "keryi_barter_spinAnimation_container keryi_barter_spinAnimation_actionAnimation",
    //还没点击时,胶片图标容器样式表设置
    spin_animation_area: "keryi_barter_spinAnimation_area",
    //点击之后,胶片图标容器右移动画样式表设置
    spin_animation_area_action: "keryi_barter_spinAnimation_area keryi_barter_spinAnimation_area_action",
    //还没点击时,内部旋转圆样式表设置
    spin_animation_innerI: "",
    //点击之后,胶片图标和"更多图片"描述左移右移动画加载之后,内部旋转圆透明度和背景颜色动态替换样式表设置
    spin_animation_innerI_action: "keryi_barter_spinAnimation_actionInnerI",
    //还没点击时,"更多图片"描述容器样式表设置
    spin_animation_description: "keryi_barter_spinAnimation_description",
    //点击之后,"更多图片"描述容器左移样式表设置
    spin_animation_description_action: "keryi_barter_spinAnimation_description keryi_barter_spinAnimation_description_action",
};

//导出SpinAnimation组件动态加载样式表设置
export default spinAnimationConfig;