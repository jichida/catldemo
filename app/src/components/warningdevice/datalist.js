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
    key: '1',
    deviceid: '0012',//设备ID
    pack: "PK0023", //PACK号
    pdb: "PDB23", //pdb
    liaohao: "22", //料号
    city: "常州武进", //省市区
}, {
    key: '2',
    deviceid: '0013',//设备ID
    pack: "PK0024", //PACK号
    pdb: "PDB23", //pdb
    liaohao: "22", //料号
    city: "常州武进", //省市区
}, {
    key: '3',
    deviceid: '0014',//设备ID
    pack: "PK0026", //PACK号
    pdb: "PDB23", //pdb
    liaohao: "22", //料号
    city: "常州武进", //省市区
}];

class Page extends React.Component {

    render() {
        const columns = [{
            title: 'key',
            dataIndex: 'key',
            key: 'key'
        }, {
            title: '设备ID',
            dataIndex: 'deviceid',
            key: 'deviceid',
        }, {
            title: 'PACK号',
            dataIndex: 'pack',
            key: 'pack',
        }, {
            title: 'PDB',
            dataIndex: 'pdb',
            key: 'pdb',
        },{
            title: '料号',
            dataIndex: 'liaohao',
            key: 'liaohao',
        }, {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <span>
                    <a href="#">操作</a>
                </span>
            ),
        }];
        return (
            <Table columns={columns} dataSource={data} pagination={false} style={{flexGrow: 1}} />
        );
    }
}

export default connect()(Page);
