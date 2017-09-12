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
import {
  ui_selcurdevice_request,
  searchbatteryalarm_request
} from '../actions';

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
                    <div className="title">工单查询</div>
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

//序号、工单号、营运公司、车牌号、故障地点、故障代码、部位、故障描述、责任人
const mapStateToProps = ({device:{g_devicesdb},searchresult:{searchresult_alaram,alarms}}) => {
    const alaram_data = [{
        "序号": 1,
        "工单号" : "001",
        "营运公司" : "pack001",
        "车牌号" : "pdb001",
        "故障地点" : "liaohao001",
        "故障代码" : "江苏常州武进区",
        "部位" : "liaohao001",
        "故障描述" : "江苏常州武进区",
        "责任人" : "江苏常州武进区",
    },
    {
      "序号": 2,
      "工单号" : "001",
      "营运公司" : "pack001",
      "车牌号" : "pdb001",
      "故障地点" : "liaohao001",
      "故障代码" : "江苏常州武进区",
      "部位" : "liaohao001",
      "故障描述" : "江苏常州武进区",
      "责任人" : "江苏常州武进区",
    },
    {
      "序号": 3,
      "工单号" : "001",
      "营运公司" : "pack001",
      "车牌号" : "pdb001",
      "故障地点" : "liaohao001",
      "故障代码" : "江苏常州武进区",
      "部位" : "liaohao001",
      "故障描述" : "江苏常州武进区",
      "责任人" : "江苏常州武进区",
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
            return (<a onClick={()=>{delrow(row)}}>删除</a>);
        }
    }
    columns.push(columns_action);

    return {g_devicesdb,alarms,searchresult_alaram, alaram_data, columns};
}
export default connect(mapStateToProps)(MessageAllDevice);
