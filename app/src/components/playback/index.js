/**
 * Created by jiaowenhui on 2017/3/15.
 */
import React from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import IconButton from 'material-ui/IconButton';
import {grey900} from 'material-ui/styles/colors';
import DatePicker from 'react-mobile-datepicker';
import NavBar from "../tools/nav.js";
import Map from './map';
import "./map.css";
import {mapplayback_start,mapplayback_end} from '../../actions';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Searchimg from '../../img/13.png';
import Searchimg2 from '../../img/15.png';
import Car from '../../img/5.png';
import Footer from "../index/footer.js";
import Seltime from "../tools/seltime.js";
import { Button } from 'antd';
import moment from 'moment';
import _ from 'lodash';

import { TreeSelect } from 'antd';
const TreeNode = TreeSelect.TreeNode;


class SelectDevice extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        value:props.initdeviceid
      }
  }

  onChange = (value) => {
    console.log(arguments);
    this.setState({ value });
    this.props.onSelDeviceid(value);
  }
  render() {
    const treeData = [];
    const {g_devicesdb} = this.props;
    _.map(g_devicesdb,(item)=>{
      let data = {
          label: `${item.DeviceId}`,
          value: `${item.DeviceId}`,
          key: `${item.DeviceId}`,
      };
      treeData.push(data);
    });
    return (
      <TreeSelect
        showSearch
        style={{ width: '100%',fontSize: "16px" }}
        value={this.state.value}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        placeholder={this.props.placeholder}
        allowClear
        treeDefaultExpandAll
        onChange={this.onChange}
        treeData={treeData}
        />

    );
  }
}
const mapStateToPropsSelectDevice = ({device}) => {
    const {g_devicesdb} = device;
    return {g_devicesdb};
}
SelectDevice = connect(mapStateToPropsSelectDevice)(SelectDevice);

class Page extends React.Component {
    constructor(props) {
        super(props);
        let deviceid =  this.props.match.params.deviceid;
        if(deviceid === '0'){
          deviceid = '';
        }
        this.state = {
            time: new Date(),
            isOpen: false,
            seltype : 0,
            startDate:moment().subtract(5, 'hours'),
            endDate:moment(),
            deviceid,
            mindata : new Date(1970, 0, 1),
            showset : false,
        };
    }
    onSelDeviceid(deviceid){
      this.setState({
        deviceid
      });
    }
    onClickStart(){
        const {deviceid,startDate,endDate} = this.state;
        const {g_devicesdb} = this.props;
        if(!!g_devicesdb[deviceid]){
          this.props.dispatch(mapplayback_start({isloop:false,speed:5000,query:{DeviceId:deviceid,startDate,endDate}}));
          this.showset();
        }
        else{
          console.log(`无效的设备id`);
        }
    }
    onClickEnd(){
        this.showset();
        this.props.dispatch(mapplayback_end({}));
    }

    handleClick = (v) => {
        this.setState({
            isOpen: true,
            seltype : v
        });

        //选中当前时间
        if(v === 0){
          this.setState({
              time: new Date(this.state.startDate)
          });
        }
        else{
          this.setState({
              time: new Date(this.state.endDate)
          });
        }
        //限制时间
        if(v===1){
            if(this.state.starttime!==''){
                this.setState({
                    mindata: new Date(this.state.startDate)
                });
            }
        }else{
            this.setState({
                mindata: new Date(1970, 0, 1)
            });
        }
    }
    handleCancel = () => {
        this.setState({ isOpen: false });

    }
    showset =()=>{
        this.setState({
            showset: !this.state.showset
        });
    }
    handleSelect = (time) => {
        const t = moment(time);
        if(this.state.seltype===0){
            this.setState({ startDate: t, isOpen: false});
        }
        if(this.state.seltype===1){
            this.setState({ endDate: t, isOpen: false });
        }
    }
    render() {
        // const {mapseldeviceid,devices} = this.props;
        // let DeviceId;
        // let deviceitem = devices[mapseldeviceid];
        // if(!!deviceitem){
        //   DeviceId = deviceitem.DeviceId;
        // }
        const formstyle={width:"100%",flexGrow:"1"};
        const textFieldStyle={width:"100%",flexGrow:"1"};
        const height = window.innerHeight-(66+58);
        return (
            <div className="playbackPage AppPage"
                style={{height : `${window.innerHeight}px`,overflow: "hidden",paddingBottom:"0"}}
                >
                <div className="navhead">
                    <span className="title" style={{paddingLeft : "30px"}}>轨迹回放</span>
                    <a className="searchlnk" onClick={this.showset}>
                        <img src={Searchimg} /></a>
                </div>
                {
                    this.state.showset &&
                    <div className="set seltimewamp">
                        <div className="deviceinfo">
                            <img src={Car} />
                            <span>车辆信息</span>
                            <span>
                              <SelectDevice placeholder={"请输入设备ID"}
                                 initdeviceid={this.state.deviceid}
                                 onSelDeviceid={this.onSelDeviceid.bind(this)}/>
                            </span>
                        </div>
                        <div className="seltimecontent" onClick={this.handleClick.bind(this, 0)}>
                            <img src={Searchimg2} />
                            <span>起始时间:{ this.state.startDate.format('YYYY-MM-DD HH:mm')}</span>
                        </div>
                        <div className="seltimecontent" onClick={this.handleClick.bind(this, 1)}>
                            <img src={Searchimg2} />
                            <span>结束时间:{ this.state.endDate.format('YYYY-MM-DD HH:mm')}</span>
                        </div>
                        <div className="seltimebtn">
                            <RaisedButton label="开始"
                                backgroundColor={"#67bd82"} labelColor={"#FFF"}
                                onClick={this.onClickStart.bind(this)}
                                buttonStyle={{width:"100px",height : "30px", lineHeight : "30px"}}
                                />
                            <RaisedButton label="结束"
                                backgroundColor={"#3a52a2"} labelColor={"#FFF"}
                                onClick={this.onClickEnd.bind(this)}
                                style={{marginLeft: "30px"}}
                                buttonStyle={{width:"100px",height : "30px", lineHeight : "30px"}}
                                />
                        </div>
                    </div>
                }

                <Map height={height}/>
                <Footer sel={4} />
                <DatePicker
                    value={this.state.time}
                    isOpen={this.state.isOpen}
                    onSelect={this.handleSelect}
                    onCancel={this.handleCancel}
                    min={this.state.mindata}
                    max={new Date()}
                    showFormat='YYYY/MM/DD/hh/mm'
                    dateFormat={['YYYY年', 'MM月', 'DD日', 'hh时', 'mm分']} />
            </div>
        );
    }
}
const mapStateToProps= ({device}) => {
    const {g_devicesdb} = device;
    return {g_devicesdb};
}
export default connect(mapStateToProps)(Page);
