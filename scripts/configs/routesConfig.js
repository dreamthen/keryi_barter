/**
 * Created by yinwk on 2017/6/13.
 */
import React from "react";
import {Route, IndexRedirect} from "react-router";
import routesMode from "./routesConfigMode";
import AppView from "../containers/AppView";

//集成的keryi_barter路由组件
const routes = (
    //顶部路由配置(路由路径和路由组件AppView)
    <Route
        path="/"
        component={AppView}
    >
        {/*自动跳转默认路由路径:集成的keryi_barter路由路径的第一个数组元素的path属性:/barter*/}
        <IndexRedirect to={routesMode[0]["path"]}/>
        {
            //集成的keryi_barter路由路径以及路由组件遍历,返回子路由的配置(子路由路径和路由组件BarterView)
            routesMode.map((routeItem, routeIndex) => {
                return (
                    <Route
                        path={routeItem["path"]}
                        component={routeItem["component"]}
                    />
                )
            })
        }
    </Route>
);

//导出集成的keryi_barter路由组件
export default routes;