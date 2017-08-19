/**
 * author yinwk
 * createTime 2017/8/16 14:41
 * description clown laugh at you~
 */
//个人信息页面,根据不同的组件类型配置来设置组件
const personalComponentConfig = [
    {
        key: "username",
        value: "用户名",
        include: "input",
        size: "large",
        type: "text",
        disabled: "personalInformationDisabled",
        className: "keryi_barter_personal_main_information_personalMain_atom keryi_barter_personal_main_information_personalMain_username"
    },
    {
        key: "email",
        value: "邮箱",
        include: "input",
        size: "large",
        type: "text",
        disabled: "personalInformationDisabled",
        className: "keryi_barter_personal_main_information_personalMain_atom keryi_barter_personal_main_information_personalMain_email"
    },
    {
        key: "phone",
        value: "手机号码",
        include: "input",
        size: "large",
        type: "text",
        disabled: "personalInformationDisabled",
        className: "keryi_barter_personal_main_information_personalMain_atom keryi_barter_personal_main_information_personalMain_phone"
    }
];

//导出个人信息页面,根据不同的组件类型配置来设置组件
export default personalComponentConfig;