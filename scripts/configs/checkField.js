/**
 * author yinwk
 * createTime 2017/8/16 17:56
 * description clown laugh at you~
 */
//校验字段undefined和null,进行处理
export function checkField(field, property) {
    return (field && field[property] !== undefined && field[property] !== null) ? field[property] : "";
}