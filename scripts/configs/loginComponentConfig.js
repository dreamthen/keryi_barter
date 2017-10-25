/**
 * Created by yinwk on 2017/6/4.
 */
const loginComponentConfig = [
    {
        key: "account",
        include: "input",
        value: "电子邮件",
        maxLength: 25,
        placeholder: "电子邮件或者手机号码",
        className: "keryi_barter_loginOrRegister_input"
    },
    {
        key: "password",
        include: "input",
        value: "密码",
        maxLength: 6,
        type: "password",
        placeholder: "密码",
        className: "keryi_barter_loginOrRegister_input_password"
    }
];

export default loginComponentConfig;