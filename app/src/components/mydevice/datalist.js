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
import data from '../../test/bms_mydevice.json';
import {ui_mycar_selcurdevice} from '../../actions';

class Page extends React.Component {

    rowClick = (record, index, event)=>{
        console.log(record.carid);
        this.props.dispatch(ui_mycar_selcurdevice(record.carid));
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
            <Table columns={columns} dataSource={data} pagination={false} style={{flexGrow: 1}} onRowClick={this.rowClick} />
        );
    }
}

export default connect()(Page);
