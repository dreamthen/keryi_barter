/**
 * Created by yinwk on 2017/6/27.
 */
import React, {PropTypes} from "react";
import sizeConfig from "./configs/sizeConfig";
import typeConfig from "./configs/typeConfig";

export class Area extends React.Component {
    static propTypes = {
        size: PropTypes.string,
        type: PropTypes.string
    };

    constructor(props) {
        super(props);
        this.state = {}
    }

    typeToClass(){

    }

    sizeToClass(){

    }

    render() {
        return (
            <section
                contentEditable={true}
            >

            </section>
        )
    }
}