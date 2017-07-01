/**
 * Created by yinwk on 2017/7/1.
 */
//获取光标位置
export function getFocusPosition(contentEdit) {
    //获取到input或者div contentEditable的光标区域
    let selection = window.getSelection();
    //从光标初始点也是结束点开始计算
    let range = selection.getRangeAt(0);
    //获取到光标距离窗口顶部、右边、底部和左边的位置
    let rect = range.getBoundingClientRect();
    return {
        //获取到光标距离窗口顶部的位置
        top: rect.top,
        //获取到光标距离窗口底部的位置
        bottom: rect.top,
        //获取到光标距离窗口左边的位置
        left: rect.left,
        //获取到光标距离窗口右边的位置
        right: rect.right
    }
}