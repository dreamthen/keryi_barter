/**
 * author: yinwk
 * createTime: 2017/7/29 20:28
 * description: clown laugh at you~
 */
/**
 * 将数组对象转化为数组对象字符串
 * @param array
 * @returns string
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
            arrayToString += ",";
        }
    });
    //返回
    return "[" + arrayToString + "]";
}

/**
 * 去除文件路径,只留文件名称
 * @param array
 * @returns string
 */
export function removalPath(array) {
    return array.map(function arraier(item, index) {
        return item["src"].slice((array.lastIndexOf("/") + 1));
    });
}