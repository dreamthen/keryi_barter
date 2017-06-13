/**
 * Created by yinwk on 2017/6/13.
 */
//barter列表组件BarterView
import BarterView from "../containers/BarterView";

/**
 * keryi_barter路由路径以及路由组件集成
 * @type {[*]}
 */
const routesMode = [
    //barter列表路由路径和路由组件BarterView
    {
        path: "/barter",
        component: BarterView
    }
];

//导出集成的keryi_barter路由路径以及路由组件
export default routesMode;