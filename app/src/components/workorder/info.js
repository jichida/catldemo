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
import Updataimg from "../../img/18.png";
import { Button } from 'antd';
import _ from 'lodash';
import dataworks from '../../test/workorder.json';

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
        let data = _.find(dataworks,(item)=>{
          return item.workerid === this.props.match.params.workid;
        });
        const colorred = {color: "#C00"};
        return (
            <div className="indexPage AppPage"
                style={{
                    backgroundSize: "100% 100%",
                    minHeight : `${window.innerHeight}px`
                }}>
                <div className="navhead">
                    <a className="back" onClick={()=>{this.props.history.goBack()}}></a>
                    <span className="title" style={{paddingRight : "30px"}}>待处理工单</span>
                </div>
                <div className="workerorderinfo">
                    <ul>
                        <li><span>车牌：沪A88888 </span><span>派单时间：2017.8.17</span></li>
                        <li><span>项目：ZZT-60KWH </span><span>故障类型：告警排查</span></li>
                        <li><span>电池厂商：C01</span></li>
                        <li><span className="full">工单来源：监控平台一级报警</span></li>
                        <li><span>电机厂商：AZ2</span><span>单号：CK21001</span></li>
                        <li><span>联系人：谢师傅</span><span>联系方式：139****8888</span></li>
                        <li><span className="full">当前位置：上海市浦东新区</span></li>
                        <li><span className="full">故障描述：8次报出一级报警，已通知路边司机停车维修</span></li>
                        <li><span className="full">备注：1小时内到达现场，3小时内处理故障</span></li>

                    </ul>
                    <div className="tit">维修反馈</div>
                    <div className="infoimg">
                        <img src={Updataimg} style={{width: "40px"}} />
                    </div>
                    <Button type="primary">确认并提交审单员</Button>
                </div>
            </div>
        );
    }
}
export default connect()(Page);
