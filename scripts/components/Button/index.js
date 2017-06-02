/**
 * Created by yinwk on 2017/6/2.
 */
import React, {PropTypes} from "react";
import sizeConfig from "./config/sizeConfig";
import "./keryi_barter_button.css";

/**
 * keryi_barter Button按钮组件
 */
export class Button extends React.Component {
    static propTypes = {
        size: PropTypes.string.isRequired,
        className: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const {className, children, size, onClick} = this.props;
        return (
            <div className="keryi_barter_button">
                <button
                    className={className}
                    onClick={onClick}
                    style={
                        sizeConfig.map((sizeItem, index) => {
                            if (sizeItem["key"] === size) {
                                return sizeItem["value"]
                            }
                        })
                    }
                >
                    {children}
                </button>
            </div>
        )
    }
}