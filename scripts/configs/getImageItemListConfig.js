/**
 * author yinwk
 * createTime 2017/9/12 17:56
 * description clown laugh at you~
 */
/**
 * 对个人页资源详情资源交换图片(第一张)列表进行整理,获取到整理后的图片列表
 * @param exchangePropertyList
 */
export function getImageItemListConfig(exchangePropertyList) {
    let list = exchangePropertyList;
    let FirstImgUrlsList = [];
    list.forEach(function lister(listItem, listIndex) {
        let imgUrlsProperty = eval("(" + listItem["imgUrls"] + ")");
        FirstImgUrlsList.push((imgUrlsProperty && imgUrlsProperty.length > 0) ? imgUrlsProperty[0] : {src: "images/keryiBarter_headPortrait.png"});
    });
    return FirstImgUrlsList;
}