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
import {jsondata_bms_mypro} from '../../test/bmsdata.js';
import {ui_mycar_selcurdevice} from '../../actions';
import { withRouter } from 'react-router-dom';

class Page extends React.Component {

    rowClick = (record, index, event)=>{
        console.log(record.proid);
        this.props.history.push(`/project/${record.proid}`);
        // this.props.dispatch(ui_mycar_selcurdevice(record.carid));
        
    }
    render() {

        const data =[{  
            "key" : 0,
            "proname": "ZZT-12KWH",
            "devicenum": "3",
            "proid": "1602010003",
            "powcreate": "3",
            "engincreate": "34",
            "controlcreate": "22"
        }, {
            "key" : 1,
            "proname": "ZZT-60KWH",
            "devicenum": "3",
            "proid": "1602000002",
            "powcreate": "3",
            "engincreate": "34",
            "controlcreate": "22"
        }, {
            "key" : 3,
            "proname": "ZZT-89KWH",
            "devicenum": "40",
            "proid": "1602010001",
            "powcreate": "3",
            "engincreate": "34",
            "controlcreate": "22"
        }, {
            "key" : 4,
            "proname": "ZZT-287KWH",
            "devicenum": "3",
            "proid": "1602010007",
            "powcreate": "3",
            "engincreate": "34",
            "controlcreate": "22"
        }]

        const columns = [{
            title: '项目',
            dataIndex: 'proname',
            key: 'proname'
        }, {
            title: '车辆数',
            dataIndex: 'devicenum',
            key: 'devicenum',
        }, {
            title: '电池厂商',
            dataIndex: 'powcreate',
            key: 'powcreate',
        }, {
            title: '电机厂商',
            dataIndex: 'engincreate',
            key: 'engincreate',
        },{
            title: '电控厂商',
            dataIndex: 'controlcreate',
            key: 'controlcreate',
        }];
        return (
            <Table columns={columns} dataSource={data} pagination={false} style={{flexGrow: 1}} onRowClick={this.rowClick} />
        );
    }
}

Page = withRouter(Page);
export default connect()(Page);
