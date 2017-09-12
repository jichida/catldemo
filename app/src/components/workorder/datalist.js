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
import {data_bms_workorder} from '../../test/bmsdata.js';

class Page extends React.Component {

    render() {
        const {selworkorder} = this.props;
        let dataworkorder = [];
        dataworkorder = _.filter(data_bms_workorder,(item) => {
          if(selworkorder === 0){
            return !item.isdone;
          }
          if(selworkorder === 1){
            return item.isdone;
          }
          return true;
        });
        const columns = [{
            title: '工号',
            dataIndex: 'workerid',
            key: 'workerid'
        }, {
            title: '状态',
            dataIndex: 'isdone',
            key: 'isdone',
            render: text => <span>{text?"待处理":"已完成"}</span>,
        }, {
            title: '车牌',
            dataIndex: '车牌',
            key: '车牌',
        }, {
            title: '项目',
            dataIndex: '项目',
            key: '项目',
        },{
            title: '处理人',
            dataIndex: '联系人',
            key: '联系人',
        }, {
            title: '类型',
            dataIndex: '故障类型',
            key: '故障类型'
        }];
        return (
            <Table
                columns={columns}
                dataSource={dataworkorder}
                pagination={false}
                style={{flexGrow: 1}}
                onRowClick={(item)=>{this.props.history.push(`/workorderinfo/${item.workerid}`)}}
                />
        );
    }
}

Page = withRouter(Page);
export default connect()(Page);
