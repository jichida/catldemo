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
    carid: '1',//车牌
    vin: '0012',//vin
    year: "3", //运营年限
    mileage: "34", //总里程
    baoyou: "22", //容量保有率
    point: "常州武进", //当前位置
}, {
    carid: '1',//车牌
    vin: '0012',//vin
    year: "3", //运营年限
    mileage: "34", //总里程
    baoyou: "22", //容量保有率
    point: "常州武进", //当前位置
}, {
    carid: '1',//车牌
    vin: '0012',//vin
    year: "3", //运营年限
    mileage: "34", //总里程
    baoyou: "22", //容量保有率
    point: "常州武进", //当前位置
}];

class Page extends React.Component {

    render() {
        const columns = [{
            title: '工单号',
            dataIndex: 'workerid',
            key: 'workerid'
        }, {
            title: '工单状态',
            dataIndex: 'status',
            key: 'status',
        }, {
            title: '车牌',
            dataIndex: 'carid',
            key: 'carid',
        }, {
            title: '项目',
            dataIndex: 'proname',
            key: 'proname',
        },{
            title: '处理人员',
            dataIndex: 'workername',
            key: 'workername',
        }, {
            title: '原因',
            key: 'reason'
        }];
        return (
            <Table columns={columns} dataSource={data} pagination={false} style={{flexGrow: 1}} />
        );
    }
}

export default connect()(Page);
