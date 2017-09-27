/**
 * author yinwk
 * createTime 2017/9/26 16:50
 * description clown laugh at you~
 */
import React from "react";
import ReactDOM from "react-dom";
import Loading from "../Loading";

const wait = {
    loading: function (visible, text, iconClassName, title, wrapperClassName) {
        let waitContainer = document.createElement("main");
        document.body.appendChild(waitContainer);
        ReactDOM.render(
            <Loading
                loadingVisible={visible}
                loadingText={text}
                loadingIconClassName={iconClassName}
                loadingTitle={title}
                wrapperClassName={wrapperClassName}
            />, waitContainer
        )
    }
};

export default wait;