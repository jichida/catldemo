/**
 * Created by jiaowenhui on 2017/3/15.
 */
import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Button, Modal, Icon, message } from 'antd';
import { ui_alarm_selcurdevice } from '../../actions';

//工作人员烈白哦
const workers  = [
  {
    name : "关云长",
    id: "A001"
  },
  {
    name : "张翼德",
    id: "A002"
  },
  {
    name : "赵子龙",
    id: "A003"
  },
  {
    name : "刘玄德",
    id: "A004"
  }
]

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          showmodal : false,
          selworderid : '',
        }
    }
    componentWillMount () {
    }
    showworderlist=(showmodal)=>{
        this.setState({ showmodal });
    }
    selworderdone=()=>{
        if(this.state.selworderid===''){
            message.warning('您还没有制定派单人员！');
        }else{
            console.log(`开始派发工单给${this.state.selworderid}`);
        }
    }
    selworderfn=(selworderid)=>{
        this.setState({ selworderid });
    }
    render() {
        const {g_devicesdb,alarms} = this.props;
        let alarmid = this.props.match.params.alarmid;
        let curalarm =  alarms[alarmid];
        let deviceid = curalarm.DeviceId;

        const datadevice = {
            "基本信息" :[ {
                    name:'告警等级',
                    value: `${curalarm['告警等级']}`,
                },
                {
                    name:'车辆ID',
                    value: `${curalarm['车辆ID']}`,
                },
                {
                  name:'告警时间',
                  value: `${curalarm['告警时间']}`,
                },
                {
                  name:'报警信息',
                  value: `${curalarm['报警信息']}`,
                },
            ],
            "位置信息" : [
                {
                  name:'告警位置',
                  value: `${curalarm['告警位置']}`,
                },

          ],
        };
        return (
            
            <div className="warningPage devicePage deviceinfoPage workorderinfoPage alarminfoPage" style={{height : window.innerHeight+"px"}}>

                <div className="appbar">
                    <i className="fa fa-angle-left back" aria-hidden="true" onClick={()=>{this.props.history.goBack()}}></i>
                    <div className="title">告警详情</div>
                    <div className="devicebtnlist">   
                        <Button 
                            type="primary" 
                            icon="environment"
                            onClick={()=>{this.props.dispatch(ui_alarm_selcurdevice(deviceid));}}
                            >定位车辆</Button>
                        <Button 
                            type="primary" 
                            icon="contacts"
                            onClick={()=>{this.showworderlist(true)}}
                            >派发工单</Button>  
                    </div>
                </div>
                <div 
                    className="lists deviceinfolist"
                    style={{overflowY: "scroll"}}
                    >
                    {
                      _.map(datadevice,(item,index)=>{

                        return (
                            <div key={index}>
                                <div className="tit">{index}</div>
                                {
                                    _.map(item,(i,k)=>{
                                        return (<div key={k} className="li"><div><div className="name">{`${i.name}`}</div><div className="text">{`${i.value}`}</div></div></div>)
                                    })
                                }
                            </div>
                        );
                      })
                    }
                    
                </div>
                <Modal
                    title="派发工单"
                    wrapClassName="vertical-center-modal"
                    visible={this.state.showmodal}
                    onOk={this.selworderdone}
                    onCancel={() => {this.showworderlist(false)}}
                    className="showworderlist"
                    >
                    { 
                        _.map(workers, (worder, index)=>{
                            return (
                                <p 
                                    onClick={()=>{this.selworderfn(worder.id)}}
                                    key={index}
                                    >
                                    <span>{worder.name}</span>
                                    { this.state.selworderid ===worder.id ?
                                        <Icon type="check-circle" style={{color: "#4DB361"}} />
                                        :<Icon type="check-circle" style={{color: "#EEEEEE"}} />}</p>);
                        })
                    }
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = ({device,searchresult}) => {
    const {g_devicesdb} = device;
    const {alarms} = searchresult;
    return {g_devicesdb,alarms};
}

export default connect(mapStateToProps)(Page);
