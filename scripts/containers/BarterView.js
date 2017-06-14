/**
 * Created by yinwk on 2017/6/13.
 */
import React from "react";
import {connect} from "react-redux";
import {KeryiCard} from "../components/KeryiCard";
import {HeadPortrait} from "../components/HeadPortrait";
import "../../stylesheets/barter.css";

class BarterView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }


    render() {
        return (
            <div className="keryi_barter_main_container">
                <div className="keryi_barter_main_module keryi_barter_main_barterList">
                    <article className="keryi_barter_cardInfo">
                        <figure
                            className="keryi_barter_head_portrait"
                        >
                            <HeadPortrait
                                headPortrait="/images/login_bg.png"
                            />
                        </figure>
                        <KeryiCard
                            headPortrait="/images/login_bg.png"
                        />
                    </article>
                </div>
                <aside className="keryi_barter_main_module keryi_barter_main_aside">

                </aside>
            </div>
        )
    }
}

function select(state, ownProps) {
    return {}
}

export default connect(select)(BarterView);