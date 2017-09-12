/**
 * Created by jiaowenhui on 2017/3/15.
 */
import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import Devicestar from "../../img/16.png";
import Moresetting from "../../img/17.png";
import Searchimg from '../../img/13.png';
import Footer from "../index/footer.js";
import { Button } from 'antd';
import {
    ui_index_addcollection,
    ui_index_unaddcollection
} from '../../actions';

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showtype : 0
        };
    }

    render() {
        const {carcollections,g_devicesdb} = this.props;
        let deviceid = this.props.match.params.deviceid;
        let isincollections = false;
        _.map(carcollections,(id)=>{
            if(id === deviceid){
                isincollections = true;
            }
        });
        return (
            <div className="mydevicePage AppPage"
                style={{
                    backgroundSize: "100% 100%",
                    minHeight : `${window.innerHeight}px`
                }}>
                <div className="navhead">
                    <a onClick={()=>{this.props.history.goBack()}} className="back"></a>
                    <span className="title">车辆详情</span>
                    <a className="moresetting"><img src={Moresetting} width="30" /></a>
                </div>
                <div className="deviceinfocontent">
                    <div><span>车辆id</span><span>{`${deviceid}`}</span></div>
                    <div><span>数据包信号</span><span>ddd</span></div>
                    <div><span>箱体累加电压</span><span>ddd</span></div>
                    <div><span>真实SOC</span><span>ddd</span></div>
                    <div><span>最高单体电压</span><span>ddd</span></div>
                    <div><span>最低单体电压</span><span>ddd</span></div>
                    <div><span>最高单体温度</span><span>ddd</span></div>
                    <div><span>平均单体温度</span><span>ddd</span></div>
                    <div><span>最低温度所在CSC号</span><span>ddd</span></div>
                    <div className="mydevicebtn">
                        {!isincollections &&
                        <Button type="primary" icon="star" onClick={()=>{
                            this.props.dispatch(ui_index_addcollection(deviceid));
                          }
                        }>收藏车辆</Button>}
                        {isincollections &&
                        <Button type="primary" icon="star" onClick={()=>{
                            this.props.dispatch(ui_index_unaddcollection(deviceid));
                          }
                        }>取消收藏车辆</Button>}
                        <Button icon="play-circle-o" style={{background : "#5cbeaa", color: "#FFF"}} onClick={()=>{console.log("轨迹回放")}}>轨迹回放</Button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({device}) => {
    const {carcollections,g_devicesdb} = device;
    return {carcollections,g_devicesdb};
}

export default connect(mapStateToProps)(Page);
