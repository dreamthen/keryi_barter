/**
 * Created by yinwk on 2017/6/8.
 */
const registerComponentConfig = [
    {
        key: "account",
        include: "input",
        value: "您当前使用的邮件地址",
        maxLength: 25,
        placeholder: "您当前使用的邮件地址或者手机号码",
        className: "keryi_barter_loginOrRegister_input"
    },
    {
        key: "password",
        include: "input",
        type: "password",
        value: "注册密码",
        maxLength: 6,
        placeholder: "密码",
        className: "keryi_barter_loginOrRegister_input_password"
    }
];

export default registerComponentConfig;