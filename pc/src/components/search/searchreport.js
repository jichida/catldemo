/**
 * Created by jiaowenhui on 2017/7/28.
    底部点击展开菜单栏
 */
import React from 'react';
import {connect} from 'react-redux';
import {Treebeard} from 'react-treebeard';
import _ from 'lodash';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Seltime from './seltime.js';
import { Input, Col, Select, InputNumber, DatePicker, AutoComplete, Cascader, Button } from 'antd';
import TreeSelectBygroup from "../trees/treeselect_bygroup.js";
import TreeselectByloc from "../trees/treeselect_byloc.js";
import moment from 'moment';

const InputGroup = Input.Group;
const Option = Select.Option;
const selitem_devicefields = [
    {
        value:'RdbNo',
        text:'RDB编号'
    },
    {
        value:'PackNo',
        text:'BMU PACK号'
    },
    {
        value:'PnNo',
        text:'设备PN料号'
    },
];
const selitem_alarmfields = [
    {
        value:'ALARM_H',
        text:'警告代码'
    },
    {
        value:'ALARM_L',
        text:'故障代码'
    },
];
class TreeSearchBattery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notype:  '',
            notypevalue : '',
            alarmtype : '',
            alarmtypevalue:'',
            alarmlevel:'',
            startDate:moment(),
            endDate:moment(),
            groupid:'0',
            adcode:10000
        };
    }
    onSelTreeNode_Group(groupid){
      this.setState({groupid});
    }
    onSelTreeNode_Loc(adcode){
      this.setState({adcode});
    }

    onChangeSelDate(startDate,endDate){
      this.setState({
        startDate,
        endDate
      });
    }

    onChange_alarmlevel(alarmlevel){
      this.setState({alarmlevel});
    }
    onChange_notype(notype){
      this.setState({notype});
    }
    onChange_alarmtype(alarmtype){
      this.setState({alarmtype});
    }
    handleChange_notypevalue(notypevalue){
        this.setState({notypevalue});
    }
    handleChange_alarmtypevalue(alarmtypevalue){
        this.setState({alarmtypevalue});
    }
    onClickExport=()=>{
      if(!!this.props.onClickExport){
        this.props.onClickExport();
      }
    }
    onClickQuery=()=>{
      let query = {
        querydevice:{},
        queryalarm:{}
      };

      if(this.state.groupid !== '0'){
        query['groupid'] = this.state.groupid;
      }
      if(this.state.adcode !== 10000){
        query['adcode'] = this.state.adcode;
      }
      if(this.state.notype!== '' && this.state.notypevalue!=''){
        query.querydevice[this.state.notype] = this.state.notypevalue;
      }
      if(this.state.alarmtype!== '' && this.state.alarmtypevalue!=''){
        query.querydevice[this.state.alarmtype] = this.state.alarmtypevalue;
      }
      query.queryalarm['startDate'] = this.state.startDate;
      query.queryalarm['endDate'] = this.state.endDate;
      if(this.state.alarmlevel !== ''){
        query.queryalarm['alarmlevel'] = this.state.alarmlevel;
      }

      console.log(`【searchreport】查询条件:${JSON.stringify(query)}`);
      if(!!this.props.onClickQuery){
        this.props.onClickQuery({query});
      }
    }
    render(){
        return (
            <div className="searchreport" style={{textAlign: "center"}}>
                <div className="i">

                    <Seltime  startDate = {this.state.startDate}
                      endDate = {this.state.endDate}
                     onChangeSelDate={this.onChangeSelDate.bind(this)}/>

                    <TreeSelectBygroup placeholder={"请选择分组"} width={200} onSelTreeNode={this.onSelTreeNode_Group.bind(this)}/>
                    <TreeselectByloc placeholder={"请选择地区"} width={200} onSelTreeNode={this.onSelTreeNode_Loc.bind(this)}/>

                    <InputGroup compact>
                        <Select defaultValue="选择编号类型" style={{ width: 120 }} onChange={this.onChange_notype.bind(this)}>
                            {
                                _.map(selitem_devicefields,(field,key)=>{
                                    return (<Option key={key} value={field.value}>{field.text}</Option>)
                                })
                            }
                        </Select>
                        <AutoComplete
                            style={{ width: 150 }}
                            onChange={this.handleChange_notypevalue.bind(this)}
                            placeholder="请输入编号"
                        />
                    </InputGroup>

                    <InputGroup compact>
                        <Select defaultValue="选择代码类型" style={{ width: 120 }}  onChange={this.onChange_alarmtype.bind(this)}>
                            {
                                _.map(selitem_alarmfields,(field,key)=>{
                                  return (<Option key={key} value={field.value}>{field.text}</Option>)
                                })
                            }
                        </Select>
                        <AutoComplete
                            style={{ width: 150 }}
                            placeholder="请输入代码"
                            onChange={this.handleChange_alarmtypevalue.bind(this)}
                        />
                    </InputGroup>



                    <Select defaultValue={"选择警告级别"}   onChange={this.onChange_alarmlevel.bind(this)}>
                        <Option value="red" >严重告警</Option>
                        <Option value="orange" >紧急告警</Option>
                        <Option value="yellow" >一般告警</Option>
                    </Select>

                </div>
                <div className="b">
                    <Button type="primary" icon="search" onClick={this.onClickQuery}>查询</Button>
                    <Button icon="download" onClick={this.onClickExport}>导出结果</Button>
                </div>
            </div>

        );
    }
}
// const mapStateToProps = ({device:{groups,groupidlist}}) => {
//     return {groups,groupidlist};
// }
export default connect()(TreeSearchBattery);
