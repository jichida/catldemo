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
import _ from 'lodash';
import {jsondata_bms_workorder} from '../../test/bmsdata.js';


class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            innerWidth : window.innerWidth,
            selstatus : 0,
            selworkorder : 0
        };
    }
    indexnavclick=(v)=>{
        console.log(v);
        this.setState({selstatus : v});
    }
    selworkorders=(v)=>{
        this.setState({selworkorder : v});
    }
    render() {
        const {showmenu,showhistoryplay,showdistcluster,showhugepoints,p} = this.props;
        const pushurl = (name)=>{
            this.props.history.push(name);
        }
        let countdone = _.filter(jsondata_bms_workorder,(item)=>{
          return item.isdone;
        });
        let uncountdone = _.filter(jsondata_bms_workorder,(item)=>{
          return !item.isdone;
        });
        const colorred = {color: "#C00"};
        return (
            <div className="indexPage AppPage"
                style={{
                    backgroundSize: "100% 100%",
                    minHeight : `${window.innerHeight}px`
                }}>
                <div className="navhead">
                    <a className="userlnk" onClick={()=>{this.props.history.push("/usercenter")}}><img src={Userlnk} /></a>
                    <span className="title">工单处理</span>
                    <a className="setting" onClick={()=>{this.props.history.push("/setting")}}><img src={Setting} /></a>
                </div>
                <div className="workorderlist">
                    <div className="contenttit">过去7天内工共发生<span style={colorred}>{`${jsondata_bms_workorder.length}`}</span>
                    起故障,已处理<span style={colorred}>{`${countdone.length}`}</span>起,未处理<span style={colorred}>{`${uncountdone.length}`}</span>起</div>
                    <div className="workordernav">
                        <span className={this.state.selworkorder===0?"sel":""} onClick={this.selworkorders.bind(this,0)}>待处理</span>
                        <span className={this.state.selworkorder===1?"sel":""} onClick={this.selworkorders.bind(this,1)}>已完成</span>
                        <span className={this.state.selworkorder===2?"sel":""} onClick={this.selworkorders.bind(this,2)}>所有工单</span>
                    </div>
                    <Datalist selworkorder={this.state.selworkorder}/>
                </div>
                <Footer sel={3} />
            </div>
        );
    }
}
export default connect()(Page);
