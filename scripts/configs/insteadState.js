/**
 * Created by yinwk on 2017/6/15.
 */
//redux reducer更换state状态对象
const insteadState = {
    //redux reducer更换对象state状态属性(方法)
    insteadObjState(state, newState) {
        return Object.assign({}, state, newState);
    },
    //redux reducer删除数组元素并更换对象state状态属性
    insteadArrayRemoveState(state, newState, type, filter) {
        newState[type] = state[type].filter(filter);
        return this.insteadObjState(state, newState);
    }
};

//导出redux reducer更换state状态对象
export default insteadState;