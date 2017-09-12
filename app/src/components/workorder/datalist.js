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
import data from '../../test/workorder.json';


class Page extends React.Component {

    render() {
        const {selworkorder} = this.props;
        let dataworkorder = [];
        dataworkorder = _.filter(data,(item) => {
          if(selworkorder === 0){
            return !item.isdone;
          }
          if(selworkorder === 1){
            return item.isdone;
          }
          return true;
        });
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
