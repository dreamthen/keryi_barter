/**
 * Created by yinwk on 2017/6/24.
 */
const modalComponentConfig = [
    {
        key: "title",
        include: "input",
        size: "large",
        value: "标题",
        maxLength: 50,
        placeholder: "标题",
        className: "keryi_barter_modal_input_title"
    },
    {
        key: "functions",
        include: "functionIcons",
        value: "功能图标",
        classNameNone: "keryi_barter_modal_functionIcons keryi_barter_modal_functionIconsNone",
        className: "keryi_barter_modal_functionIcons",
        classNameShow: "keryi_barter_modal_functionIcons keryi_barter_modal_functionIconsNone",
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
        include: "textarea",
        type: "textarea",
        size: "large",
        value: "描述",
        rows: 3,
        maxLength: 500,
        placeholder: "在这里填写资源描述",
        className: "keryi_barter_modal_input_description",
        focus: true,
        blur: true,
        focusFunc: "onDescriptionFocus",
        blurFunc: "onDescriptionBlur"
    }
];

export default modalComponentConfig;