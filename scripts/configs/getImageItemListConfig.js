/**
 * author yinwk
 * createTime 2017/9/12 17:56
 * description clown laugh at you~
 */
/**
 * 对个人页资源详情资源交换图片(第一张)以及标题内容列表进行整理,获取到整理后的图片列表
 * @param exchangePropertyList
 */
export function getImageOrContentItemListConfig(exchangePropertyList) {
    let list = exchangePropertyList;
    let FirstImgOrContentUrlsList = [];
    (list && list.length > 0) && list.forEach(function lister(listItem, listIndex) {
        let itemProperty = {},
            passiveResource = listItem["passiveResource"],
            titleProperty = passiveResource["title"],
            introProperty = passiveResource["intro"],
            imgUrlsProperty = eval("(" + passiveResource["imgUrls"] + ")");
        itemProperty.src = (imgUrlsProperty && imgUrlsProperty.length > 0) ? imgUrlsProperty[0]["src"] : "images/keryiBarter_headPortrait.png";
        itemProperty.title = titleProperty;
        itemProperty.intro = introProperty;
        FirstImgOrContentUrlsList.push(itemProperty);
    });
    return FirstImgOrContentUrlsList;
}