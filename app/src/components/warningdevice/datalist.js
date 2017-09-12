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
import data from '../../test/bms_alarm.json';

class Page extends React.Component {

    render() {
        const {seltype} = this.props;
        let dataalarm = [];
        dataalarm = _.filter(data,(item) => {
          if(seltype === 0){
            return !item.isreaded;
          }
          if(seltype === 1){
            return item.isreaded;
          }
          return true;
        });
        const columns = [{
            title: '预警时间',
            dataIndex: 'time',
            key: 'time'
        }, {
            title: '车辆ID',
            dataIndex: 'deviceid',
            key: 'deviceid',
            render: text => <span onClick={()=>{console.log(`点击车辆${text}`)}}>{text}</span>,
        }, {
            title: '故障信息',
            dataIndex: 'errorinfo',
            key: 'errorinfo',
        }, {
            title: '所在位置',
            dataIndex: 'address',
            key: 'address',
        }];

        // const columns = _.map
        return (
            <Table columns={columns} dataSource={dataalarm} pagination={false} style={{flexGrow: 1}} />
        );
    }
}

export default connect()(Page);
