/**
 * Created by jiaowenhui on 2017/3/15.
 */
import React from 'react';
import { connect } from 'react-redux';
import map from 'lodash.map';
import Devicestar from "../../img/16.png";
import Moresetting from "../../img/17.png";
import Footer from "../index/footer.js";
import Datalist from "./tirepressuredata";
import MapPage from '../admincontent';
import {ui_mycar_showtype} from '../../actions';
import Searchimg from "../../img/22.png";
import SelectDevice from '../mydevice/selectdevice.js';

const innerHeight = window.innerHeight;

class Page extends React.Component {
    render() {
        const deviceid = this.props.match.params.deviceid;
        const mydevicecontentstyle = {pointerEvents: "none",background : "#FFF", flexGrow : "1"};
        return (
            <div
                className="mydevicePage AppPage customtable"
                style={{
                    background: "none",
                    minHeight : `${innerHeight}px`,
                    pointerEvents: "none",
                }}>
                <div className="navhead">
                    <a onClick={()=>{this.props.history.goBack()}} className="back"></a>
                    <div className="title" style={{paddingRight: "30px"}}>
                        胎压记录
                    </div>
                </div>
                <div className="mydevicecontent" style={mydevicecontentstyle}>
                    <div className="mydevicecontentlist">
                        <Datalist deviceid={deviceid} tableheight = {innerHeight-55-50} />
                    </div>
                </div>
            </div>
        );
    }
}

export default connect()(Page);
