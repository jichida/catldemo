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
import TreeSelect from "../trees/tree_select.js";
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
        text:'车辆PN料号'
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

const gmap_warninglevel = {
  'all':-1,
  'red':0,
  'orange':1,
  'yellow':2
};
class TreeSearchBattery extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        alarmlevel:'red',
        startDate:moment().subtract(3600*12, 'seconds'),
        endDate:moment(),
      };
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
  onClickQuery=()=>{
    let query = {
      queryalarm:{
      }
    };
    query.queryalarm['startDate'] = this.state.startDate.format('YYYY-MM-DD HH:mm:ss');
    query.queryalarm['endDate'] = this.state.endDate.format('YYYY-MM-DD HH:mm:ss');
    if(this.state.alarmlevel !== ''){
      query.queryalarm['warninglevel'] = gmap_warninglevel[this.state.alarmlevel];
    }
    console.log(`【searchdevicemessage】查询条件:${JSON.stringify(query)}`);
    if(!!this.props.onClickQuery){
      this.props.onClickQuery({query});
    }
  }
    render(){

        return (
            <div className="searchreport" style={{textAlign: "center"}}>
                <div className="i">
                    <Seltime
                      startDate = {this.state.startDate}
                      endDate = {this.state.endDate}
                     onChangeSelDate={this.onChangeSelDate.bind(this)}/>
                     <Select defaultValue={"all"}   onChange={this.onChange_alarmlevel.bind(this)}>
                         <Option value="all" >全部</Option>
                         <Option value="red" >严重告警</Option>
                         <Option value="orange" >紧急告警</Option>
                         <Option value="yellow" >一般告警</Option>
                     </Select>
                </div>
                <div className="b">
                    <Button type="primary" icon="search" onClick={this.onClickQuery}>查询</Button>
                    <Button icon="download" onClick={this.onClickQuery}>导出结果</Button>
                </div>
            </div>

        );
    }
}

export default connect()(TreeSearchBattery);
