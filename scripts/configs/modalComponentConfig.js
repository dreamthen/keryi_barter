/**
 * Created by yinwk on 2017/6/24.
 */
const modalComponentConfig = [
    {
        key: "title",
        placeholderAble: "placeholderAbleTitle",
        include: "area",
        size: "large",
        value: "标题",
        placeholder: "标题",
        placeholderClassName: "keryi_barter_modal_area_title_placeholder",
        className: "keryi_barter_modal_area_title"
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
        placeholderAble: "placeholderAbleDescription",
        include: "area",
        size: "large",
        value: "描述",
        placeholder: "在这里填写资源描述",
        placeholderClassName: "keryi_barter_modal_area_description_placeholder",
        className: "keryi_barter_modal_area_description",
        focus: true,
        blur: true,
        focusFunc: "onDescriptionFocus",
        blurFunc: "onDescriptionBlur"
    },
    {
        key: "sourceTag",
        placeholderAble: "placeholderAbleSourceTag",
        include: "area",
        size: "large",
        value: "选择资源类型",
        placeholder: "#选择您的资源类型",
        placeholderClassName: "keryi_barter_modal_area_sourceTag_placeholder",
        className: "keryi_barter_modal_area_sourceTag"
    }
];

export default modalComponentConfig;