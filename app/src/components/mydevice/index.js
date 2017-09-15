/**
 * Created by jiaowenhui on 2017/3/15.
 */
import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import Devicestar from "../../img/16.png";
import Moresetting from "../../img/17.png";
import Footer from "../index/footer.js";
import Datapro from "./datapro";
import MapPage from '../admincontent';
import {ui_mycar_showtype} from '../../actions';
import {jsondata_bms_mydevice} from '../../test/bmsdata.js';
import Searchimg from "../../img/22.png";

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchonfocus : false
        };
    }
    onfocusinput=()=>{
        this.setState({searchonfocus : true});
    }
    onblurinput=()=>{
        this.setState({searchonfocus : false})
    }
    render() {
        const height =  window.innerHeight - 70 - 60 - 66.08;
        const mydevicecontentstyle = this.props.ui_mydeivce_showtype===0?{pointerEvents: "none",background : "none"}:{};
        return (
            <div className="mydevicePage AppPage"
                style={{
                    background: "none",
                    minHeight : `${window.innerHeight}px`,
                    pointerEvents: "none",
                }}>
                <div className="navhead">
                    <div className="title">
                        车辆信息
                    </div>
                </div>
                <div className="mydevicecontentlist">
                    <div className="devicenum"><span>联网车辆：{`${jsondata_bms_mydevice.length}`}辆</span>
                    <span className='c'>运行车辆：{`${jsondata_bms_mydevice.length}`}辆</span>
                    <span>故障车辆：1辆</span></div>
                    <Datapro />
                </div>
                <Footer sel={2} />
            </div>
        );
    }
}
const data = ({app}) => {
  const {ui_mydeivce_showtype} = app;
  return {ui_mydeivce_showtype};
}
export default connect(data)(Page);
