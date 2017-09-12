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

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showtype : 0
        };
    }
    
    render() {
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
                    <div><span>数据包信号</span><span>ddd</span></div>
                    <div><span>箱体累加电压</span><span>ddd</span></div>
                    <div><span>真实SOC</span><span>ddd</span></div>
                    <div><span>最高单体电压</span><span>ddd</span></div>
                    <div><span>最低单体电压</span><span>ddd</span></div>
                    <div><span>最高单体温度</span><span>ddd</span></div>
                    <div><span>平均单体温度</span><span>ddd</span></div>
                    <div><span>最低温度所在CSC号</span><span>ddd</span></div>
                </div>
            </div>
        );
    }
}

export default connect()(Page);
