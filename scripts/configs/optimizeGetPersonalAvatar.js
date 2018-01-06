//接口API对象
import api from "./api";
//用于处理多个用户请求头像
export function optimizeGetPersonalAvatar(resourceList) {
    for (let resourceItem of resourceList) {
        resourceItem["personalAvatar"] = `${api.GET_PERSONAL_AVATAR}/${resourceItem["userId"]}/avatar`;
    }
    return resourceList;
}