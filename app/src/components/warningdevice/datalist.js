/**
 * Created by jiaowenhui on 2017/3/15.
 */
import React from 'react';
import { connect } from 'react-redux';
import { Table, Icon } from 'antd';
import _ from 'lodash';
import Searchimg from '../../img/13.png';
import Footer from "../index/footer.js";
import "../../css/antd.min.css";
import {jsondata_bms_alarm} from '../../test/bmsdata.js';

import {ui_alarm_elcurdevice} from '../../actions';

class Page extends React.Component {

    rowClick = (record, index, event)=>{
        console.log(record.DeviceId);
        this.props.dispatch(ui_alarm_elcurdevice(record.DeviceId));
    }

    render() {
        const {seltype} = this.props;
        let dataalarm = [];
        dataalarm = _.filter(jsondata_bms_alarm,(item) => {
          if(seltype === 0){
            return !item.isreaded;
          }
          if(seltype === 1){
            return item.isreaded;
          }
          return true;
        });
        const columns = [{
            title: '预警时间',
            dataIndex: 'time',
            key: 'time'
        }, {
            title: '车辆ID',
            dataIndex: 'DeviceId',
            key: 'deviceid'
        }, {
            title: '故障信息',
            dataIndex: 'errorinfo',
            key: 'errorinfo',
        }, {
            title: '所在位置',
            dataIndex: 'address',
            key: 'address',
        }];

        // const columns = _.map
        return (
            <Table columns={columns} dataSource={dataalarm} pagination={false} style={{flexGrow: 1}} onRowClick={this.rowClick} />
        );
    }
}

export default connect()(Page);
