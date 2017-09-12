/**
 * Created by jiaowenhui on 2017/3/15.
 */
import React from 'react';
import { connect } from 'react-redux';
import { Table, Icon } from 'antd';
import _ from 'lodash';
import Searchimg from '../../img/13.png';
import Footer from "../index/footer.js";
import { withRouter } from 'react-router-dom';
import "../../css/antd.min.css";

const data = [{
    workerid: '1',//车牌
    status: '0012',//vin
    carid: "3", //运营年限
    proname: "34", //总里程
    workername: "22", //容量保有率
    reason: "1级报警", //当前位置
}, {
    workerid: '2',//车牌
    status: '0012',//vin
    carid: "3", //运营年限
    proname: "34", //总里程
    workername: "22", //容量保有率
    reason: "2级报警", //当前位置
}, {
    workerid: '3',//车牌
    status: '0012',//vin
    carid: "3", //运营年限
    proname: "34", //总里程
    workername: "22", //容量保有率
    reason: "3级报警", //当前位置
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
            dataIndex: 'reason',
            key: 'reason'
        }];
        return (
            <Table 
                columns={columns} 
                dataSource={data} 
                pagination={false} 
                style={{flexGrow: 1}} 
                onRowClick={()=>{this.props.history.push("/workorderinfo")}}
                />
        );
    }
}

Page = withRouter(Page);
export default connect()(Page);
