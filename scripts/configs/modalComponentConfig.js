/**
 * Created by yinwk on 2017/6/24.
 */
const modalComponentConfig = [
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
        key: "tagList",
        include: "tagArea",
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
        placeholder: "#选择您的资源类型",
        placeholderClassName: "keryi_barter_modal_area_sourceTag_placeholder",
        className: "keryi_barter_modal_area_sourceTag"
    }
];

export default modalComponentConfig;