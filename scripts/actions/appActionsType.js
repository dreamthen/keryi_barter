/**
 * Created by yinwk on 2017/6/26.
 */
//app页面action类型
const appActionsType = {
    //获取资源列表Action名称
    GET_RESOURCE_LIST: "GET_RESOURCE_LIST",
    //获取资源详情Action名称
    GET_RESOURCE_LIST_VIEW_DETAIL: "GET_RESOURCE_LIST_VIEW_DETAIL",
    //重置资源详情Action名称
    RESET_RESOURCE_LIST_VIEW_DETAIL: "RESET_RESOURCE_LIST_VIEW_DETAIL",
    //获取资源详情用户头像Action名称
    GET_USER_HEAD_PORTRAIT_VIEW_DETAIL: "GET_USER_HEAD_PORTRAIT_VIEW_DETAIL",
    //重置对话框状态Action名称
    RESET_MODAL_STATUS: "RESET_MODAL_STATUS",
    //选择资源类型初始距离添加选择资源类型输入框左边的位置
    CHANGE_INIT_DISTANCE: "CHANGE_INIT_DISTANCE",
    //选择资源类型下拉框距离添加选择资源类型输入框左边的位置Action名称
    CHANGE_DISTANCE: "CHANGE_DISTANCE",
    //选择目标资源类型下拉框距离添加选择目标资源类型输入框左边的位置Action名称
    CHANGE_TARGET_DISTANCE: "CHANGE_TARGET_DISTANCE",
    //选择资源类型下拉框重置距离添加选择资源类型输入框左边的位置Action名称
    RESET_DISTANCE: "RESET_DISTANCE",
    //选择目标资源类型下拉框重置距离添加选择目标资源类型输入框左边的位置Action名称
    RESET_TARGET_DISTANCE: "RESET_TARGET_DISTANCE",
    //改变资源描述输入框上传图片组Action名称
    CHANGE_IMAGE_LIST: "CHANGE_IMAGE_LIST",
    //改变选择资源类型输入框模糊搜索标签组Action名称
    CHANGE_TAG_LIST: "CHANGE_TAG_LIST",
    //改变选择资源类型输入框中的标签组Action名称
    SET_TAG_CONFIG: "SET_TAG_CONFIG",
    //改变选择目标资源类型输入框中的标签组Action名称
    SET_TARGET_TAG_CONFIG: "SET_TARGET_TAG_CONFIG",
    //改变选择资源类型id标签组Action名称
    SET_TAG_ID_CONFIG: "SET_TAG_ID_CONFIG",
    //改变选择目标资源类型id标签组Action名称
    SET_TARGET_TAG_ID_CONFIG: "SET_TARGET_TAG_ID_CONFIG",
    //获取个人页资源列表Action名称
    GET_PERSONAL_RESOURCE_LIST_ACTION: "GET_PERSONAL_RESOURCE_LIST_ACTION",
    //获取个人页资源详情用户头像Action名称
    GET_PERSONAL_USER_HEAD_PORTRAIT_VIEW_DETAIL: "GET_PERSONAL_USER_HEAD_PORTRAIT_VIEW_DETAIL",
    //保存个人页资源详情Action名称
    REMEMBER_PERSONAL_RESOURCE_LIST_VIEW_DETAIL: "REMEMBER_PERSONAL_RESOURCE_LIST_VIEW_DETAIL",
    //获取个人页资源详情Action名称
    GET_PERSONAL_RESOURCE_LIST_VIEW_DETAIL: "GET_PERSONAL_RESOURCE_LIST_VIEW_DETAIL",
    //获取个人页资源详情资源交换列表Action名称
    GET_PERSONAL_RESOURCE_LIST_VIEW_DETAIL_ITEM_LIST: "GET_PERSONAL_RESOURCE_LIST_VIEW_DETAIL_ITEM_LIST",
    //改变个人信息编辑状态,使得其可编辑Action名称
    CHANGE_PERSONAL_INFORMATION: "CHANGE_PERSONAL_INFORMATION",
    //更新并保存个人信息并改变个人信息编辑状态,使得其不可编辑Action名称
    SAVE_CHANGE_PERSONAL_INFORMATION: "SAVE_CHANGE_PERSONAL_INFORMATION",
    //改变个人信息编辑状态,使得其不可编辑Action名称
    CLOSE_CHANGE_PERSONAL_INFORMATION: "CLOSE_CHANGE_PERSONAL_INFORMATION",
    //改变个人信息部分距离父级元素顶部的高度,使个人信息页面主体信息随着窗口滚动而滚动Action名称
    CHANGE_PERSONAL_INFORMATION_SCROLL_TOP: "CHANGE_PERSONAL_INFORMATION_SCROLL_TOP",
    //重置个人页资源详情Action名称
    RESET_PERSONAL_RESOURCE_LIST_VIEW_DETAIL: "RESET_PERSONAL_RESOURCE_LIST_VIEW_DETAIL",
    //显示个人页资源详情对话框footer底部区域Action名称
    OPEN_PERSONAL_VIEW_DETAIL_FOOTER: "OPEN_PERSONAL_VIEW_DETAIL_FOOTER",
    //隐藏个人页资源详情对话框footer底部区域Action名称
    CLOSE_PERSONAL_VIEW_DETAIL_FOOTER: "CLOSE_PERSONAL_VIEW_DETAIL_FOOTER",
    //个人页资源详情资源交换列表显示可关闭标志位Action名称
    OPEN_PERSONAL_ITEM_CLOSE: "OPEN_PERSONAL_ITEM_CLOSE",
    //个人页资源详情资源交换列表隐藏可关闭标志位Action名称
    CLOSE_PERSONAL_ITEM_CLOSE: "CLOSE_PERSONAL_ITEM_CLOSE",
    ADD_BARTER_RESOURCE: "ADD_BARTER_RESOURCE"
};

//导出app页面action类型
export default appActionsType;