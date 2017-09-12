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

const data = [{

    time: '2017/09/07',//预警时间
    deviceid: '0012',//预警设备
    errorinfo: "1级警报", //故障信息
    address: "上海浦东", //地理信息
}, {
    time: '2017/09/07',//预警时间
    deviceid: '0012',//预警设备
    errorinfo: "1级警报", //故障信息
    address: "上海浦东", //地理信息
}, {
    time: '2017/09/07',//预警时间
    deviceid: '0012',//预警设备
    errorinfo: "1级警报", //故障信息
    address: "上海浦东", //地理信息
}, {
    time: '2017/09/07',//预警时间
    deviceid: '0012',//预警设备
    errorinfo: "1级警报", //故障信息
    address: "上海浦东", //地理信息
}];

class Page extends React.Component {

    render() {
        const columns = [{
            title: '预警时间',
            dataIndex: 'time',
            key: 'time'
        }, {
            title: '车辆ID',
            dataIndex: 'deviceid',
            key: 'deviceid',
        }, {
            title: '故障信息',
            dataIndex: 'errorinfo',
            key: 'errorinfo',
        }, {
            title: '所在位置',
            dataIndex: 'address',
            key: 'address',
        }];
        return (
            <Table columns={columns} dataSource={data} pagination={false} style={{flexGrow: 1}} />
        );
    }
}

export default connect()(Page);
