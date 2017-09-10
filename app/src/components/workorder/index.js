/**
 * Created by jiaowenhui on 2017/3/15.
 */
import React from 'react';
import { connect } from 'react-redux';
import Avatar from "../../img/2.png"; 
import Userlnk from "../../img/11.png";
import Setting from "../../img/12.png";
import Footer from "../index/footer.js";
import Collectiondevice from "../collectiondevice";
import Datalist from "./datalist";


class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            innerWidth : window.innerWidth,
            selstatus : 0
        };
    }
    indexnavclick=(v)=>{
        console.log(v);
        this.setState({selstatus : v});
    }
    
    render() {
        const {showmenu,showhistoryplay,showdistcluster,showhugepoints,p} = this.props;
        const pushurl = (name)=>{
            this.props.history.push(name);
        }
        const colorred = {color: "#C00"};
        return (
            <div className="indexPage AppPage"
                style={{
                    backgroundSize: "100% 100%",
                    minHeight : `${window.innerHeight}px`
                }}>
                <div className="navhead">
                    <a className="userlnk"><img src={Userlnk} /></a>
                    <span className="title">工单处理</span>
                    <a className="setting"><img src={Setting} /></a>
                </div>
                <div className="workorderlist">
                    <div className="contenttit">过去7天内工共发生<span style={colorred}>50</span>起故障,已处理<span style={colorred}>10</span>起,未处理<span style={colorred}>20</span>起</div>
                    <Datalist />
                </div>
                <Footer sel={3} />
            </div>
        );
    }
}
export default connect()(Page);
