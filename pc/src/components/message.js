/**
 * Created by jiaowenhui on 2017/7/28.
    底部点击展开菜单栏
 */
import React from 'react';
import {connect} from 'react-redux';
import {Treebeard} from 'react-treebeard';
import _ from 'lodash';
// import {ui_selcurdevice_request} from '../actions';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar';
import Deraultimg from "../img/1.png";
import "../css/message.css";
import TableComponents from "./table.js";
import Seltime from "./search/seltime.js";

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import TreeSearchreport from './search/searchreport';
import { Modal, Button } from 'antd';
import {
    ui_selcurdevice_request,
    searchbatteryalarm_request
} from '../actions';

class ModalApp extends React.Component {
    state = {
        ModalText: 'Content of the modal',
        visible: false,
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    handleOk = () => {
        this.setState({
            ModalText: 'The modal will be closed after two seconds',
            confirmLoading: true,
        });
        setTimeout(() => {
            this.setState({
                visible: false,
                confirmLoading: false,
            });
        }, 2000);
    }
    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
            visible: false,
        });
    }
    render() {
        const { visible, confirmLoading, ModalText } = this.state;
        return (
            <div>
                <Button type="primary" onClick={this.showModal}>Open</Button>
                <Modal
                    title="Title"
                    visible={visible}
                    onOk={this.handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={this.handleCancel}
                    >
                    <p>{ModalText}</p>
                </Modal>
            </div>
        );
    }
}

class MessageAllDevice extends React.Component {

    constructor(props) {
        super(props);
    }

    onClickQuery(query){
        this.props.dispatch(searchbatteryalarm_request(query));
    }

    render(){
        let warninglevel = this.props.match.params.warninglevel;
        if(warninglevel === 'all'){
          warninglevel = -1;
        }
        else{
          warninglevel = parseInt(warninglevel);
        }
        let {g_devicesdb,alarms,searchresult_alaram,alaram_data,columns} = this.props;
        let delrow = (row)=>{
            console.log(row);
            this.props.history.push(`/alarminfo/${row._id}`);
        }

        let columns_action ={
            title: "操作",
            dataIndex: '',
            key: 'x',
            render: (text, row, index) => {
                return (<a onClick={()=>{delrow(row)}}>查看</a>);
            }
        }

        columns.push(columns_action);
        return (
            <div className="warningPage" style={{height : window.innerHeight+"px"}}>

                <div className="appbar">
                    <i className="fa fa-angle-left back" aria-hidden="true" onClick={()=>{this.props.history.push("./")}}></i>
                    <div className="title">新消息</div>
                </div>
                <div className="TreeSearchBattery">
                    <TreeSearchreport onClickQuery={this.onClickQuery.bind(this)} warninglevel={warninglevel}/>
                </div>
                <div className="tablelist">
                    <TableComponents data={alaram_data} columns={columns}/>
                </div>
            </div>

        );
    }
}

const mapStateToProps = ({device:{g_devicesdb},searchresult:{searchresult_alaram,alarms}}) => {
    const column_data = {
      "车辆ID" : "",
      "告警时间" : "",
      "告警等级" : "",
      "告警位置" : "江苏常州武进区",
      "报警信息" : "绝缘故障",
    };
    const alaram_data = [];
    _.map(searchresult_alaram,(aid)=>{
      alaram_data.push(alarms[aid]);
    });

    let columns = _.map(column_data, (data, index)=>{
      let column_item = {
          title: index,
          dataIndex: index,
          key: index,
          render: (text, row, index) => {
              return <span>{text}</span>;
          },
          sorter:(a,b)=>{
            return a[data] > b[data] ? 1:-1;
          }
      };
      return column_item;
    })



    return {g_devicesdb,alarms,searchresult_alaram, alaram_data, columns};
}

export default connect(mapStateToProps)(MessageAllDevice);
