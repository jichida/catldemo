
/**
 * Created by jiaowenhui on 2017/7/28.
    车辆详情
 */
import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import RaisedButton from 'material-ui/RaisedButton';
import {ui_showhistoryplay,ui_showmenu,searchbatteryalarm_request} from '../actions';
import translate from 'redux-polyglot/translate';
import TableComponents from "./table.js";
import TreeSearchmessage from './search/searchmessage';
import { Button } from 'antd';
import {gmap_chargingpile} from '../test/bmsdata';

class Page extends React.Component {

    render(){

      let id = this.props.match.params.id;
      let chargingpileinfo = [id];
      console.log(`${JSON.stringify(chargingpileinfo)}`);

      const datapower = [
        {
            name:'采集时间',
            value: "2017-09-13 18:16:57",
        },
        {
            name:'额定功率',
            value : "220W",
        },
        {
            name:'额定电压',
            value : "20V"
        },
        {
            name:'最大输出电流',
            value : "50A"
        },
        {
            name:'定位状态',
            value : "有效定位"
        },
        {
            name:'纬度信息',
            value : "北纬13.9"
        },
        {
            name:'经度信息',
            value : "东经21.9"
        },
        {
            name:'经度',
            value : "118.159387"
        },
        {
            name:'纬度',
            value : "24.499292"
        },
        {
            name:'位置描述',
            value : ""
        },
        {
            name:'当前状态',
            value : "工作"
        },
        {
            name:'累计充电次数',
            value : "2次"
        },
        {
            name:'累计充电量',
            value : "234MWh"
        },
        {
            name:'累计放电量',
            value : "12313MWh"
        },
        {
            name:'充电模式',
            value : "交流"
        },
        {
            name:'绝缘阻抗',
            value : ""
        },
        {
            name:'当前电流',
            value : "2A"
        },
        {
            name:'当前功率',
            value : "100KW"
        },
        {
            name:'开机时长',
            value : "200H"
        }

    ];

    return (

            <div className="warningPage devicePage deviceinfoPage">

                <div className="appbar">
                    <i className="fa fa-angle-left back" aria-hidden="true" onClick={()=>{this.props.history.goBack()}}></i>
                    <div className="title">充电桩详情</div>
                </div>

                <div className="lists deviceinfolist">
                    {
                        _.map(datapower,(item,i)=>{
                            return (
                                <div className="li" key={i}>
                                    <div>
                                    <div className="name">{item.name}</div><div className="text">{item.value}</div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

            </div>
        );
    }
}


const DeviceComponentWithPProps = translate('showdevice')(Page);
export default connect()(DeviceComponentWithPProps);
