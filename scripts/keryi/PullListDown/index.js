/**
 * Created by yinwk on 2017/6/27.
 */
import React, {PropTypes} from "react";
import "./keryi_barter_pullListDown.css";

class PullListDown extends React.Component {
    static propTypes = {
        //PullListDown下拉框组件标题
        title: PropTypes.string,
        //dataSource下拉框组件列表
        dataSource: PropTypes.array
    };

    constructor(props){
        super(props);
        this.state = {

        }
    }

    /**
     * 根据外部传入的列表数据,render渲染下拉框组件列表
     * @returns {XML}
     */
    renderDataSourceToPullList() {
        const {
            dataSource
        } = this.props;
        return dataSource.map(function pullList(pullItem, pullIndex) {
            return (
                <li>
                    {pullItem}
                </li>
            )
        });
    }

    /**
     *
     * @returns {XML}
     */
    render() {
        const {
            //根据外部传入的列表数据,render渲染下拉框组件列表
            renderDataSourceToPullList
        } = this;
        return (
            <div className="">
                <ul>
                    {/*根据外部传入的列表数据,render渲染下拉框组件列表*/}
                    {
                        renderDataSourceToPullList.bind(this)()
                    }
                </ul>
            </div>
        )
    }
}

export default PullListDown;