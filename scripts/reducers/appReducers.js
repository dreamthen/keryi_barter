/**
 * Created by yinwk on 2017/6/26.
 */
import appActionsType from "../actions/appActionsType";
import insteadState from "../configs/insteadState";

const defaultState = {
    //对话框标题
    title: "hello,world",
    //对话框描述
    description: "word come true~"
};

export function appReducers(state = defaultState, actions) {
    let type = actions.type,
        newState = actions.payload;
    switch (type) {
        case appActionsType["ADD_BARTER_RESOURCE"]:
            return state;
    }
    return state;
}