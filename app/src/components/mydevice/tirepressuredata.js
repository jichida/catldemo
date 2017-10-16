/**
 * Created by jiaowenhui on 2017/3/15.
 */
import React from 'react';
import { connect } from 'react-redux';
import Table from 'antd/lib/table';
import Icon  from 'antd/lib/icon';
import map from 'lodash.map';
import Searchimg from '../../img/13.png';
import Footer from "../index/footer.js";
import "../../css/antd.min.css";

import { withRouter } from 'react-router-dom';

class Page extends React.Component {

    render() {
        const {devicehistorylist,devicehistorys} = this.props;
        let tirelist = [];
        map(devicehistorylist,(record)=>{
          let tire = {
            _id:record._id
          };
          tire = {...tire,...record.TPData};
          tirelist.push(tire);
        });
        const columns = [{
            title: '采集时间',
            dataIndex: 'DataTime',
            key: 'DataTime'
        }, {
            title: '左前',
            dataIndex: 'TP1',
            key: 'TP1'
        }, {
            title: '右前',
            dataIndex: 'TP2',
            key: 'TP2'
        }, {
            title: '左后',
            dataIndex: 'TP3',
            key: 'TP3'
        },{
            title: '右后',
            dataIndex: 'TP4',
            key: 'TP4'
        }, {
            title: '故障码',
            dataIndex: 'TP5',
            key: 'TP5'
        }];
        return (
            <Table
                columns={columns}
                dataSource={tirelist}
                pagination={false}
                style={{flexGrow: 1}}
                scroll={{ y: this.props.tableheight }}
                />
        );
    }
}
Page = withRouter(Page);
const mapStateToProps = ({devicedatahistory}) => {
    const {devicehistorylist,devicehistorys} = devicedatahistory;
    return {devicehistorylist,devicehistorys};
}
export default connect(mapStateToProps)(Page);
