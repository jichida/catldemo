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
            <Table columns={columns} dataSource={data} pagination={false} style={{flexGrow: 1}} />
        );
    }
}

export default connect()(Page);
