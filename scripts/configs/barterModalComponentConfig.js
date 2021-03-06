/**
 * Created by yinwk on 2017/6/24.
 */
//资源列表页面,Modal组件弹窗根据不同的组件类型配置来设置组件
const barterModalComponentConfig = [
    {
        key: "title",
        include: "area",
        size: "large",
        value: "标题",
        placeholder: "标题",
        placeholderClassName: "keryi_barter_modal_area_title_placeholder",
        className: "keryi_barter_modal_area_title"
    },
    {
        key: "figureCarousel",
        include: "carousel"
    },
    {
        key: "functions",
        include: "functionIcons",
        value: "功能图标",
        classNameNone: "keryi_barter_modal_functionIcons keryi_barter_modal_functionIconsNone",
        className: "keryi_barter_modal_functionIcons",
        classNameShow: "keryi_barter_modal_functionIcons keryi_barter_modal_functionIconsShow",
        functionIcons: [{
            key: "image",
            include: "uploadPhoto",
            value: "上传图片",
            className: "keryi_barter_modal_uploadPhoto",
            iconName: "iconfontKeryiBarter keryiBarter-photo"
        }]
    },
    {
        key: "description",
        include: "area",
        size: "large",
        value: "描述",
        placeholder: "在这里填写资源描述",
        placeholderClassName: "keryi_barter_modal_area_description_placeholder",
        className: "keryi_barter_modal_area_description"
    },
    {
        key: "priceWorth",
        include: "input",
        size: "large",
        placeholder: "请对您的资源估值",
        className: "keryi_barter_modal_area_priceWorth"
    },
    {
        key: "tagList",
        include: "tagArea",
        type: "primary",
        classNameNone: "keryi_barter_modal_tagArea keryi_barter_modal_tagAreaNone",
        className: "keryi_barter_modal_tagArea",
        classNameShow: "keryi_barter_modal_tagArea keryi_barter_modal_tagAreaShow",
        iconName: "iconfontKeryiBarter keryiBarter-close"
    },
    {
        key: "sourceTag",
        include: "area",
        size: "large",
        value: "选择资源类型",
        pullListDown: true,
        pullListDownKey: "pullListDownVisible",
        pullList: "pullList",
        selectPullListDown: "selectPullListDown",
        closePullListDown: "closePullListDown",
        left: "left",
        placeholder: "#选择您的资源类型",
        placeholderClassName: "keryi_barter_modal_area_sourceTag_placeholder",
        className: "keryi_barter_modal_area_sourceTag"
    },
    {
        key: "targetTagList",
        include: "targetTagArea",
        type: "info",
        classNameNone: "keryi_barter_modal_targetTagArea keryi_barter_modal_targetTagAreaNone",
        className: "keryi_barter_modal_targetTagArea",
        classNameShow: "keryi_barter_modal_targetTagArea keryi_barter_modal_targetTagAreaShow",
        iconName: "iconfontKeryiBarter keryiBarter-close"
    },
    {
        key: "targetSourceTag",
        include: "area",
        size: "large",
        value: "选择目标资源类型",
        pullListDown: true,
        pullListDownKey: "pullListTargetDownVisible",
        pullList: "pullListTarget",
        selectPullListDown: "selectPullListTargetDown",
        closePullListDown: "closePullListDown",
        left: "targetLeft",
        placeholder: "#选择您的目标资源类型",
        placeholderClassName: "keryi_barter_modal_area_targetSourceTag_placeholder",
        className: "keryi_barter_modal_area_targetSourceTag"
    }
];

//导出资源列表页面,Modal组件弹窗根据不同的组件类型配置来设置组件
export default barterModalComponentConfig;