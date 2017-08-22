/**
 * author yinwk
 * createTime 2017/8/16 17:56
 * description clown laugh at you~
 */
//校验字段undefined和null,进行处理
export function checkField(field) {
    return (field !== undefined && field !== null) ? field : "";
}