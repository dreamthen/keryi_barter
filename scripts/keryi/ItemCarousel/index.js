/**
 * author yinwk
 * createTime 2017/9/06 22:32
 * description clown laugh at you~
 */
import React, {PropTypes} from "react";

/**
 * keryi_barter ItemCarousel元素轮播器组件
 */
class ItemCarousel extends React.Component {
    static propTypes = {
        itemList: PropTypes.array,
        split: PropTypes.number,
        className: PropTypes.string
    };

    constructor(props) {
        super(props);
        this.state = {}
    }

    componentWillReceiveProps() {

    }

    render() {
        return (
            <section>

            </section>
        )
    }
}

//导出keryi_barter ItemCarousel元素轮播器组件
export default ItemCarousel;