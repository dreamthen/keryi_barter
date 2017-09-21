/**
 * author yinwk
 * createTime 2017/9/12 17:56
 * description clown laugh at you~
 */
/**
 * 对个人页资源详情资源交换图片(第一张)以及标题内容列表进行整理,获取到整理后的图片列表
 * @param exchangePropertyList
 * @param matched
 * @param exchangeStatus
 */
export function getImageOrContentItemListConfig(exchangePropertyList, matched, exchangeStatus) {
    let list = exchangePropertyList;
    let FirstImgOrContentUrlsList = [];
    (list && list.length > 0) && list.forEach(function lister(listItem, listIndex) {
        let passiveResource = listItem["passiveResource"],
            titleProperty = passiveResource["title"],
            introProperty = passiveResource["intro"],
            closeJudgement = "I",
            imgUrlsProperty = eval("(" + passiveResource["imgUrls"] + ")"),
            likeCountProperty = passiveResource["likeCount"],
            priceWorthProperty = passiveResource["priceWorth"],
            userProperty = listItem["passiveUser"],
            statusProperty = listItem["status"],
            statusCloseJudgement = matched ? false : statusProperty !== closeJudgement;
        let itemProperty = {
            src: (imgUrlsProperty && imgUrlsProperty.length > 0) ? imgUrlsProperty[0]["src"] : "images/keryiBarter_headPortrait.png",
            title: titleProperty,
            intro: introProperty,
            likeCount: likeCountProperty,
            priceWorth: priceWorthProperty,
            user: userProperty,
            status: statusProperty,
            statusClose: statusCloseJudgement
        };
        FirstImgOrContentUrlsList.push(itemProperty);
    });
    return FirstImgOrContentUrlsList;
}