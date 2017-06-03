/**
 * Created by yinwk on 2017/6/3.
 */
import React, {PropTypes} from "react";
import sizeConfig from "./config/sizeConfig";
import typeConfig from "./config/typeConfig";
import "./keryi_barter_input.css";

export class Input extends React.Component {
    static propTypes = {
        type: PropTypes.string,
        size: PropTypes.string,
        className: PropTypes.string
    };

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const {className} = this.props;
        return (
            <div className="">
                <input
                    className={className}
                    type=""
                />
            </div>
        )
    }
}