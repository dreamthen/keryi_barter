/**
 * Created by yinwk on 2017/6/18.
 */
//Card组件卡片样式表设置
const keryiCardConfig = {
    //Card组件卡片"更多图片"设置过渡动画以及透明度
    loading: "keryi_barter_loading_spinAnimation",
    //Card组件卡片"更多图片"设置消失(透明度为0)
    loading_disAppear: "keryi_barter_loading_spinAnimation keryi_barter_loading_spinAnimation_disAppear",
    //Card组件卡片底部资源统计图标组
    card_function: [{
        title: "需要",
        className: "iconfontKeryiBarter keryiBarter-exchange"
    }, {
        title: "喜欢",
        className: "iconfontKeryiBarter keryiBarter-like"
    }]
};

//导出Card组件卡片样式表设置
export default keryiCardConfig;