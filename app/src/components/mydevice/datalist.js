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
import {jsondata_bms_mydevice} from '../../test/bmsdata.js';
import {ui_mycar_selcurdevice} from '../../actions';
import { withRouter } from 'react-router-dom';

class Page extends React.Component {

    rowClick = (record, index, event)=>{
        console.log(record.carid);
        // this.props.dispatch(ui_mycar_selcurdevice(record.carid));
        this.props.history.push(`/deviceinfo/${record.carid}`);
    }

    render() {
        const columns = [{
            title: '车牌',
            dataIndex: 'carid',
            key: 'carid'
        }, {
            title: 'VIN',
            dataIndex: 'vin',
            key: 'vin',
        }, {
            title: '运营年限',
            dataIndex: 'year',
            key: 'year',
        }, {
            title: '总里程',
            dataIndex: 'mileage',
            key: 'mileage',
        },{
            title: '容量保有率',
            dataIndex: 'baoyou',
            key: 'baoyou',
        }, {
            title: '位置',
            key: 'point'
        }];
        return (
            <Table columns={columns} dataSource={jsondata_bms_mydevice} pagination={false} style={{flexGrow: 1}} onRowClick={this.rowClick} />
        );
    }
}
Page = withRouter(Page);
export default connect()(Page);
