
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

      return (

            <div className="warningPage devicePage deviceinfoPage">

                <div className="appbar">
                    <i className="fa fa-angle-left back" aria-hidden="true" onClick={()=>{this.props.history.goBack()}}></i>
                    <div className="title">充电桩详情</div>
                </div>

                <div className="lists deviceinfolist">
                </div>

            </div>
        );
    }
}


const DeviceComponentWithPProps = translate('showdevice')(Page);
export default connect()(DeviceComponentWithPProps);
