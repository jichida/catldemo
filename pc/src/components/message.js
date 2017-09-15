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
        const {g_devicesdb,alarms,searchresult_alaram,alaram_data,columns} = this.props;

        return (
            <div className="warningPage" style={{height : window.innerHeight+"px"}}>

                <div className="appbar">
                    <i className="fa fa-angle-left back" aria-hidden="true" onClick={()=>{this.props.history.push("./")}}></i>
                    <div className="title">新消息</div>
                </div>
                <div className="TreeSearchBattery">
                    <TreeSearchreport onClickQuery={this.onClickQuery.bind(this)}/>
                </div>
                <div className="tablelist">
                    <TableComponents data={alaram_data} columns={columns}/>
                </div>
            </div>

        );
    }
}

const mapStateToProps = ({device:{g_devicesdb},searchresult:{searchresult_alaram,alarms}}) => {

    const alaram_data = [{
        key: 1,
        "车辆ID" : "001",
        "PACK号码" : "pack001",
        "PDB编号" : "pdb001",
        "料号" : "liaohao001",
        "省市区" : "江苏常州武进区",
        "报警信息" : "绝缘故障",
    },
    {
        key: 2,
        "车辆ID" : "002",
        "PACK号码" : "pack002",
        "PDB编号" : "pdb002",
        "料号" : "liaohao002",
        "省市区" : "江苏常州武进区",
        "报警信息" : "高压互锁",

    },
    {
        key: 3,
        "车辆ID" : "003",
        "PACK号码" : "pack003",
        "PDB编号" : "pdb003",
        "料号" : "liaohao003",
        "省市区" : "江苏常州武进区",
        "报警信息" : "SOC过低",

    }];

    let columns = _.map(alaram_data[0], (data, index)=>{
        return {
            title: index,
            dataIndex: index,
            key: index,
            render: (text, row, index) => {
                return <span>{text}</span>;
            }
        }
    })

    let delrow = (row)=>{
        console.log(row);
    }

    let columns_action ={
        title: "操作",
        dataIndex: '',
        key: 'x',
        render: (text, row, index) => {
            return (<a onClick={()=>{delrow(row)}}>派发工单</a>);
        }
    }

    columns.push(columns_action);

    return {g_devicesdb,alarms,searchresult_alaram, alaram_data, columns};
}

export default connect(mapStateToProps)(MessageAllDevice);
