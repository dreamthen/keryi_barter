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
        key: "description",
        include: "textarea",
        type: "textarea",
        size: "large",
        value: "描述",
        rows: 3,
        maxLength: 500,
        placeholder: "在这里填写资源描述",
        className: "keryi_barter_modal_input_description"
    }
];

export default modalComponentConfig;