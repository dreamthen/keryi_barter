/**
 * Created by yinwk on 2017/6/14.
 */
import React, {PropTypes} from "react";
import "./keryi_barter_headPortrait.css";

export class HeadPortrait extends React.Component {
    static Proptypes = {
        //HeadPortrait组件头像地址
        headPortrait: PropTypes.string,
        //HeadPortrait组件头像className,外部传入样式表
        className: PropTypes.string
    };

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const {headPortrait, className} = this.props;
        return (
            <i
                className={className ? className : "keryi_barter_portrait"}
                style={{background: "url(" + headPortrait + ") no-repeat center center / cover border-box content-box"}}>

            </i>
        )
    }
}