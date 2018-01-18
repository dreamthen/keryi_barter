/**
 * Created by yinwk on 2017/6/13.
 */
//barter资源列表组件BarterView
import BarterView from "../containers/BarterView";
//personal个人信息组件PersonalView
import PersonalView from "../containers/PersonalView";

/**
 * keryi_barter路由路径以及路由组件集成
 * @type {[*]}
 */
const routesMode = [
    //barter资源列表路由路径和路由组件BarterView
    {
        path: "barter",
        component: BarterView,
        icon: "iconfontKeryiBarter keryiBarter-barterHome",
        title: "首页"
    },
    //personal个人信息路由路径和路由组件PersonalView
    {
        path: "personal",
        component: PersonalView,
        icon: "iconfontKeryiBarter keryiBarter-barterPersonal",
        title: "个人信息"
    }
];

//导出集成的keryi_barter路由路径以及路由组件
export default routesMode;