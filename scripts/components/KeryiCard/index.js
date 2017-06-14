/**
 * Created by yinwk on 2017/6/14.
 */
import React, {PropTypes} from "react";
import "./keryi_barter_card.css";

export class KeryiCard extends React.Component {
    static Proptypes = {
        //KeryiCard组件卡片用户名
        userName: PropTypes.string,
        //KeryiCard组件卡片上传图片数组
        imageList: PropTypes.array,
        //KeryiCard组件卡片资源介绍
        introduce: PropTypes.string,
        //KeryiCard组件卡片资源类型
        tagList: PropTypes.array,
        //KeryiCard组件卡片资源被需要数目
        needParty: PropTypes.number
    };

    constructor(props) {
        super(props);
        this.state = {}
    }



    /**
     * render渲染card主要内容
     */
    renderCardInfo() {
        return (
            <section>

            </section>
        )
    }

    render() {
        const {renderCardInfo} = this;
        return (
            <div>

            </div>
        )
    }
}