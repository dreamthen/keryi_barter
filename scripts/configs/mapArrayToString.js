/**
 * author: yinwk
 * createTime: 2017/7/29 20:28
 * description: clown laugh at you~
 */
/**
 * 将数组对象转化为数组对象字符串
 * @param array
 */
export function mapArrayToString(array) {
    let arrayToString = "";
    //数组的长度
    let length = array.length;
    array.forEach(function arraier(item, index) {
        for (let objItem in item) {
            arrayToString += "{\"" + objItem + "\":\"" + item[objItem] + "\"}";
        }
        if (index !== (length - 1)) {
            arrayToString += "|";
        }
    });
    //返回
    return "[" + arrayToString + "]";
}