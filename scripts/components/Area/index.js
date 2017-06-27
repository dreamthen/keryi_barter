/**
 * Created by yinwk on 2017/6/27.
 */
import React, {PropTypes} from "react";
import typeConfig from "./configs/typeConfig";
import sizeConfig from "./configs/sizeConfig";
import "./keryi_barter_area.css";

//在不传入编辑框尺寸size、size为空或者size类型错误时,Area组件编辑框className样式表用默认字体尺寸14px
const defaultSizeConfig = "default";
//在不传入编辑框类型type、type为空或者type类型错误时,Area组件编辑框className样式表用图文类型作为默认类型
const defaultTypeConfig = "imageText";

export class Area extends React.Component {
    static propTypes = {
        //Area组件编辑框尺寸:small,default和large,默认为default
        size: PropTypes.string,
        //Area组件编辑框类型:imageText,默认为imageText
        type: PropTypes.string,
        //Area组件编辑框className,外部传入样式表
        className: PropTypes.string,
        //Area组件编辑框默认提示语
        placeholder: PropTypes.string
    };

    constructor(props) {
        super(props);
        this.state = {}
    }

    /**
     * 根据外部传入的props size来设置Area组件编辑框className样式表
     * @returns {*}
     */
    sizeToClass() {
        const {size} = this.props;
        //在传入编辑框尺寸size且size类型为string时,Area组件编辑框用sizeConfig中的指定className样式表字体尺寸;在不传入编辑框尺寸size、size为空或者size类型错误时,Area组件编辑框className样式表用默认字体尺寸14px
        return size ? sizeConfig[size] : sizeConfig[defaultSizeConfig];
    }

    /**
     * 根据外部传入的props type来设置Area组件编辑框className样式表
     * @returns {*}
     */
    typeToClass(){
        const {type} = this.props;
        //在传入type且type类型为string时,Area组件编辑框用typeConfig中的指定className样式表类型;在不传入type、type为空或者type类型错误时,Area组件编辑框className样式表用图文类型作为默认类型
        return type ? typeConfig[type] : typeConfig[defaultTypeConfig];
    }

    /**
     * 根据外部传入的props className来设置Area组件编辑框className样式表
     * @returns {*}
     */
    outsideClassToClass(){
        const {
            //编辑框className,外部传入样式表
            className
        } = this.props;
        return className ? className : "";
    }

    /**
     * render渲染placeholder区域
     * @returns {XML}
     */
    renderPlaceHolder() {
        const {
            //Area组件编辑框默认提示语
            placeholder
        } = this.props;
        return (
            <div className="keryi_barter_placeholder_area">
                {placeholder}
            </div>
        )
    }

    render() {
        const {
            //根据外部传入的props size来设置Area组件编辑框className样式表
            sizeToClass,
            //根据外部传入的props type来设置Area组件编辑框className样式表
            typeToClass,
            //根据外部传入的props className来设置Area组件编辑框className样式表
            outsideClassToClass,
            //placeholder区域
            renderPlaceHolder
        } = this;
        return (
            <section className={typeToClass.bind(this)() + " " + sizeToClass.bind(this)()}>
                <article
                    contentEditable={true}
                    className={outsideClassToClass.bind(this)()}
                >

                </article>
                {/*placeholder区域*/}
                {renderPlaceHolder.bind(this)()}
            </section>
        )
    }
}