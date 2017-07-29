/**
 * Created by yinwk on 2017/6/26.
 */
//app页面action类型
const appActionsType = {
    //获取资源列表Action名称
    GET_RESOURCE_LIST: "GET_RESOURCE_LIST",
    //重置对话框状态Action名称
    RESET_MODAL_STATUS: "RESET_MODAL_STATUS",
    //选择资源类型初始距离添加选择资源类型输入框左边的位置
    CHANGE_INIT_DISTANCE: "CHANGE_INIT_DISTANCE",
    //选择资源类型下拉框距离添加选择资源类型输入框左边的位置Action名称
    CHANGE_DISTANCE: "CHANGE_DISTANCE",
    //选择资源类型下拉框重置距离添加选择资源类型输入框左边的位置Action名称
    RESET_DISTANCE: "RESET_DISTANCE",
    //改变资源描述输入框上传图片组Action名称
    CHANGE_IMAGE_LIST: "CHANGE_IMAGE_LIST",
    //改变选择资源类型输入框模糊搜索标签组Action名称
    CHANGE_TAG_LIST: "CHANGE_TAG_LIST",
    //改变选择资源类型输入框中的标签组Action名称
    SET_TAG_CONFIG: "SET_TAG_CONFIG",
    ADD_BARTER_RESOURCE: "ADD_BARTER_RESOURCE"
};

//导出app页面action类型
export default appActionsType;