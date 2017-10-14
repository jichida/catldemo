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
import {ui_mycar_selcurdevice} from '../../actions';
import { withRouter } from 'react-router-dom';

class Page extends React.Component {

    render() {
        const { tirelist } = this.props;

        const columns = [{
            title: '采集时间',
            dataIndex: '采集时间',
            key: 'caijitime'
        }, {
            title: '左前',
            dataIndex: '左前',
            key: 'zuoqian'
        }, {
            title: '右前',
            dataIndex: '右前',
            key: 'youqian'
        }, {
            title: '左后',
            dataIndex: '左后',
            key: 'zuohou'
        },{
            title: '右后',
            dataIndex: '右后',
            key: 'youhou'
        }, {
            title: '故障码',
            dataIndex: '故障码',
            key: 'error'
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
const mapStateToProps = ({}) => {
    
    const tirelist = [{
        "采集时间" : "2017-09-08 12:20:23",
        "左前" : "20",
        "右前" : "20",
        "左后" : "20",
        "右后" : "20",
        "故障码" : "2"
    },{
        "采集时间" : "2017-09-08 12:30:23",
        "左前" : "24",
        "右前" : "20",
        "左后" : "24",
        "右后" : "26",
        "故障码" : "1"
    },{
        "采集时间" : "2017-09-08 12:40:23",
        "左前" : "26",
        "右前" : "20",
        "左后" : "24",
        "右后" : "26",
        "故障码" : "0"
    }];

    return { tirelist };
}
export default connect(mapStateToProps)(Page);
